import { WalletAdapterType } from '@reef-knot/types';
import { WindowProvider as EthereumTypeWagmi } from '@wagmi/connectors';
import { InjectedConnector } from 'wagmi/connectors/injected';
import WalletIcon from './icons/phantom.svg';

declare module '@wagmi/connectors' {
  interface WindowProvider {
    isPhantom?: true;
  }
}

declare global {
  interface Window {
    ethereum?: EthereumTypeWagmi;
    phantom?: { ethereum?: EthereumTypeWagmi };
  }
}

export const Phantom: WalletAdapterType = () => ({
  walletName: 'Phantom',
  walletId: 'phantom',
  icons: {
    light: WalletIcon,
    dark: WalletIcon,
  },
  detector: () =>
    !!globalThis.window?.phantom?.ethereum?.isPhantom ||
    !!globalThis.window?.ethereum?.isPhantom,
  downloadURLs: {
    default: 'https://phantom.app/download',
  },
  connector: new InjectedConnector({
    options: {
      name: 'Phantom',
      getProvider: () =>
        globalThis.window?.phantom?.ethereum || globalThis.window?.ethereum,
    },
  }),
});
