import React, {useEffect, useState} from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import {ShoppingCart} from "@mui/icons-material";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedRecommendations = localStorage.getItem("recommendations");
    if (storedRecommendations) {
      try {
        const parsed = JSON.parse(storedRecommendations);
        setRecommendations(parsed.recommendations || []);
      } catch (err) {
        setError("Error loading recommendations");
        console.error(err);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{mt: 4}}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gift Recommendations
      </Typography>
      <Grid container spacing={4}>
        {recommendations.map((gift, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{height: "100%", display: "flex", flexDirection: "column"}}
            >
              <CardMedia
                component="img"
                height="200"
                image={`https://images.pexels.com/lib/api/${gift.name}.png`}
                alt={gift.name}
              />
              <CardContent sx={{flexGrow: 1}}>
                <Typography gutterBottom variant="h6" component="h2">
                  {gift.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {gift.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {gift.reason}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {gift.price}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  href={gift.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                >
                  View Deal
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {recommendations.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            No recommendations available. Please try the gift finder form again.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Recommendations;
