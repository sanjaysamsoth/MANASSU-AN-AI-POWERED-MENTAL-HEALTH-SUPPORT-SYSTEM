import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";
import DeleteModal from "./DeleteModal";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./HabitItem.css";

import {
  deleteHabitAsync,
  updateHabitAsync,
  toggleCompletionAsync,
  fetchHabitsAsync,
  maintainHabitAsync,
} from "../../../../store/features/habits/habitsSlice";

import lightTheme from "../../../../theme";
import darkTheme from "../../../../theme/darkTheme";

const HabitItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.name);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [calendarDate] = useState(new Date());

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const previousDaysMaintainedDates = props.previousDaysMaintained?.map((timestamp) => new Date(timestamp)) || [];

  const backgroundColor = darkMode ? darkTheme.palette.background.paper : lightTheme.palette.background.default;
  const backgroundColorSecondary = darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.paper;

  const handleStreakNumberClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMaintainHabit = async () => {
    dispatch(maintainHabitAsync({ uid: user.uid, habitId: props.id }));
    dispatch(fetchHabitsAsync(user.uid));
    props.setRefreshHabits(!props.refreshHabits);
  };

  const handleDelete = async () => {
    dispatch(deleteHabitAsync({ uid: user.uid, habitId: props.id }));
    dispatch(fetchHabitsAsync(user.uid));
    props.setRefreshHabits(!props.refreshHabits);
  };

  const handleUpdate = async () => {
    dispatch(updateHabitAsync({
      uid: user.uid,
      habitId: props.id,
      updatedData: editedTitle,
    }));
    setIsEditing(false);
    dispatch(fetchHabitsAsync(user.uid));
    props.setRefreshHabits(!props.refreshHabits);
  };

  const handleToggleCompletion = async () => {
    dispatch(toggleCompletionAsync({ uid: user.uid, habitId: props.id }));
    dispatch(fetchHabitsAsync(user.uid));
    props.setRefreshHabits(!props.refreshHabits);
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1rem",
        marginBottom: "0.5rem",
        borderRadius: "4px",
        backgroundColor: !props.isCompleted ? backgroundColor : backgroundColorSecondary,
      }}
    >
      {isEditing ? (
        <TextField 
          value={editedTitle} 
          onChange={(e) => setEditedTitle(e.target.value)} 
          fullWidth 
          size="small" 
        />
      ) : (
        <>
          <Tooltip title={props.isCompleted ? "Mark as incomplete" : "Mark as completed"}>
            <Button onClick={handleToggleCompletion} size="small">
              {props.name}
            </Button>
          </Tooltip>
          <Tooltip title="View streak">
            <Button onClick={handleStreakNumberClick} size="small">
              Streak: {props.streak}
            </Button>
          </Tooltip>

          <Dialog onClose={handleClose} open={open}>
            <DialogContent>
              <Calendar
                value={calendarDate}
                tileClassName={({ date, view }) =>
                  view === "month" &&
                  previousDaysMaintainedDates.some(
                    (attendedDate) => attendedDate.toDateString() === date.toDateString()
                  ) && "attended"
                }
              />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Dates in green are days you maintained this habit.
              </Typography>
            </DialogContent>
          </Dialog>

          <Tooltip title="Maintain habit">
            <Button onClick={handleMaintainHabit} size="small" disabled={props.isCompleted}>
              Maintain
            </Button>
          </Tooltip>
        </>
      )}

      <Box>
        {isEditing ? (
          <Tooltip title="Save">
            <IconButton onClick={handleUpdate} size="small">
              <SaveIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Edit">
            <IconButton onClick={() => setIsEditing(true)} size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Delete">
          <IconButton onClick={() => setDeleteModal(true)} size="small">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <DeleteModal open={deleteModal} handleClose={() => setDeleteModal(false)} deleteHabit={handleDelete} habit={props} />
      </Box>
    </Box>
  );
};

export default HabitItem;