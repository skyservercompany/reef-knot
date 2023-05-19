import { WalletsListEthereum } from '@reef-knot/wallets-list';

export const getConnectors = ({ rpc }: { rpc: Record<number, string> }) =>
  Object.values(WalletsListEthereum)
    .map((walletAdapter) => walletAdapter({ rpc }))
    .map((walletData) => walletData.connector);
