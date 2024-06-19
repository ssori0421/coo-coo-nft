/* eslint-disable @typescript-eslint/no-explicit-any */

interface Ethereum {
  isMetaMask?: boolean;
  request: (request: { method: string; params?: Array<any> }) => Promise<any>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  removeListener: (event: string, callback: (...args: any[]) => void) => void;
}

export interface EthereumWindow {
  ethereum?: Ethereum;
}

export interface Window {
  ethereum?: Ethereum;
}
