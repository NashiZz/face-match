import { Box, Button, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const navigate = useNavigate();

    function navigateToEdit() {
        navigate("/edit_profile");
    }

    function navigateToPicture() {
        navigate("/picture");
    }

    function navigateToGraph() {
        navigate("/graph");
    }

    return (
        <div className="bg-profile">
            <Container fixed>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} >
                        <Grid container justifyContent="center" alignItems="center" spacing={2}
                        style={{ marginTop: 120}}>
                            <Grid item xs={5} md={4} lg={3} sx={{ marginRight: 10 }}>
                                <img style={{ borderRadius: "50%", width: "100%" }} src="https://i.pinimg.com/736x/f1/93/92/f193927964b8a6237d3aa5a0c587b08b.jpg" alt="" />
                            </Grid>
                            <Grid item xs={8} md={5} lg={6.5} sx={{ fontSize: { xs: 18, md: 25 } }}>
                                <Box>
                                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        <h3 className="kanit-regular">Nashi</h3>
                                        <Box sx={{ marginLeft: 2, display: "flex" }}>
                                            <Button variant="contained" onClick={navigateToEdit} sx={{ fontFamily: 'Kanit, sans-serif', fontSize: { xs: 10, md: 14 } }} >แก้ไขโปรไฟล์</Button>
                                            <Button variant="contained" onClick={navigateToPicture} sx={{ fontFamily: 'Kanit, sans-serif', fontSize: { xs: 10, md: 14 }, marginLeft: 2 }}>แก้ไขรูปภาพ</Button>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ marginTop: -1 }} />
                                    <Box sx={{ marginTop: 1, display: "flex", flexDirection: "row", alignItems: "center" }} >
                                        <h5 className="kanit-regular" style={{ marginRight: 2, fontWeight: "bold", fontSize: 16 }}>คะแนนทั้งหมด : </h5>
                                        <h5 className="kanit-regular" style={{ marginRight: 2, fontWeight: "bold", fontSize: 16 }}>999</h5>
                                        <h5 className="kanit-regular" style={{ fontWeight: "bold", fontSize: 16 }} >Point</h5>
                                    </Box>
                                    <Grid xs={12} sx={{ marginTop: 1 }}>
                                        {/* <p style={{ fontFamily: 'Kanit, sans-serif' }}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt itaque natus facilis ut ratione eaque eum impedit voluptatum nulla nostrum, delectus sequi suscipit cum, excepturi minus nobis. Amet, ea fuga.</p> */}
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sx={{ marginTop: 5 }}>
                            <Divider />
                            <Container fixed sx={{ marginTop: 5 }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Grid item xs={5} lg={3.5} >
                                            <Box sx={{ position: 'relative', width: '100%', height: 0, paddingBottom: '100%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                                                <img
                                                    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
                                                    src="https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg" 
                                                    alt="" onClick={navigateToGraph} />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: '8px' }}>
                                                <IconButton aria-label="like">
                                                    <FavoriteIcon color="error" />
                                                </IconButton>
                                                <Typography variant="body2" sx={{ fontFamily: 'Kanit, sans-serif' }} >99 โหวต</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={5} lg={3.5}>
                                            <Box sx={{ position: 'relative', width: '100%', height: 0, paddingBottom: '100%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                                                <img
                                                    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
                                                    src="https://i.pinimg.com/564x/4d/93/de/4d93de6f4331acf998113a1c51547456.jpg"
                                                    alt="" />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: '8px' }}>
                                                <IconButton aria-label="like">
                                                    <FavoriteIcon color="error" />
                                                </IconButton>
                                                <Typography variant="body2" sx={{ fontFamily: 'Kanit, sans-serif' }} >99 โหวต</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={5} lg={3.5}>
                                            <Box sx={{ position: 'relative', width: '100%', height: 0, paddingBottom: '100%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                                                <img
                                                    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
                                                    src="https://i.pinimg.com/564x/b6/dc/3b/b6dc3b10d6333e6efa7834f583d639a5.jpg" alt="" />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: '8px' }}>
                                                <IconButton aria-label="like">
                                                    <FavoriteIcon color="error" />
                                                </IconButton>
                                                <Typography variant="body2" sx={{ fontFamily: 'Kanit, sans-serif' }} >99 โหวต</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={5} lg={3.5}>
                                            <Box sx={{ position: 'relative', width: '100%', height: 0, paddingBottom: '100%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                                                <img
                                                    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
                                                    src="https://i.pinimg.com/736x/ac/71/92/ac7192ebb32770e569e7fb9a45d56516.jpg" alt="" />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: '8px' }}>
                                                <IconButton aria-label="like">
                                                    <FavoriteIcon color="error" />
                                                </IconButton>
                                                <Typography variant="body2" sx={{ fontFamily: 'Kanit, sans-serif' }} >99 โหวต</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={5} lg={3.5}>
                                            <Box sx={{ position: 'relative', width: '100%', height: 0, paddingBottom: '100%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                                                <img
                                                    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
                                                    src="https://i.pinimg.com/564x/03/1a/41/031a4105c8a0125527d1838b8449e541.jpg" alt="" />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: '8px' }}>
                                                <IconButton aria-label="like">
                                                    <FavoriteIcon color="error" />
                                                </IconButton>
                                                <Typography sx={{ fontFamily: 'Kanit, sans-serif' }} variant="body2">99 โหวต</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Container>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default ProfilePage;