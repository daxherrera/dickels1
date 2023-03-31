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

export default function Home() {
  // Hooks to connect to the user's MetaMask Wallet and view their address
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  let contractAddress = "0xB3Ee837af8F89cf21217C695366993D091397ce3";
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
    <div>
      {address ? (
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>
          <p>
            Your balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}  <br/>
          </p>
          <div>{isLoading ? <p>Loading...</p> : <p>Contract Name: {data}</p>}</div>
          <div>{allowanceLoading ? <p>Loading...</p> : <p>Allowance: {allowance.toNumber()}</p>}</div>
          <button onClick={transferDickels}>Get Dickels</button>

        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect Wallet</button>                
      )}
    </div>
  );
}
