import { WalletAdapterType } from '@reef-knot/types';
import { InjectedConnector } from 'wagmi/connectors/injected';
import type { WindowProvider as WagmiWindowProvider } from '@wagmi/connectors';
import WalletIcon from './icons/okx.svg';
import WalletIconInverted from './icons/okx-inverted.svg';

declare module '@wagmi/connectors' {
  interface WindowProvider {
    isOkxWallet?: true;
  }
}

declare global {
  interface Window {
    ethereum?: WagmiWindowProvider;
    okxwallet?: WagmiWindowProvider;
  }
}

export const Okx: WalletAdapterType = () => ({
  walletName: 'OKX Wallet',
  walletId: 'okx',
  icons: {
    light: WalletIcon,
    dark: WalletIconInverted,
  },
  detector: () =>
    !!globalThis.window?.okxwallet?.isOkxWallet ||
    !!globalThis.window?.ethereum?.isOkxWallet,
  downloadURLs: {
    default: 'https://www.okx.com/download',
  },
  connector: new InjectedConnector({
    options: {
      name: 'OKX Wallet',
      getProvider: () =>
        globalThis.window?.okxwallet || globalThis.window?.ethereum,
    },
  }),
});
