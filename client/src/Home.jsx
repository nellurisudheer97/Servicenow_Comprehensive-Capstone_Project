import { Stack, Typography, Button, Card, CardContent, Grid, TextField, MenuItem} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const [formData, setFormData] = useState({
    impact: "",
    urgency: "",
    short_description: "",
  });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
        try {
          const incidentList = await axios.get(
            "http://localhost:3001/api/incidents",
            { withCredentials: true }
          );
          setIncidents(incidentList.data.result || []);
        } catch (err) {
          console.error("Failed to fetch incidents:", err);
        }
      }
    }
    fetchData();
  }, [isLogged]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // FIXED INSERT + UPDATE LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      impact: Number(formData.impact),
      urgency: Number(formData.urgency),
      short_description: formData.short_description,
    };

    try {
      if (editing) {
        await axios.put(
          `http://localhost:3001/api/incidents/${editing}`,
          payload,
          { withCredentials: true }
        );
        alert("Incident updated successfully!");
      } else {
        await axios.post("http://localhost:3001/api/incidents", payload, {
          withCredentials: true,
        });
        alert("Incident inserted successfully!");
      }

      const res = await axios.get("http://localhost:3001/api/incidents", {
        withCredentials: true,
      });
      setIncidents(res.data.result || []);

      setFormData({ impact: "", urgency: "", short_description: "" });
      setEditing(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save incident.");
    }
  };

  const handleDelete = async (sys_id) => {
    try {
      await axios.delete(`http://localhost:3001/api/incidents/${sys_id}`, {
        withCredentials: true,
      });
      setIncidents((prev) => prev.filter((inc) => inc.sys_id !== sys_id));
      alert("Incident deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete the incident.");
    }
  };

  // FIXED EDIT (values now load correctly)
  const handleEdit = (inc) => {
    setFormData({
      impact: String(inc.impact || ""),
      urgency: String(inc.urgency || ""),
      short_description: inc.short_description || "",
    });
    setEditing(inc.sys_id);
  };

  const filteredIncidents = incidents.filter((inc) =>
    inc.short_description.toLowerCase().includes(search.toLowerCase()) ||
    inc.number.toLowerCase().includes(search.toLowerCase()) ||
    inc.priority.toLowerCase().includes(search.toLowerCase()) ||
    inc.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {isLogged && (
        <Stack spacing={3}>
          <Typography variant="h4" align="center" sx={{ mt: 4 }}>
            Incident Management System
          </Typography>

          {/* form  */}
          <Card
            sx={{
              width: "78",
              margin: "auto",
              mt: 3,
              p: 2,
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{ py: 2 }}
              >
                {/* Impact values */}
                <TextField
                  select
                  label="Impact"
                  name="impact"
                  value={formData.impact}
                  onChange={handleChange}
                  size="small"
                  sx={{
                    width: 150,
                    borderRadius: "8px",
                    "& .MuiInputBase-input": { color: "text.primary" },
                    "& .MuiInputLabel-root": { color: "text.secondary" },
                  }}
                >
                  <MenuItem value="1">1 - High</MenuItem>
                  <MenuItem value="2">2 - Medium</MenuItem>
                  <MenuItem value="3">3 - Low</MenuItem>
                </TextField>

                {/* Urgency values */}
                <TextField
                  select
                  label="Urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  size="small"
                  sx={{
                    width: 150,
                    borderRadius: "8px",
                    "& .MuiInputBase-input": { color: "text.primary" },
                    "& .MuiInputLabel-root": { color: "text.secondary" },
                  }}
                >
                  <MenuItem value="1">1 - High</MenuItem>
                  <MenuItem value="2">2 - Medium</MenuItem>
                  <MenuItem value="3">3 - Low</MenuItem>
                </TextField>

                {/* Short Description */}
                <TextField
                  label="Short Description"
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleChange}
                  size="small"
                  sx={{
                    width: 280,    
                    borderRadius: "8px",
                    "& .MuiInputBase-input": { color: "text.primary" },
                    "& .MuiInputLabel-root": { color: "text.secondary" },
                  }}
                />


                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: "#1976d2",
                    px: 3,
                    py: 1,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": { background: "#145da1" },
                  }}
                >
                  {editing ? "Update Incident" : "Insert Incident"}
                </Button>

                {/* Search */}
                <TextField
                  label=" 🔍Search incidents..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  size="small"
                  sx={{
                    width:250,
                    borderRadius: "10px",
                    "& .MuiInputBase-input": { color: "text.primary" },
                    "& .MuiInputLabel-root": { color: "text.secondary" },
                  }}
                />
              </Stack>
            </form>
          </Card>

          {/* LIST INCIDENTS */}
          <Grid container spacing={3} justifyContent="center">
            {filteredIncidents.map((inc) => (
              <Grid key={inc.sys_id} item>
                {/* <Card sx={{ width: 300, height: 200 }}> */}
                <Card
                  sx={{
                    width: 300,
                    height: 200,
                    borderRadius: "12px",
                    transition: "0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 6px 16px rgba(237, 231, 231, 0.3)",
                      backgroundColor: "rgba(25,118,210,0.06)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">
                      Incident #: {inc.number}
                    </Typography>
                    <Typography variant="body2">
                      Description: {inc.short_description}
                    </Typography>
                    <Typography variant="body2">
                      State: {inc.state}
                    </Typography>
                    <Typography variant="body2">
                      Priority: {inc.priority}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleEdit(inc)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(inc.sys_id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}

      {!isLogged && <Typography>Please log in</Typography>}
    </>
  );
}
