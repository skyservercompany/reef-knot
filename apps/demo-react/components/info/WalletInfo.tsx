import {
  useConnectorInfo,
  useSupportedChains,
  useWeb3,
} from 'reef-knot/web3-react';
import { useAccount, useNetwork, useWalletClient } from 'wagmi';
import { providers, Contract } from 'ethers';
import { useEffect, useState } from 'react';
import { Heading, Line } from './styles';
import erc20 from './abi/erc20.json';

export const WalletInfo = () => {
  const connectorInfo = useConnectorInfo();
  const supportedChainsData = useSupportedChains();
  const supportedChainIds = supportedChainsData.supportedChains.map(
    (c) => c.chainId,
  );

  const [balance, setBalance] = useState(0);

  const client = useWalletClient();
  const web3Info = useWeb3();

  useEffect(() => {
    if (!client.data) {
      return;
    }
    const { transport } = client.data;
    const provider = new (class Provider extends providers.JsonRpcProvider {
      // eslint-disable-next-line class-methods-use-this
      send(method: any, params: any): Promise<any> {
        return transport.request({ method, params });
      }
    })();
    const contract = new Contract('0x', erc20, provider);
    // @ts-expect-error foo
    contract.balanceOf(web3Info.account).then((value) => {
      console.log(value);
      setBalance(value.toString());
    });
  }, [client]);

  // Get data via web3-react

  // Get data via wagmi
  const {
    address: wagmiAddress,
    status: wagmiStatus,
    isConnected: wagmiIsConnected,
    connector,
  } = useAccount();

  const { chain } = useNetwork();

  return (
    <div>
      <Heading>web3-react data:</Heading>
      <div>
        <div>balance: {balance}</div>
        <code>
          <Line>providerName: {connectorInfo.providerName}</Line>
          <Line>
            <b>shimmed useWeb3() data below</b>
          </Line>
          <Line>account: {web3Info.account}</Line>
          <Line>active: {String(web3Info.active)}</Line>
          <Line>error: {web3Info.error?.message}</Line>
          <Line>Chain ID: {web3Info.chainId}</Line>
          <Line>
            <b>Supported Chains</b>
          </Line>
          <Line>
            Chain is unsupported: {String(supportedChainsData.isUnsupported)}
          </Line>
          <Line>Supported chain IDs: {supportedChainIds?.join(',')}</Line>
        </code>
      </div>
      <Heading>wagmi data:</Heading>
      <div>
        <code>
          <Line>status: {wagmiStatus}</Line>
          <Line>isConnected: {String(wagmiIsConnected)}</Line>
          <Line>address: {wagmiAddress}</Line>
          <Line>Connector ID: {connector?.id}</Line>
          <Line>Connector name: {connector?.name}</Line>
          <Line>Chain ID: {chain?.id}</Line>
          <Line>Chain is unsupported: {String(chain?.unsupported)}</Line>
        </code>
      </div>
    </div>
  );
};
