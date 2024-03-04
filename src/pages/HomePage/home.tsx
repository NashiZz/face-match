import { Grid } from "@mui/material";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

function HomePage() {
    return (
        <div className="background">
            <Grid container spacing={0} display="flex" minHeight="100vh" justifyContent="center" alignItems="center">
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Card sx={{ width: 550, height: 650, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="kanit-regular" style={{ marginBottom: -15 }}>
                            <h3>ฉันจัดการเองเพื่อนนน</h3>
                        </div>
                        <div style={{ position: 'relative', width: '100%', height: "100%", borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://i.pinimg.com/564x/b2/a8/0c/b2a80cef98188297b8edd7c839e45559.jpg" alt="" />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CardContent orientation="horizontal">
                                <Button
                                    variant="solid"
                                    size="lg"
                                    color="primary"
                                    sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600, fontFamily: 'Kanit, sans-serif' }}
                                >
                                    Like
                                </Button>
                            </CardContent>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Card sx={{ width: 550, height: 650, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="kanit-regular" style={{ marginBottom: -15 }}>
                            <h3>ฉันจัดการเองเพื่อนนน</h3>
                        </div>
                        <div style={{ position: 'relative', width: '100%', height: "100%", borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://i.pinimg.com/564x/01/2b/0b/012b0bc2e871fc073c8dbf8008bdf20e.jpg" alt="" />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CardContent orientation="horizontal">
                                <Button
                                    variant="solid"
                                    size="lg"
                                    color="primary"
                                    sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600, fontFamily: 'Kanit, sans-serif' }}
                                >
                                    Like
                                </Button>
                            </CardContent>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default HomePage;