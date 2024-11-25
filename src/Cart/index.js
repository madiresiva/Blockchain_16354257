import React, { useState } from "react";
import { ethers } from "ethers";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import Web3 from "web3";


const TokenABI = [
  {
    "inputs": [],
    "name": "CourseAdded",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "CourseBought",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fetchLogs",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "action",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "productName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "productPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Token.Log[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_adminMessage",
        "type": "string"
      }
    ],
    "name": "logAdminMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "productName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "productPrice",
        "type": "uint256"
      }
    ],
    "name": "logProductPurchase",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "message",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "m",
        "type": "string"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "logs",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "action",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "productName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "productPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Token.Log[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];




// Replace this with your actual contract address after deployment
const CONTRACT_ADDRESS = "0x378C0549DAc125b3D9FD4d1a578182C58b590ED8";

const Cart = ({ cartItems }) => {
  const [loading, setLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("");

  const [userAddress, setUserAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = cartItems
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed. Please install MetaMask to proceed.");
        setIsProcessing(false);
        return;
      }

      // Create a new instance of Web3 using the MetaMask provider
      const web3 = new Web3(window.ethereum);

      // Request MetaMask to connect
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const userAddress = "0x25283509007560343d393b4EFe6010d06d8DFD2B";
      setUserAddress(userAddress);

      // Convert totalPrice to Ether (Assuming 1 ETH = 3000 USD for demo purposes)
      const ethPrice = (totalAmount / 9000000).toFixed(18); // Convert USD to Ether

      // Define the transaction parameters
      const transactionParameters = {
        to: "0xF42f8C3D6f7bF99894B084513E27489199e728B2", // Replace with your Ethereum address
        from: userAddress, // MetaMask account
        value: web3.utils.toWei(ethPrice, "ether"), // Convert Ether to Wei
        gas: "20000", // Basic transaction gas limit
      };

      // Send the transaction
      const transactionHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      //interacting with contract
      const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
const signer = provider.getSigner();

// Initialize the contract with ABI, address, and signer
const tokenContract = new ethers.Contract(CONTRACT_ADDRESS, TokenABI, signer);

// Call balanceOf to get the token balance for an account (e.g., the connected user's address)
//const balance = await tokenContract.balanceOf(signer.getAddress());
//console.log("Token balance:", balance.toString());

//printing functions
console.log("Contract ABI methods: ", tokenContract.functions);  // Check if setMessage appears

for (const item of cartItems) {
  const { name: courseName, price: coursePrice } = item;

  // Convert coursePrice to the required unit (assuming price is in Ether)
  const coursePriceInWei = ethers.utils.parseEther(coursePrice.toString());

  // Call the `logProductPurchase` method
  const transaction = await tokenContract.logProductPurchase(
    userAddress,
    courseName,
    coursePriceInWei
  );
}


      console.log("Transaction sent: ", transactionHash);
      alert(`Transaction successful! Hash: ${transactionHash}`);

      setTimeout(() => {
        window.location.href = "https://www.youtube.com/watch?v=bMknfKXIFA8";
      }, 1000);
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Transaction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to connect to MetaMask and initiate the payment
  const handlePayment1 = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setLoading(true);
        setTransactionStatus("");

        // Request account access if needed
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();

        if (accounts.length === 0) {
          throw new Error("No MetaMask accounts found");
        }

        const userAccount = "0x25283509007560343d393b4EFe6010d06d8DFD2B";

        // Connect to the Token contract
        const tokenContract = new web3.eth.Contract(TokenABI, CONTRACT_ADDRESS);

        // Convert totalAmount to Wei format (assuming it's the price in ETH)
        const totalInWei = web3.utils.toWei(totalAmount.toString(), "ether");

        // Send transaction to the contract
        await tokenContract.methods.transfer(userAccount, totalInWei).send({
          from: userAccount,
          gas: 200000,
        });

        setTransactionStatus("Transaction Successful!");
      } catch (error) {
        console.error(error);
        setTransactionStatus("Transaction Failed");
      } finally {
        setLoading(false);
      }
    } else {
      alert("MetaMask is not installed. Please install it to proceed.");
    }
  };

  return (
    <Box  sx={{ position: "relative", minHeight: "100vh", pb: 8,  backgroundColor: "#eff6e0" }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {/* Display cart items */}
      <Grid container spacing={3}>
        {cartItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${item.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Total Price */}
      <Box mt={3}>
        {cartItems.length > 0 && (
          <Typography variant="h5">Total: ${totalAmount}</Typography>
        )}
      </Box>

      {/* Floating Footer with Proceed to Payment button */}
      {cartItems.length > 0 && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            padding: 2,
            borderTop: "1px solid #ddd",
            textAlign: "right",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Proceed with Payment"}
          </Button>
          {transactionStatus && (
            <Typography variant="body2" color="text.secondary" mt={1}>
              {transactionStatus}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Cart;
