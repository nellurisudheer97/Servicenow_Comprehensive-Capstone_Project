import { Typography,Box } from "@mui/material"
function NotFound() {

    return(
        <>
        {/* <Typography sx={{ fontSize: { xs: "18px", sm: "22px", md: "30px" } }} /> */}
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    This is my not found page!
                </Typography>
            </Box>
        </>
    )
}
export default NotFound;



