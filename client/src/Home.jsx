import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
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

  // Fetching theincidents
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

  // Functionality of Insert or update incident
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Update the existing records
        await axios.put(
          `http://localhost:3001/api/incidents/${editing}`,
          formData,
          { withCredentials: true }
        );
        alert("Incident updated successfully!");
      } else {
        // Inserting the  new record
        await axios.post("http://localhost:3001/api/incidents", formData, {
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

  // Delete the records
  const handleDelete = async (sys_id) => {
    try {
      await axios.delete(`http://localhost:3001/api/incidents/${sys_id}`, {
        withCredentials: true,
      });
      setIncidents((prev) => prev.filter((inc) => inc.sys_id !== sys_id));
      alert("Incident deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete incident.");
    }
  };

  // we can Edit the record 
  const handleEdit = (inc) => {
    setFormData({
      impact: inc.impact || "",
      urgency: inc.urgency || "",
      short_description: inc.short_description || "",
    });
    setEditing(inc.sys_id);
  };

  return (
    <>
      {isLogged && (
        <Stack spacing={3}>
          <Typography variant="h5">Incident Management</Typography>

          {/*This is Form Section */}
          <form onSubmit={handleSubmit}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                label="Impact"
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                size="small"
              />
              <TextField
                label="Urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                size="small"
              />
              <TextField
                label="Short Description"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                size="small"
                sx={{ width: 300 }}
              />
              <Button type="submit" variant="contained" color="primary">
                {editing ? "Update Incident" : "Insert Incident"}
              </Button>
            </Stack>
          </form>

          {/*Here the Incident Records */}
          <Grid container spacing={3} justifyContent="center">
            {incidents.map((inc) => (
              <Grid key={inc.sys_id} item>
                <Card sx={{ width: 300, height: 200 }}>
                  <CardContent>
                    <Typography variant="h6">
                      Incident #: {inc.number}
                    </Typography>
                    <Typography variant="body2">
                      Description: {inc.short_description}
                    </Typography>
                    <Typography variant="body2">State: {inc.state}</Typography>
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
