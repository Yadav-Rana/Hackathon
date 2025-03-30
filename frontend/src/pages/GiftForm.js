import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

function GiftForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    hobbies: "",
    interests: "",
    occasion: "",
    budget: 50,
    relation:"",
  });

  const occasions = [
    "Birthday",
    "Anniversary",
    "Wedding",
    "Graduation",
    "Holiday",
    "Other",
  ];

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/recommendations",
        formData
      );

      // Store recommendations in localStorage
      localStorage.setItem("recommendations", JSON.stringify(response.data));
      navigate("/recommendations");
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setError(
        error.response?.data?.error ||
          "Failed to get recommendations. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{mt: 4}}>
      <Paper elevation={3} sx={{p: 4}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Find the Perfect Gift
        </Typography>
        {error && (
          <Alert severity="error" sx={{mb: 2}}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Relation"
            name="relation"
            type="text"
            value={formData.relation}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            margin="normal"
            required
            helperText="Separate hobbies with commas"
          />
          <TextField
            fullWidth
            label="Interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            margin="normal"
            required
            helperText="Separate interests with commas"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Occasion</InputLabel>
            <Select
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              label="Occasion"
              required
            >
              {occasions.map((occasion) => (
                <MenuItem key={occasion} value={occasion}>
                  {occasion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{mt: 2}}>
            <Typography gutterBottom>Budget (USD)</Typography>
            <Slider
              name="budget"
              value={formData.budget}
              onChange={(e, value) =>
                handleChange({target: {name: "budget", value}})
              }
              min={10}
              max={1000}
              step={10}
              marks
              valueLabelDisplay="auto"
            />
            <Typography variant="body2" color="text.secondary">
              ${formData.budget}
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{mt: 3}}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Get Recommendations"
            )}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default GiftForm;
