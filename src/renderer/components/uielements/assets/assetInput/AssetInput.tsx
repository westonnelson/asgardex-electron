import React, { useRef, useCallback } from 'react'

import { Asset, assetAmount, assetToBase, BaseAmount, baseToAsset } from '@xchainjs/xchain-util'
import BigNumber from 'bignumber.js'
import * as FP from 'fp-ts/lib/function'

import { FixmeType } from '../../../../types/asgardex'
import { MaxBalanceButton } from '../../button/MaxBalanceButton'
import { InputBigNumber } from '../../input'
import { AssetInputWrapper } from './AssetInput.style'
import { AssetInputProps } from './AssetInput.types'

type Props = {
  title: string
  status?: string
  amount: BaseAmount
  maxAmount: BaseAmount
  asset: Asset
  inputProps?: AssetInputProps
  onChange: (value: BaseAmount) => void
  onBlur?: FP.Lazy<void>
  disabled?: boolean
  className?: string
}

/**
 * Wrapper around `InputBigNumber` component
 *
 * For input values, it takes and returns `BaseAmount`. It converts `BaseAmount` -> `AssetAmount` and vice versa,
 * to display and format values in `InputBigNumber` similar to values of `AssetAmount`
 *
 * Decimal of `InputBigNumber` depends on `decimal` of given `amount`.
 */
export const AssetInput: React.FC<Props> = (props): JSX.Element => {
  const {
    title,
    amount,
    maxAmount,
    asset,
    status,
    disabled,
    inputProps = {},
    className = '',
    onChange,
    onBlur: onBlurHandler = FP.constVoid,
    ...otherProps
  } = props

  const inputRef = useRef<FixmeType>()

  const onChangeHandler = useCallback(
    (value: BigNumber) => {
      onChange(assetToBase(assetAmount(value, amount.decimal)))
    },
    [amount.decimal, onChange]
  )

  const handleClickWrapper = useCallback(() => {
    inputRef.current?.firstChild?.focus()
  }, [])

  return (
    <AssetInputWrapper className={`assetInput-wrapper ${className}`} onClick={handleClickWrapper} {...otherProps}>
      <div className="asset-input-header">
        <p className="asset-input-title">{title}</p>
        {status && <p className="asset-input-header-label">{status}</p>}
        <MaxBalanceButton
          balance={{ amount: maxAmount, asset }}
          onClick={() => onChangeHandler(maxAmount.amount())}
          disabled={disabled}
        />
      </div>
      <div className="asset-input-content" ref={inputRef}>
        <InputBigNumber
          value={baseToAsset(amount).amount()}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          size={'large'}
          {...inputProps}
          decimal={amount.decimal}
        />
      </div>
    </AssetInputWrapper>
  )
}
