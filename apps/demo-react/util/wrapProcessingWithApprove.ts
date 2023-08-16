import { parseEther } from '@ethersproject/units';
import { WstethAbi } from '@lido-sdk/contracts';
import { getTokenAddress, TOKENS } from '@lido-sdk/constants';

import invariant from 'tiny-invariant';
import type { Web3Provider } from '@ethersproject/providers';
import { getBackendRPCPath } from './contractTestingUtils';
import { getStaticRpcBatchProvider } from '@lido-sdk/providers';

const ETH = 'ETH';

type UnwrapProcessingProps = (
  providerWeb3: Web3Provider | undefined,
  wstethContractWeb3: WstethAbi | null,
  wstethBalanceUpdate: () => void,
  stethBalanceUpdate: () => void,
  chainId: string | number | undefined,
  inputValue: string,
) => Promise<void>;

export const unwrapProcessing: UnwrapProcessingProps = async (
  providerWeb3,
  wstethContractWeb3,
  wstethBalanceUpdate,
  stethBalanceUpdate,
  chainId,
  inputValue,
) => {
  if (!wstethContractWeb3 || !chainId) {
    return;
  }

  invariant(providerWeb3, 'must have providerWeb3');

  const provider = getStaticRpcBatchProvider(
    chainId as any,
    getBackendRPCPath(chainId),
  );

  try {
    const feeData = await provider.getFeeData();
    const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? undefined;
    const maxFeePerGas = feeData.maxFeePerGas ?? undefined;

    const callback = async () => {
      return wstethContractWeb3.unwrap(parseEther(inputValue), {
        maxPriorityFeePerGas,
        maxFeePerGas,
      });
    };

    const transaction = await callback();

    const handleEnding = () => {
      stethBalanceUpdate();
      wstethBalanceUpdate();
    };

    if (typeof transaction === 'object') {
      await transaction.wait();
    }

    handleEnding();
  } catch (error: any) {
    throw new Error(error);
  }
};

type WrapProcessingWithApproveProps = (
  chainId: number | undefined,
  providerWeb3: Web3Provider | undefined,
  stethContractWeb3: WstethAbi | null,
  ethBalanceUpdate: () => void,
  stethBalanceUpdate: () => void,
  inputValue: string,
  selectedToken: string,
) => Promise<void>;

export const wrapProcessingWithApprove: WrapProcessingWithApproveProps = async (
  chainId,
  providerWeb3,
  wstethContractWeb3,
  ethBalanceUpdate,
  stethBalanceUpdate,
  inputValue,
  selectedToken,
) => {
  if (!chainId || !wstethContractWeb3) {
    return;
  }

  invariant(providerWeb3, 'must have providerWeb3');

  const wstethTokenAddress = getTokenAddress(chainId, TOKENS.WSTETH);

  const provider = getStaticRpcBatchProvider(
    chainId,
    getBackendRPCPath(chainId),
  );
  const feeData = await provider.getFeeData();
  const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? undefined;
  const maxFeePerGas = feeData.maxFeePerGas ?? undefined;

  const handleEnding = () => {
    ethBalanceUpdate();
    stethBalanceUpdate();
  };

  try {
    if (selectedToken === ETH) {
      const overrides = {
        to: wstethTokenAddress,
        value: parseEther(inputValue),
        maxPriorityFeePerGas,
        maxFeePerGas,
      };

      const callback = async () => {
        return wstethContractWeb3.signer.sendTransaction(overrides);
      };

      const transaction = await callback();

      if (typeof transaction === 'object') {
        await transaction.wait();
      }

      handleEnding();
    } else if (selectedToken === TOKENS.STETH) {
      const overrides = {
        maxPriorityFeePerGas,
        maxFeePerGas,
      };

      const callback = async () => {
        return wstethContractWeb3.wrap(parseEther(inputValue), overrides);
      };

      const transaction = await callback();

      if (typeof transaction === 'object') {
        await transaction.wait();
      }

      handleEnding();
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
