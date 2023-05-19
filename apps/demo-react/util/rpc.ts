import { mainnet, goerli } from 'wagmi/chains';

export const rpc = {
  [mainnet.id]: `https://eth.llamarpc.com`,
  [goerli.id]: `https://ethereum-goerli.publicnode.com`,
};
