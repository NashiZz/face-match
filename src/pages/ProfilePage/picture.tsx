import { Box, Button, Card, TextField } from "@mui/material";

function PicturePage() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 120 }}>
            <Card sx={{ width: 900, height: 800, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%",  marginTop: 20 }}>
                    <h1 style={{ marginLeft: 80 }}>แก้ไขโปรไฟล์</h1>
                    <Box sx={{ marginRight: 10, marginTop: 2 }}>
                        <Button variant="contained" sx={{ fontFamily: 'Kanit, sans-serif' }} >กลับ</Button>
                    </Box>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginLeft: 100 }}>
                    <Card sx={{ width: 700, height: 150, backgroundColor: "lightcyan" }}>
                        <div className="profile-image" style={{ display: "flex",  justifyContent: "space-between" , marginLeft: 50, marginRight: 50, marginTop: 25 }}>
                            <img src="https://i.pinimg.com/736x/f1/93/92/f193927964b8a6237d3aa5a0c587b08b.jpg" alt="profile" />
                            <Button variant="contained" sx={{ fontFamily: 'Kanit, sans-serif' }} >แก้ไขโปรไฟล์</Button>
                        </div>
                    </Card>
                </div>
                <div style={{ display: "flex", flexDirection: "column" , marginLeft: 100, marginTop: 30 }}>
                    <h2>ชื่อ</h2>
                    <TextField  fullWidth style={{ width: 700}} />
                    <h2>อีเมล</h2>
                    <TextField  fullWidth style={{ width: 700}} />
                    <h2>รหัสผ่าน</h2>
                    <TextField  fullWidth style={{ width: 700}} />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 30}}>
                        <Button variant="contained" sx={{ fontFamily: 'Kanit, sans-serif' }} >บันทึก</Button>
                    </div>
                </div>
            </Card>
        </div>
       
    );
}

export default PicturePage;
