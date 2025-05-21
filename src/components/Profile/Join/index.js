import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../utils/firebase"; 
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import styled from "@mui/material/styles/styled";
import { Button, TextField, Box, Typography } from "@mui/material";
import logo from "../../../assets/images/logo.svg";
import { useDispatch } from "react-redux";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: window.innerHeight - 64,
}));

const Logo = styled("img")(({ theme }) => ({
  width: "200px",
  marginBottom: "48px",
}));

const Form = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  backgroundColor: theme.palette.background.box,
  borderRadius: "8px",
  padding: "32px",
  boxShadow: theme.shadows[1],
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "24px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  marginTop: "24px",
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: "24px",
}));

const Join = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Check if username already exists in Firestore
      const usersRef = collection(db, "users");
      const usernameQuery = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(usernameQuery);
      if (!querySnapshot.empty) {
        throw new Error("Username already exists");
      }

      //  Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      //  Set displayName for the user
      await updateProfile(user, { displayName: username });

      //  Add user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Form component="form" onSubmit={handleJoin}>
        <Typography variant="h5" gutterBottom>
          Join
        </Typography>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <StyledTextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledTextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledTextField
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <StyledButton variant="contained" type="submit">
          Join
        </StyledButton>
      </Form>
    </Container>
  );
};

export default Join;
