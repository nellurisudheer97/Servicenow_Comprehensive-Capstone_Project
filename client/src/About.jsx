import { Card, CardContent, Typography, Stack } from "@mui/material";

export default function About() {
  return (
    <Stack alignItems="center" sx={{ mt: 4 }} spacing={4}>
      {/* About Project Card */}
      <Card
        sx={{
          width: "60%",
          p: 3,
          borderRadius: "18px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            About Incident Management System
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            This Incident Management System is built using React + Material UI.
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            It supports CRUD operations such as creating, updating, deleting, and
            viewing incidents.
          </Typography>

          <Typography variant="body1">
            Backend is connected via API for real-time operations.
          </Typography>
        </CardContent>
      </Card>

      {/* Technologies used in the project */}
      <Card
        sx={{
          width: "60%",
          p: 3,
          borderRadius: "18px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Technical Stack
          </Typography>

          {/* Front-End Technologies */}
          <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
            Front-End Technologies:::
          </Typography>

          <Typography variant="body1" sx={{ ml: 2 }}>
            • <strong>React-js</strong> → UI Development via Components
          </Typography>
          <Typography variant="body1" sx={{ ml: 2 }}>
            • <strong>React Router</strong> → Page Navigation between UI pages
          </Typography>
          <Typography variant="body1" sx={{ ml: 2 }}>
            • <strong>Material UI</strong> → Modern UI (Themes & Styling)
          </Typography>
          <Typography variant="body1" sx={{ ml: 2, mb: 2 }}>
            • <strong>Axios</strong> → API calls to backend
          </Typography>

          {/* Back-End Technologies */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Back-End Technologies:::
          </Typography>

          <Typography variant="body1" sx={{ ml: 2 }}>
            • <strong>Node.js</strong> → Runtime environment
          </Typography>
          <Typography variant="body1" sx={{ ml: 2 }}>
            • <strong>Express.js</strong> → Server + API handling
          </Typography>
          <Typography variant="body1" sx={{ ml: 2, mb: 2 }}>
            • <strong>cookie-parser</strong> → Manages session cookies
          </Typography>

          {/* ServiceNow */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            ServiceNow:::
          </Typography>

          <Typography variant="body1" sx={{ ml: 2 }}>
            • <strong>OAuth 2.0</strong> → PKCE Authentication
          </Typography>
          <Typography variant="body1" sx={{ ml: 2 }}>
            • <strong>ServiceNow REST Table API</strong> → CRUD Operations on ServiceNow
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
