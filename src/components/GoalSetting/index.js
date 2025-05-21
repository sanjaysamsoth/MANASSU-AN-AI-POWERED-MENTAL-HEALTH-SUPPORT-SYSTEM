import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import NewGoalModal from "./NewGoalModal";
import GoalsList from "./GoalsList";

const Introduction = styled("p")`
  font-size: 16px;
  margin: 16px 0;
`;

function GoalSetting() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: { xs: "90%", sm: "90%", md: "700px" },
        margin: { xs: "0 auto", md: "0 auto" },
      }}
    >
      <Typography variant="h4" component="h1" marginTop={2} align="center" gutterBottom>
        Goal Setting
      </Typography>
      <Introduction>Set SMART goals to improve your mental well-being and track your progress over time.</Introduction>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create a New Goal
      </Button>
      <NewGoalModal open={open} handleClose={handleClose} />
      <GoalsList />
    </Box>
  );
}

export default GoalSetting;
