import React, { useCallback, useMemo } from 'react'

import { Row } from 'antd'
import * as H from 'history'
import { useObservableState } from 'observable-hooks'
import { Switch, Route, Redirect } from 'react-router-dom'

import { RefreshButton } from '../../components/uielements/button/'
import { AssetsNav } from '../../components/wallet/assets'
import { useMidgardContext } from '../../contexts/MidgardContext'
import { useThorchainContext } from '../../contexts/ThorchainContext'
import { useWalletContext } from '../../contexts/WalletContext'
import { RedirectRouteState } from '../../routes/types'
import * as walletRoutes from '../../routes/wallet'
import { hasImportedKeystore, isLocked } from '../../services/wallet/util'
import { AssetDetailsView } from './AssetDetailsView'
import { AssetsView } from './AssetsView'
import { BondsView } from './BondsView'
import { CreateView } from './CreateView'
import { ImportsView } from './importsView'
import { InteractView } from './Interact'
import { NoWalletView } from './NoWalletView'
import { PoolShareView } from './PoolShareView'
import { SendView } from './send'
import { SettingsView } from './SettingsView'
import { UnlockView } from './UnlockView'
import { UpgradeView } from './UpgradeView'
import * as Styled from './WalletView.styles'

export const WalletView: React.FC = (): JSX.Element => {
  const { keystoreService, reloadBalances } = useWalletContext()
  const {
    service: {
      shares: { reloadCombineSharesByAddresses },
      pools: { reloadAllPools },
      poolActionsHistory
    }
  } = useMidgardContext()
  const { reloadNodesInfo } = useThorchainContext()

  // Important note:
  // DON'T set `INITIAL_KEYSTORE_STATE` as default value
  // Since `useObservableState` is set after first render (but not before)
  // and Route.render is called before first render,
  // we have to add 'undefined'  as default value
  const keystore = useObservableState(keystoreService.keystore$, undefined)

  const reloadButton = useCallback(
    (onClickHandler) => (
      <Row justify="end" style={{ marginBottom: '20px' }}>
        <RefreshButton clickHandler={onClickHandler} />
      </Row>
    ),
    []
  )

  // Following routes are accessable only,
  // if an user has a phrase imported and wallet has not been locked
  const renderWalletRoutes = useMemo(
    () => (
      <>
        <Switch>
          <Route path={walletRoutes.base.template} exact>
            <Redirect to={walletRoutes.assets.path()} />
          </Route>
          <Route path={walletRoutes.settings.template} exact>
            <SettingsView />
          </Route>
          <Route path={walletRoutes.assets.template} exact>
            {reloadButton(reloadBalances)}
            <AssetsNav />
            <AssetsView />
          </Route>
          <Route path={walletRoutes.poolShares.template} exact>
            {reloadButton(() => {
              reloadCombineSharesByAddresses()
              reloadAllPools()
            })}
            <AssetsNav />
            <PoolShareView />
          </Route>
          <Route path={walletRoutes.deposit.template} exact>
            <InteractView />
          </Route>
          <Route path={walletRoutes.bonds.template} exact>
            {reloadButton(reloadNodesInfo)}
            <AssetsNav />
            <BondsView />
          </Route>
          <Route path={walletRoutes.send.template} exact>
            <SendView />
          </Route>
          <Route path={walletRoutes.upgradeBnbRune.template} exact>
            <UpgradeView />
          </Route>
          <Route path={walletRoutes.assetDetail.template} exact>
            <AssetDetailsView />
          </Route>
          <Route path={walletRoutes.history.template}>
            {reloadButton(poolActionsHistory.reloadActionsHistory)}
            <AssetsNav />
            <Styled.PoolActionsHistory />
          </Route>
        </Switch>
      </>
    ),
    [
      reloadAllPools,
      reloadBalances,
      reloadButton,
      reloadCombineSharesByAddresses,
      reloadNodesInfo,
      poolActionsHistory.reloadActionsHistory
    ]
  )

  const renderWalletRoute = useCallback(
    // Redirect if  an user has not a phrase imported or wallet has been locked
    ({ location }: { location: H.Location }) => {
      // Special case: keystore can be `undefined` (see comment at its definition using `useObservableState`)
      if (keystore === undefined) {
        return React.Fragment
      }

      if (!hasImportedKeystore(keystore)) {
        return (
          <Redirect
            to={{
              pathname: walletRoutes.noWallet.path()
            }}
          />
        )
      }

      // check lock status
      if (isLocked(keystore)) {
        return (
          <Redirect
            to={{
              pathname: walletRoutes.locked.path(),
              search: location.search,
              state: { from: location } as RedirectRouteState
            }}
          />
        )
      }

      return renderWalletRoutes
    },
    [renderWalletRoutes, keystore]
  )

  return (
    <Switch>
      <Route path={walletRoutes.noWallet.template} exact>
        <NoWalletView />
      </Route>
      <Route path={walletRoutes.create.base.template}>
        <CreateView />
      </Route>
      <Route path={walletRoutes.locked.template} exact>
        <UnlockView />
      </Route>
      <Route path={walletRoutes.imports.base.template}>
        <ImportsView />
      </Route>
      <Route path={walletRoutes.base.template} render={renderWalletRoute} />
    </Switch>
  )
}
