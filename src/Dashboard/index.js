import React from "react";

import mainImage from "../assets/Banner.png";
import react1 from "../assets/react-thumbnail.jpg";
import python1 from "../assets/python.jpeg";
import ml1 from "../assets/ml.jpeg";
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

const courses = [
  {
    id: 1,
    name: "React for Beginners",
    image: react1,
    rating: 4.5,
    enrolled: 1200,
    duration: "5 hours",
    level: "Beginner",
    category: "Web Development",
    price: 29.99,
  },
  {
    id: 2,
    name: "Mastering Python",
    image: python1,
    rating: 4.7,
    enrolled: 2000,
    duration: "8 hours",
    level: "Intermediate",
    category: "Programming",
    price: 49.99,
  },
  {
    id: 3,
    name: "Machine Learning",
    image: ml1,
    rating: 4.4,
    enrolled: 1500,
    duration: "3 hours",
    level: "Beginner",
    category: "Data Science",
    price: 14.99,
  },
  // Add more courses as needed
];

const Dashboard = ({ addToCart }) => {
  return (
    
    <Box p={2} sx={{  backgroundColor: "#eff6e0" }}>
      <img src={mainImage} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      <Typography variant="h4" gutterBottom>
        Featured Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
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

export default Dashboard;
