import {
  useAddress,
  useDisconnect,
  useMetamask,
  useToken,
  useTokenBalance,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";

import './styles/index.css'

export default function Home() {
  // Hooks to connect to the user's MetaMask Wallet and view their address
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  let contractAddress = "0x7654Cd0171B7c3a6C8504795810f221a20C3Dc3f";
  // Connect to the token smart contract
  const token = useToken(contractAddress); // your token contract address here

  const { contract } = useContract(contractAddress);
  const { data, isLoading} = useContractRead(contract, "name");
  const { data: allowance, isLoading: allowanceLoading, error  } = useContractRead(
    contract, 
    "allowance", 
    "0x5fda8baa7d5e9404fe72166c9a767bb875b0efab",
    address
  );

  const { data: tokenBalance } = useTokenBalance(token, address);

  const { mutateAsync, writeLoading, writeError } = useContractWrite(contract, "transferFrom");
  
  const transferDickels = () => {
    mutateAsync(["0x5fda8baa7d5e9404fe72166c9a767bb875b0efab", address, allowance]);
   }
 

  return (
    <div className={'home-container'}>
      {address ? (
        <div className="home-button-container">
          <button className={'glowie-button'} onClick={disconnectWallet}>Disconnect Wallet</button>
          <p className="glowie-text">You can mine a Dickel for every $ you pledge at <a href='https://backed.by/TheDickShow'>backed.by/TheDickShow</a>. What can you do with Dickels? Idk... Thank you for supporting the show!</p>
          <p className="glowie-text">Your address: {address}</p>
          <p className="glowie-text">
            Your balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}  <br/>
          </p>
          <div className="loading">{allowanceLoading ? <p className="glowie-text">Loading...</p> : <p className="glowie-text">You are in deservement of {allowance.toNumber()} Dickels</p>}</div>
          <button className={'glowie-button'} onClick={transferDickels}>Get Dickels</button>

        </div>
      ) : (
        <div className="home-button-container">
          <button className={'glowie-button'} onClick={connectWithMetamask}>Connect Wallet</button>                
        </div>
      )}
    </div>
  );
}
