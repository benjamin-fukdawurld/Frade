import process from "process";
import abi from "./Transactions.json";

export const contractAbi = abi.abi;
export const contractAddress = import.meta.env
  .REACT_APP_CONTRACT_ADDRESS as string;
