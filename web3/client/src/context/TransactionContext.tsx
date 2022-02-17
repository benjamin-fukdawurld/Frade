import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractAbi, contractAddress } from "../utils/constants";

export interface TransactionFormData {
  addressTo: string;
  amount: number;
  keyword: string;
  message: string;
}

export interface ITransactionContext {
  connectWallet: () => Promise<void>;
  accountAddresses: string[];
  transactionFormData: TransactionFormData;
  sendTransaction: () => Promise<void>;
  handleTransactionFormChange: (
    event: ChangeEvent<HTMLInputElement>,
    name: string
  ) => void;
}

export const TransactionContext = React.createContext<ITransactionContext>({
  connectWallet: () => {
    throw new Error("Context not implemented");
  },
  accountAddresses: [],
  transactionFormData: {
    addressTo: "",
    amount: 0,
    keyword: "",
    message: "",
  },
  handleTransactionFormChange: () => {},
  sendTransaction: async () => {},
});

const { ethereum } = window;

function getEthereumContract() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  console.log({
    provider,
    signer,
    transactionContract,
  });
}

type Props = { children: ReactNode };

export function TransactionProvider({ children }: Props) {
  const [connectedAccounts, setConnectedAccounts] = useState<any | null>(null);
  const [transactionFormData, setTransactionFormData] =
    useState<TransactionFormData>({
      addressTo: "",
      amount: 0,
      keyword: "",
      message: "",
    });

  const handleChange = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    setTransactionFormData((previousState) => {
      return {
        ...previousState,
        [name as keyof TransactionFormData]: event.target.value,
      };
    });
  };

  const checkWalletConnection = async () => {
    if (!ethereum) {
      alert("Please install metamask");
      throw new Error("Metamask is not installed");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    setConnectedAccounts(accounts);
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Please install metamask");
        throw new Error("Metamask is not installed");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts?.length) {
        console.log("No ethereum account found");
        return;
      }

      setConnectedAccounts(accounts);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum account");
    }
  };

  const sendTransaction = async () => {
    try {
      getEthereumContract();
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum account");
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        accountAddresses: connectedAccounts,
        transactionFormData,
        sendTransaction,
        handleTransactionFormChange: handleChange,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
