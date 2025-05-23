import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";

import { auth } from "../../../utils/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword
} from "firebase/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding-top: 64px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error("User not authenticated.");

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setMessage("Password successfully changed.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Change Password</Typography>
      <Form onSubmit={handleChangePassword}>
        <TextField
          label="Current Password"
          type="password"
          variant="outlined"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          variant="outlined"
          required
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Change Password
        </Button>
        {message && (
          <Typography variant="subtitle1" color={message.includes("success") ? "primary" : "error"}>
            {message}
          </Typography>
        )}
      </Form>
    </Container>
  );
};

export default ChangePassword;
