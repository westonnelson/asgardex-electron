import { getPrefix as getBinancePrefix } from '@xchainjs/xchain-binance'
import { getPrefix as getBitcoinPrefix } from '@xchainjs/xchain-bitcoin'
import { getPrefix as getBCHPrefix } from '@xchainjs/xchain-bitcoincash'
import * as Client from '@xchainjs/xchain-client'
import { Address } from '@xchainjs/xchain-client'
import { getPrefix as getCosmosPrefix } from '@xchainjs/xchain-cosmos'
import { getPrefix as getEthereumPrefix } from '@xchainjs/xchain-ethereum'
import { getPrefix as getLitecoinPrefix } from '@xchainjs/xchain-litecoin'
import { getPrefix as getThorchainPrefix } from '@xchainjs/xchain-thorchain'
import {
  Chain,
  BNBChain,
  BTCChain,
  CosmosChain,
  ETHChain,
  PolkadotChain,
  THORChain,
  LTCChain,
  BCHChain
} from '@xchainjs/xchain-util'
import { ethers } from 'ethers'
import * as O from 'fp-ts/lib/Option'

import { Network } from '../../shared/api/types'

export const truncateAddress = (addr: Address, chain: Chain, network: Network): string => {
  const first = addr.substr(0, Math.max(getAddressPrefixLength(chain, network) + 3, 6))
  const last = addr.substr(addr.length - 3, 3)
  return `${first}...${last}`
}

export const getAddressPrefixLength = (chain: Chain, network: string): number => {
  // TODO (@asgdx-team) Extract it into a helper - we might need it at other places, too
  const clientNetwork: Client.Network = network === 'testnet' ? 'testnet' : 'mainnet'
  switch (chain) {
    case BNBChain:
      return getBinancePrefix(network).length
    case BTCChain:
      return getBitcoinPrefix(clientNetwork).length
    case CosmosChain:
      return getCosmosPrefix().length
    case ETHChain:
      return getEthereumPrefix().length
    case PolkadotChain:
      // not supported yet
      // return getPolkadotPrefix(network).length
      throw Error('Polkadot is not supported yet')
    case THORChain:
      return getThorchainPrefix(network).length
    case LTCChain:
      return getLitecoinPrefix(clientNetwork).length
    case BCHChain:
      return getBCHPrefix(network).length
  }
}

export const removeAddressPrefix = (address: Address): Address => {
  const prefixIndex = address.indexOf(':') + 1
  return address.substr(prefixIndex > 0 ? prefixIndex : 0)
}

/**
 * Helper to get ETH address as a checksum address
 * toLowerCase() is needed to handle the ERC20 addresses start with 0X as well, not only 0x
 * ethers getAddress function recognize 0X address as invalid one
 */
export const getEthChecksumAddress = (address: Address): O.Option<Address> =>
  O.tryCatch(() => ethers.utils.getAddress(address.toLowerCase()))
