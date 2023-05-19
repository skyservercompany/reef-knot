import { createConfig, WagmiConfig } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { ReactNode } from 'react';
import { mainnet } from 'wagmi/chains';
import { getConnectors } from 'reef-knot/core-react';
import { rpc } from '../util/rpc';

const connectors = getConnectors({
  rpc,
});

const config = createConfig({
  logger: console,
  connectors,
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

const Wagmi = (props: { children: ReactNode }) => {
  const { children } = props;

  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default Wagmi;
