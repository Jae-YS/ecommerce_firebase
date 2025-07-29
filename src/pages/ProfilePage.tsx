import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  TextField,
  Stack,
  Avatar,
} from "@mui/material";
import useFetchUser from "../hooks/useFetchUser";
import { useAuthContext } from "../context/auth/useAuthContext";
import { signOut, updateEmail } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useUIContext } from "../context/ui/useUIContext";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useOrdersByUser } from "../hooks/useOrdersByUser";

const ProfilePage: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useFetchUser();
  const { setIsAppLoading } = useUIContext();
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const { data: orders = [] } = useOrdersByUser(user?.email || "");

  useEffect(() => {
    setIsAppLoading(isLoading);
  }, [isLoading, setIsAppLoading]);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.displayName || "",
        email: data.email || "",
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      name: formData.name,
      email: formData.email,
    });

    if (user.email !== formData.email) {
      await updateEmail(user, formData.email);
    }

    setEditing(false);
    refetch();
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  const handleDelete = async () => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid));
    await user.delete();
    navigate("/auth");
  };

  if (isLoading || !data) return null;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, px: 3 }}>
      <Typography variant="h4" fontWeight={600} mb={4}>
        My Profile
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "background.paper",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        {isError || !data ? (
          <Typography color="error">Failed to load profile data.</Typography>
        ) : (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={3}
            >
              <Avatar sx={{ width: 64, height: 64, fontSize: 28 }}>
                {data.displayName?.charAt(0).toUpperCase() || "U"}
              </Avatar>
            </Box>

            {editing ? (
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <Button onClick={() => setEditing(false)} color="secondary">
                  Cancel
                </Button>
              </Stack>
            ) : (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Name:</strong> {data.displayName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Email:</strong> {data.email}
                </Typography>
                {data.createdAt && (
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Joined:</strong>{" "}
                    {new Date(data.createdAt).toLocaleDateString()}
                  </Typography>
                )}
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1}>
                  <Button
                    onClick={() => setEditing(true)}
                    variant="outlined"
                    fullWidth
                  >
                    Edit Profile
                  </Button>
                  <Button
                    onClick={handleGoBack}
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    Back to Home
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="outlined"
                    color="error"
                    fullWidth
                  >
                    Delete Account
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outlined"
                    color="error"
                    fullWidth
                  >
                    Log Out
                  </Button>
                </Stack>
              </>
            )}
          </>
        )}
      </Paper>

      {!editing && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" mb={2}>
            Order History
          </Typography>

          {orders.length === 0 ? (
            <Typography color="text.secondary">
              You haven't placed any orders yet.
            </Typography>
          ) : (
            orders.map((order) => (
              <Paper
                key={order.id}
                sx={{
                  p: 2,
                  mb: 2,
                  border: "1px solid",
                  borderColor: "grey.200",
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "grey.50" },
                }}
                onClick={() => navigate(`/order/${order.id}`)}
              >
                <Typography variant="subtitle1">
                  Order ID: {order.id}
                </Typography>
                <Typography variant="body2">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Total: ${order.total?.toFixed(2)}
                </Typography>
              </Paper>
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
