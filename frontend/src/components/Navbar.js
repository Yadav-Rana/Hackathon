import React from "react";
import {AppBar, Toolbar, Typography, Button, Box} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Gifty
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/find-gift">
            Find Gift
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
