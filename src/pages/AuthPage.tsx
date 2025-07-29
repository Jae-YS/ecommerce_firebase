import { useState, type FormEvent } from "react";
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../context/ui/useUIContext";

const AuthPage = () => {
  const { setIsAppLoading } = useUIContext();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setIsAppLoading(true);

      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const uid = userCredential.user.uid;

        await setDoc(doc(db, "users", uid), {
          email,
          displayName,
          createdAt: Date.now(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      navigate("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
      setIsAppLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 420,
          width: "100%",
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h2"
          sx={{ textAlign: "center", mb: 3, fontSize: "1.5rem" }}
        >
          {isSignup ? "Create an Account" : "Welcome Back"}
        </Typography>

        <Tabs
          value={isSignup ? 1 : 0}
          onChange={(_, val) => setIsSignup(val === 1)}
          sx={{ mb: 3 }}
          centered
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {isSignup ? (
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
          ) : null}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5, fontWeight: 600 }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AuthPage;
