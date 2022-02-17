export default interface Trade {
  id: number;
  liquidation: boolean;
  price: number;
  side: string;
  size: number;
  time: string;
}
