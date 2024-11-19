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
      "inputs": [
          {
              "internalType": "string",
              "name": "_message",
              "type": "string"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "payer",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "message",
              "type": "string"
          }
      ],
      "name": "PaymentLogged",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "string",
              "name": "oldMessage",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "newMessage",
              "type": "string"
          }
      ],
      "name": "MessageUpdated",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "string",
              "name": "message",
              "type": "string"
          }
      ],
      "name": "AdminMessage",
      "type": "event"
  },
  {
      "inputs": [],
      "name": "name",
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
      "inputs": [],
      "name": "symbol",
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
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "owner",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
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
      "inputs": [
          {
              "internalType": "string",
              "name": "_newMessage",
              "type": "string"
          }
      ],
      "name": "CourseBought",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "_newMessage",
              "type": "string"
          }
      ],
      "name": "CourseAdded",
      "outputs": [],
      "stateMutability": "nonpayable",
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
  }
]


// Replace this with your actual contract address after deployment
const CONTRACT_ADDRESS = "0xdE1FF49EB6B6F13B1B1D164d4118563D98860B12";

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
      const userAddress = "0x714a4E304E8305833E923649bcD814c71ab6E831";
      setUserAddress(userAddress);

      // Convert totalPrice to Ether (Assuming 1 ETH = 3000 USD for demo purposes)
      const ethPrice = (totalAmount / 9000000).toFixed(18); // Convert USD to Ether

      // Define the transaction parameters
      const transactionParameters = {
        to: "0x8e71258FdEd508E2C5FC5BB183eCEb7C2be7fd54", // Replace with your Ethereum address
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

//interacting with transfer function
const tx = await tokenContract.CourseBought("Course Bought");

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

        const userAccount = "0x71bE63f3384f5fb98995898A86B02Fb2426c5788";

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
