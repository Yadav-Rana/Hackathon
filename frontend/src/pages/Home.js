import React from "react";
import {useNavigate} from "react-router-dom";
import {Container, Typography, Button, Box, Paper, Grid} from "@mui/material";
import {CardGiftcard, Search, LocalOffer} from "@mui/icons-material";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Search sx={{fontSize: 40}} />,
      title: "Personalized Recommendations",
      description:
        "Get gift suggestions tailored to the recipient's interests and preferences.",
    },
    {
      icon: <CardGiftcard sx={{fontSize: 40}} />,
      title: "Wide Range of Options",
      description:
        "Explore gifts from multiple platforms to find the perfect match.",
    },
    {
      icon: <LocalOffer sx={{fontSize: 40}} />,
      title: "Best Deals",
      description: "Find the best prices and deals for your chosen gifts.",
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Find the Perfect Gift
          </Typography>
          <Typography variant="h5" sx={{mb: 4}}>
            Let AI help you choose the ideal present for your loved ones
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate("/find-gift")}
          >
            Start Finding
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{py: 8}}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{color: "primary.main", mb: 2}}>{feature.icon}</Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" align="center">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
