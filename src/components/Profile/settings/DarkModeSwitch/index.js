import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../../../store/features/darkMode/darkModeSlice"; 
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Switch, FormControlLabel, Box } from "@mui/material";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const DarkModeSwitch = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode); 
  const handleDarkModeChange = () => {
    dispatch(setDarkMode(!darkMode)); 
    console.log("Dark mode changed to: ", !darkMode);
  };

  return (
    <Container>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={handleDarkModeChange} />}
        label={
          <Box display="flex" alignItems="center">
            <Box mr={1}>Dark Mode</Box>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </Box>
        }
        sx={{
          "& .MuiTypography-root": {
            color: darkMode ? "#fff" : "rgba(0, 0, 0, 0.87)",
          },
        }}
      />
    </Container>
  );
};

export default DarkModeSwitch;
