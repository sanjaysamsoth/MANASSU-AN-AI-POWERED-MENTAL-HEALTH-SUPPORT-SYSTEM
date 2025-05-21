import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "@mui/material/styles/styled";
import { Button, TextField, Box, Typography } from "@mui/material";
import { auth } from "../../../utils/firebase"; // Correct modular import
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { login } from "../../../store/features/auth/authSlice.js";
import logo from "../../../assets/images/logo.svg";

// Styled components
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
  borderRadius: "8px",
  backgroundColor: theme.palette.background.box,
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password); // ✅ Correct usage
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(from);
      }
    });
    return () => unsubscribe(); 
  }, [navigate, from]);

  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Form component="form" onSubmit={handleLogin}>
        <Typography variant="h5" gutterBottom>
          Login
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
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton variant="contained" type="submit">
          Login
        </StyledButton>
      </Form>
    </Container>
  );
};

export default Login;
