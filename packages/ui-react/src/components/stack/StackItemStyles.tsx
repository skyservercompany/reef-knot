import styled from '../../utils/styledWrapper.js';
import { StackSpacings } from './types.js';

export const StackItemStyle = styled.div<{
  $grow: number;
  $shrink: number;
  $basis: string;
  $spacing?: StackSpacings;
  theme: any;
}>`
  box-sizing: border-box;
  margin: 0;
  padding: ${({ $spacing, theme }) =>
    $spacing ? theme.spaceMap[$spacing] / 2 : 0}px;
  flex: ${({ $grow }) => $grow} ${({ $shrink }) => $shrink}
    ${({ $basis }) => $basis};
`;
