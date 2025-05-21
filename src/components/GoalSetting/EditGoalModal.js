import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

const StyledFormControl = styled(FormControl)`
  margin: 8px 0;
  width: 100%;
`;

function EditGoalModal({ open, handleClose, goalId }) {
  const [goalTitle, setGoalTitle] = useState("");
  const [description, setDescription] = useState("");
  const [smartGoal, setSmartGoal] = useState({
    specific: false,
    measurable: false,
    achievable: false,
    relevant: false,
    timeBound: false,
  });

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
          setGoalTitle(goalData.title);
          setDescription(goalData.description);
          setSmartGoal(goalData.smartGoal);
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
    const updatedGoal = {
      title: goalTitle,
      description,
      smartGoal,
    };

    try {
      const goalDocRef = doc(db, "users", uid, "goals", goalId);
      await updateDoc(goalDocRef, updatedGoal);
      handleClose();
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Goal</DialogTitle>
      <DialogContent>
        <Box>
          <StyledFormControl>
            <TextField
              label="Goal Title"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              fullWidth
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </StyledFormControl>
          <StyledFormControl>
            <FormLabel component="legend">SMART Goal Checklist</FormLabel>
            <FormGroup>
              {Object.keys(smartGoal).map((key) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={smartGoal[key]}
                      onChange={(e) =>
                        setSmartGoal({ ...smartGoal, [key]: e.target.checked })
                      }
                      name={key}
                    />
                  }
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              ))}
            </FormGroup>
          </StyledFormControl>
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

export default EditGoalModal;
