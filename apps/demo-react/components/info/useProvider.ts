import { useWalletClient } from "wagmi";
import { providers } from "ethers";

const map = new WeakMap();

class ViemProvider extends providers.JsonRpcProvider {
  constructor(private client) {}
  send(method: any, params: any): Promise<any> {
    return this.client.transport.request({ method, params });
  }
}

const getProvider = (client) => {
  if (!map.has(client)) {
    const provider = new ViemProvider(client);
    map.set(client, provider);
    return provider;
  }
  return map.get(client);
};

export function useProvider () {
  const { data: client } = useWalletClient();
  return getProvider(client);
}

export function useSigner () {
  const { data: client } = useWalletClient();
  return getProvider(client);
}
