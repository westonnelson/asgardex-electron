import { SwapOutlined as ASwapOutlined } from '@ant-design/icons/lib'
import styled from 'styled-components'
import { palette } from 'styled-theme'

import { media } from '../../helpers/styleHelper'
import { AssetInput as AssetInputBase } from '../uielements/assets/assetInput'
import { AssetSelect as AssetSelectUI } from '../uielements/assets/assetSelect'
import { Button as UIButton } from '../uielements/button'
import { Drag as UIDrag } from '../uielements/drag'
import { Label as UILabel } from '../uielements/label'

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  max-width: 538px;
  height: 100%;
  width: 100%;
  margin: auto;
  color: ${palette('text', 0)};
  text-transform: uppercase;
  padding: 60px 0;
`

export const Header = styled('div')`
  text-align: center;
  background: ${palette('gradient', 0)};
  padding: 16px;
  width: 100%;
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: 600;
  color: ${palette('text', 3)};

  ${media.md`
    margin-bottom: 50px;
  `}
`

export const SwapOutlined = styled(ASwapOutlined).attrs({ rotate: 90 })`
  width: 100%;
  color: ${palette('success', 0)};
  ${(props) => (props.disabled ? 'opacity: 0.5; cursor: not-allowed !important;' : '')}
  svg {
    height: 22px;
    width: 22px;
  }
`

export const FormContainer = styled('div')`
  position: relative;
`

export const CurrencyInfoContainer = styled('div')`
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  padding-left: 15px;
  align-items: center;
  height: 100%;
  color: ${palette('gray', 1)};
  width: max-content;

  ${media.md`
    display: flex;
  `}
`

export const ContentContainer = styled('div')`
  position: relative;
`

export const ValueItemContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 100%;
  position: relative;

  &.valueItemContainer {
    &-out {
      margin-bottom: 10px;
      align-items: center;
    }

    &-percent {
      align-items: center;
      margin: 20px 0;
    }

    &-in {
      align-items: center;
    }
  }

  ${media.md`
    flex-direction: row;

    &>*:first-child {
      margin-right: 25px;
      min-width: 60%;
   `}
  }
`

export const SliderContainer = styled('div')`
  width: 100%;
  min-width: 212px;
`

export const InValueContainer = styled('div')`
  display: flex;
  flex-direction: row;

  ${media.md`
    flex-direction: column;
  `}
`

export const InValueTitle = styled(UILabel).attrs({
  color: 'gray',
  textTransform: 'uppercase',
  size: 'small'
})`
  margin-right: 10px;
  padding: 0;
`

export const InValueLabel = styled(UILabel).attrs({
  color: 'normal'
})`
  padding-bottom: 0;
  font-size: 24px;
`

export const SubmitContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const AssetInput = styled(AssetInputBase)<{ hasError?: boolean }>`
  border-color: ${({ hasError }) => (hasError ? palette('error', 0) : palette('primary', 0))};

  & .ant-input {
    border: none;
  }
`

export const Drag = styled(UIDrag)`
  margin-bottom: 10px;
`

export const ErrorLabel = styled(UILabel)`
  margin-bottom: 14px;
  font-family: 'MainFontRegular';
  text-transform: uppercase;
  color: ${palette('error', 0)};
  text-align: center;
`

export const BalanceErrorLabel = styled(ErrorLabel)`
  text-align: left;
`

export const NoteLabel = styled(UILabel)`
  color: ${palette('text', 2)};
`

export const AssetSelect = styled(AssetSelectUI)`
  justify-content: space-between;
`

export const ApproveButton = styled(UIButton).attrs({
  type: 'primary',
  round: 'true',
  color: 'warning',
  sizevalue: 'xnormal'
})`
  margin-bottom: 30px;
`
