import React, { useState,useEffect } from "react";
import Navbar from "./Navbar";
import image1 from "./assets/turf1.jpg";
import image2 from "./assets/turf2.jpg";
import image3 from "./assets/turf3.jpg";
import image4 from "./assets/turf4.jpg";
import image5 from "./assets/turf5.jpg";
import image6 from "./assets/turf6.jpg";
import image7 from "./assets/turf7.jpg";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Container,
  Box,
  Stack,
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TurfList() {
  const navigate = useNavigate();
  const [bookedTurf, setBookedTurf] = useState({ turf: "", rate: "" });
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on load
  }, []);

  const turfs = [
    { _id: "1", name: "Vishwas Garden", ratePerHour: 700, img: image1,location:"Asaram Bapu Ashram near Bapu Pool" },
    { _id: "2", name: "HomeGround", ratePerHour: 700, img: image2 ,location:"Suyojit Gardens near Datta Mandir"},
    { _id: "3", name: "PlayBox", ratePerHour: 600, img: image3,location:"In front of Barobar Restaurant Bapu Pool" },
    { _id: "4", name: "Kage", ratePerHour: 800, img: image4 ,location:"Pathardi Gaon Devlali Road"},
    { _id: "5", name: "DonBosco", ratePerHour: 800, img: image5 ,location:"College Road in front of Manyavaar"},
    { _id: "6", name: "Hattrick", ratePerHour: 900, img: image6 ,location:"Near Chopda Lawns Old Gangapur Naka"},
    { _id: "7", name: "BigBounce", ratePerHour: 1000, img: image7 ,location:"RD Circle near Karmayogi Nagar"},
  ];

  const handleBooking = async (turf) => {
    const booking = { turfName: turf.name, rate: turf.ratePerHour };
    setBookedTurf(booking);
    console.log("Booked:", booking);

    try {
      const response = await axios.post("https://urbanplaybackend.onrender.com/turfs", booking);
      console.log("Booking response:", response.data);
      alert("Turf booked successfully!");
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <Container
      sx={{
        py: 6,
        maxHeight: '90vh',
        overflowY: 'auto',
        direction: 'ltr',
        display: 'block',
      }}
    >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight={600}>
            ⚽ Available Turfs for Booking
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {turfs.map((turf) => (
            <Grid item key={turf._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",  // Ensures that cards stretch to fill grid items uniformly
                  minHeight: "360px",  // Minimum height to keep the cards even
                  borderRadius: 3,
                  boxShadow: 5,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={turf.img}
                  alt={turf.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" fontWeight="bold">
                    {turf.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₹{turf.ratePerHour} per hour
                  </Typography>
                  <Typography>{turf.location}</Typography>
                </CardContent>
                <CardActions sx={{ mt: "auto" }}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<SportsSoccerIcon />}
                    sx={{ textTransform: "none" }}
                    onClick={() => handleBooking(turf)}
                  >
                    Book Now
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<LocationOnIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    Location
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default TurfList;
