import React, { ChangeEvent, useState, useContext } from "react";

import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import type { ITransactionContext } from "../context/TransactionContext";

import Loader from "./Loader";

type Props = {};

type InputProps = {
  placeholder?: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>, name: string) => void;
};

function Input(props: InputProps) {
  return (
    <input
      name={props.name}
      type={props.type}
      step="0.0001"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e, props.name)}
      className="my-2 p-2 w-full outline-none bg-transparent text-white border-none text-sm rounded-sm white-glassmorphism"
    />
  );
}

const commonStyles = `
  min-h-[70px] min-w-[120px] md:min-w-fit px-0 md:px-2 flex justify-center items-center border-[0.5px] border-gray-400 text-sm text-white font-light"
`;

export default function Welcome({}: Props) {
  const {
    connectWallet,
    accountAddresses,
    handleTransactionFormChange,
    transactionFormData,
    sendTransaction,
  } = useContext<ITransactionContext>(TransactionContext);

  const [blockchainAddr, setBlockchainAddr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const truncateAccountAddress = (addr: string): string =>
    `${addr.substring(0, 5)}...${addr.substring(addr.length - 3)}`;

  const formatAccountAddress = (accounts?: string[]): string =>
    accounts?.length
      ? truncateAccountAddress(accounts[0])
      : "No address provided";

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();

    const { addressTo, amount, keyword, message } = transactionFormData;
    if (!addressTo || !amount || !keyword || !message) {
      return;
    }

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col justify-between items-start md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-5xl md:text-3xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            Krypt.
          </p>
          {!accountAddresses && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 mt-10 mf:mt-0">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={`rounded-tr-2xl md:rounded-none ${commonStyles}`}>
              Security
            </div>
            <div className={`md:rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`md:rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={`rounded-bl-2xl md:rounded-none ${commonStyles}`}>
              Low fees
            </div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mt-10 md:mt-0">
          <div className="flex p-3 justify-end items-start flex-col rounded-xl h-40 w-72 md:w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="flex justify-center items-center w-10 h-10 rounded-full border-2 border-white">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {formatAccountAddress(accountAddresses)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 w-11/12 md:w-full rounded-2xl flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              onChange={handleTransactionFormChange}
              value={transactionFormData.addressTo}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              onChange={handleTransactionFormChange}
              value={transactionFormData.amount}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              onChange={handleTransactionFormChange}
              value={transactionFormData.keyword}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              onChange={handleTransactionFormChange}
              value={transactionFormData.message}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {isLoading ?? false ? (
              <Loader />
            ) : (
              <button
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                type="button"
                onClick={handleSubmit}
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}