import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useSelector } from "react-redux";
import { db } from "../../utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function UpdateProgressModal({ open, handleClose, goalId }) {
  const [progress, setProgress] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const uid = user?.uid;

  useEffect(() => {
    if (!goalId || !uid) return;

    const fetchGoalData = async () => {
      try {
        const goalDocRef = doc(db, "users", uid, "goals", goalId);
        const goalSnap = await getDoc(goalDocRef);
        if (goalSnap.exists()) {
          const goalData = goalSnap.data();
          setProgress(goalData.progress);
        } else {
          console.error("No goal found with the provided goalId.");
        }
      } catch (error) {
        console.error("Error fetching goal:", error);
      }
    };

    fetchGoalData();
  }, [goalId, uid]);

  const handleSave = async () => {
    try {
      const goalDocRef = doc(db, "users", uid, "goals", goalId);
      await updateDoc(goalDocRef, { progress });
      handleClose();
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Progress Percentage</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            label="Progress Percentage"
            type="number"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            fullWidth
            sx={{ mt: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateProgressModal;
