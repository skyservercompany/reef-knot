import React from 'react';
import { useReefKnotContext } from '@reef-knot/core-react';
import {
  ConnectInjected,
  ConnectLedger,
  ConnectWC,
  ConnectCoinbase,
  ConnectBrowser,
} from '../../connectButtons';
import { WalletsModal } from './WalletsModal';
import type { WalletIdsEthereum } from '@reef-knot/wallets-list';
import type { WalletsModalProps } from './types';

type WalletsModalEthProps = WalletsModalProps<WalletIdsEthereum>;

const buttonComponentsByConnectorId: WalletsModalEthProps['buttonComponentsByConnectorId'] =
  {
    default: ConnectInjected, // fallback
    browserExtension: ConnectBrowser,
    walletConnect: ConnectWC,
    coinbaseWallet: ConnectCoinbase,
    ledgerHID: ConnectLedger,
  };

const WALLETS_DISPLAY_CONFIG_DEFAULT: WalletsModalEthProps['walletsShown'] = [
  'browserExtension',
  'metamask',
  'ledgerHID',
  'ledgerLive',
  'walletconnect',
  'coinbase',
  'trust',
  'okx',
  'exodus',
  'brave',
  'bitget',
  'xdefi',
  'imToken',
  'coin98',
  'ambire',
  'safe',
  'dappBrowserInjected',
];

const WALLETS_PINNED_CONFIG_DEFAULT: WalletsModalEthProps['walletsPinned'] = [
  'browserExtension',
];

type WalletsModalForEthProps = Omit<
  WalletsModalEthProps,
  | 'buttonComponentsByConnectorId'
  | 'walletDataList'
  | 'walletsShown'
  | 'walletsPinned'
> & {
  walletsShown?: WalletsModalEthProps['walletsShown'];
  walletsPinned?: WalletsModalEthProps['walletsPinned'];
};

export function WalletsModalForEth(props: WalletsModalForEthProps) {
  const { walletDataList } = useReefKnotContext();

  return (
    <WalletsModal
      {...props}
      walletDataList={walletDataList}
      walletsShown={props.walletsShown || WALLETS_DISPLAY_CONFIG_DEFAULT}
      walletsPinned={props.walletsPinned || WALLETS_PINNED_CONFIG_DEFAULT}
      buttonComponentsByConnectorId={buttonComponentsByConnectorId}
    />
  );
}
