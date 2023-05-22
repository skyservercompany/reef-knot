import { WalletAdapterType } from '@reef-knot/types';
import {
  getWalletConnectConnector,
  isMobileOrTablet,
} from '@reef-knot/wallets-helpers';
import WalletIcon from './icons/zerion.svg';

export const Zerion: WalletAdapterType = ({ rpc, walletconnectProjectId }) => ({
  walletName: 'Zerion',
  walletId: 'zerion',
  icon: WalletIcon,
  connector: getWalletConnectConnector({
    rpc,
    noMobileLinks: true,
    projectId: walletconnectProjectId,
  }),
  walletconnectExtras: {
    connectionViaURI: {
      connector: getWalletConnectConnector({
        rpc,
        qrcode: false,
        projectId: walletconnectProjectId,
      }),
      condition: isMobileOrTablet,
      redirectLink: 'https://wallet.zerion.io/wc?uri=',
    },
  },
});
