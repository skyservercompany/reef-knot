import { WalletAdapterType } from '@reef-knot/types';
import type { WindowProvider as WagmiWindowProvider } from '@wagmi/connectors';
import { InjectedConnector } from 'wagmi/connectors/injected';
import WalletIcon from './icons/exodus.svg';

declare module '@wagmi/connectors' {
  interface WindowProvider {
    isExodus?: true;
  }
}

declare global {
  interface Window {
    ethereum?: WagmiWindowProvider;
    exodus?: { ethereum?: WagmiWindowProvider };
  }
}

export const Exodus: WalletAdapterType = () => ({
  walletName: 'Exodus',
  walletId: 'exodus',
  icon: WalletIcon,
  detector: () =>
    !!globalThis.window?.exodus || !!globalThis.window?.ethereum?.isExodus,
  downloadURLs: {
    default: 'https://www.exodus.com/download/',
  },
  connector: new InjectedConnector({
    options: {
      name: 'Exodus',
      getProvider: () =>
        globalThis.window?.exodus?.ethereum || globalThis.window?.ethereum,
    },
  }),
});
