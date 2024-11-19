import React from "react";
import javascript1 from "../assets/js.png";
import python1 from "../assets/python.jpeg";
import react1 from "../assets/react-thumbnail.jpg";
import ml1 from "../assets/ml.jpeg";
import salesforce1 from "../assets/salesforce.png";
import aws1 from "../assets/aws.jpeg";

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

const Courses = ({ addToCart }) => {
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
    </Box>
  );
};

export default Courses;
