
import React, { useState } from "react";
import javascript1 from "../assets/js.png";
import python1 from "../assets/python.jpeg";
import react1 from "../assets/react-thumbnail.jpg";
import ml1 from "../assets/ml.jpeg";
import salesforce1 from "../assets/salesforce.png";
import aws1 from "../assets/aws.jpeg";
import { ethers } from "ethers"; 

import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Button,
} from "@mui/material";

const coursesList = [
  {
    id: 1,
    name: "JavaScript Essentials",
    image: javascript1,
    rating: 4.3,
    enrolled: 1800,
    duration: "6 hours",
    level: "Beginner",
    category: "Web Development",
    price: 19.99,
  },
  {
    id: 2,
    name: "Advanced React",
    image: react1,
    rating: 4.8,
    enrolled: 2200,
    duration: "12 hours",
    level: "Advanced",
    category: "Web Development",
    price: 49.99,
  },
  {
    id: 3,
    name: "Data Science with Python",
    image: python1,
    rating: 4.7,
    enrolled: 3000,
    duration: "10 hours",
    level: "Intermediate",
    category: "Data Science",
    price: 59.99,
  },
  {
    id: 4,
    name: "Machine Learning",
    image: ml1,
    rating: 4.4,
    enrolled: 1500,
    duration: "3 hours",
    level: "Beginner",
    category: "Data Science",
    price: 14.99,
  },
  {
    id: 5,
    name: "Salesforce",
    image: salesforce1,
    rating: 4.9,
    enrolled: 1200,
    duration: "13 hours",
    level: "Advanced",
    category: "salesforce",
    price: 69.99,
  },
  {
    id: 6,
    name: "Amazon Web Services",
    image: aws1,
    rating: 4.3,
    enrolled: 3000,
    duration: "11 hours",
    level: "Intermediate",
    category: "AWS",
    price: 39.99,
  },
  
  // Add more courses as needed
];
const CONTRACT_ADDRESS = "0x378C0549DAc125b3D9FD4d1a578182C58b590ED8"; // Replace with your contract address
const ABI = [
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


const Courses = ({ addToCart }) => {

  const [logs, setLogs] = useState([]); // State to store fetched logs
  const [loading, setLoading] = useState(false); // State for loading status

  const fetchLogs = async () => {
    try {
      setLoading(true);

      // Check if MetaMask is available
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed. Please install it to fetch logs.");
        return;
      }

      // Connect to the smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

      // Fetch logs from the contract
      const logsData = await contract.fetchLogs();

      // Format logs for display
      const formattedLogs = logsData.map((log) => ({
        user: log.user,
        action: log.action,
        productName: log.productName,
        productPrice: ethers.utils.formatEther(log.productPrice), // Convert price from Wei to Ether
        timestamp: new Date(log.timestamp * 1000).toLocaleString(), // Convert timestamp to human-readable date
      }));

      setLogs(formattedLogs);
    } catch (error) {
      console.error("Error fetching logs:", error);
      alert("Failed to fetch logs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{  backgroundColor: "#eff6e0" }}>
      <Grid container spacing={1}>
        {coursesList.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {course.name}
                </Typography>
                <Rating value={course.rating} readOnly />
                <Typography variant="body2" color="text.secondary">
                  Enrolled: {course.enrolled}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {course.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Level: {course.level}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {course.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${course.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(course)}
                  sx={{ mt: 1 }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* This is where I am adding code: Fetch Logs Button and Logs Display */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={fetchLogs}
          disabled={loading}
        >
          {loading ? "Fetching Logs..." : "Fetch Logs"}
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        {logs.length > 0 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Transaction Logs
            </Typography>
            {logs.map((log, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  backgroundColor: "#fff",
                }}
              >
                <Typography variant="body1">
                  <strong>User:</strong> {log.user}
                </Typography>
                <Typography variant="body1">
                  <strong>Action:</strong> {log.action}
                </Typography>
                <Typography variant="body1">
                  <strong>Product:</strong> {log.productName}
                </Typography>
                <Typography variant="body1">
                  <strong>Price:</strong> {log.productPrice} ETH
                </Typography>
                <Typography variant="body1">
                  <strong>Timestamp:</strong> {log.timestamp}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {/* This is the end of adding code: Fetch Logs Button and Logs Display */}

    </Box>
  );
};

export default Courses;
