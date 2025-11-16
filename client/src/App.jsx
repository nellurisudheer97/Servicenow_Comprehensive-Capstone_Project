import {AppBar,Toolbar,Box,Typography,Container,IconButton,} from "@mui/material";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Home from "./Home.jsx";
import About from "./About.jsx";
import NotFound from "./NotFound.jsx";
import styles from "./App.module.css";
import { AuthContext } from "./AuthProvider.jsx";

import { useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
  const newMode = mode === "light" ? "dark" : "light";
  setMode(newMode);
  localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  function Layout() {
    const { isLogged, logout, login } = useContext(AuthContext);

    return (
      <>
        <AppBar sx={{
        background: "linear-gradient(90deg, #8338EC, #3A86FF, #FFBE0B)"
      }}
          >

          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography><b>REVATURE</b></Typography>
            <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 3 }}>

            {isLogged ? (
              <>
                <Link className={styles.link} to="/">
                  <b>Home</b>
                </Link>
                <Link className={styles.link} to="/about">
                  <b>About</b>
                </Link>
                <Link className={styles.link} to="/does-not-exist">
                  <b>404 Test</b>
                </Link>

                <Link className={styles.link} onClick={logout}>
                <b>logout</b>
                
                </Link>

                {/*This one is Toggle button which can shift dark to light mode  */}
                <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 2 }}>
                  {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              </>
            ) : (
              <Link className={styles.link} onClick={login}>
                Login with ServiceNow
              </Link>
            )}
            </Box>
          </Toolbar>
        </AppBar>

       {/* <Container maxWidth={false} sx={{ mt: 10 }}>
          <Outlet />
      </Container> */}
      <Container maxWidth="xl" sx={{ mt: 10 }}>
  <Outlet />
</Container>
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
