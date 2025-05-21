import React from "react";
import DarkModeSwitch from "./settings/DarkModeSwitch";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  min-height: 100vh;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Profile
      </Typography>

      <Box mt={2}>
        <DarkModeSwitch />
      </Box>

      {user && (
        <Box mt={4} width="100%">
          <Button variant="contained" color="primary" fullWidth>
            <StyledLink to="/change-password">Change Password</StyledLink>
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Profile;