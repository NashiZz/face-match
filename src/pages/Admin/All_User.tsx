import { Grid, Pagination } from "@mui/material";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { CardCover } from "@mui/joy";
import { SetStateAction, useState } from "react";

const userData = [
    { username: 'น้องม่ายรู้วว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'แฮนด์ซั่มม', img: 'https://i.pinimg.com/564x/4d/93/de/4d93de6f4331acf998113a1c51547456.jpg' },
    { username: 'ชิสสชู่ววว', img: 'https://i.pinimg.com/564x/b6/dc/3b/b6dc3b10d6333e6efa7834f583d639a5.jpg' },
    { username: 'ปรีชา', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หน้าเดินน', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หันหลัง', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'สไปเดอร์', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'ความมืดในแสงแดด', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'พระจันทร์และดวงดาว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'เทพอักคี', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'น้องม่ายรู้วว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'แฮนด์ซั่มม', img: 'https://i.pinimg.com/564x/4d/93/de/4d93de6f4331acf998113a1c51547456.jpg' },
    { username: 'ชิสสชู่ววว', img: 'https://i.pinimg.com/564x/b6/dc/3b/b6dc3b10d6333e6efa7834f583d639a5.jpg' },
    { username: 'ปรีชา', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หน้าเดินน', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หันหลัง', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'สไปเดอร์', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'ความมืดในแสงแดด', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'พระจันทร์และดวงดาว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'เทพอักคี', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'น้องม่ายรู้วว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'แฮนด์ซั่มม', img: 'https://i.pinimg.com/564x/4d/93/de/4d93de6f4331acf998113a1c51547456.jpg' },
    { username: 'ชิสสชู่ววว', img: 'https://i.pinimg.com/564x/b6/dc/3b/b6dc3b10d6333e6efa7834f583d639a5.jpg' },
    { username: 'ปรีชา', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หน้าเดินน', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หันหลัง', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'สไปเดอร์', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'ความมืดในแสงแดด', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'พระจันทร์และดวงดาว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'เทพอักคี', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'น้องม่ายรู้วว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'แฮนด์ซั่มม', img: 'https://i.pinimg.com/564x/4d/93/de/4d93de6f4331acf998113a1c51547456.jpg' },
    { username: 'ชิสสชู่ววว', img: 'https://i.pinimg.com/564x/b6/dc/3b/b6dc3b10d6333e6efa7834f583d639a5.jpg' },
    { username: 'ปรีชา', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หน้าเดินน', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หันหลัง', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'สไปเดอร์', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'ความมืดในแสงแดด', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'พระจันทร์และดวงดาว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'เทพอักคี', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'น้องม่ายรู้วว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'แฮนด์ซั่มม', img: 'https://i.pinimg.com/564x/4d/93/de/4d93de6f4331acf998113a1c51547456.jpg' },
    { username: 'ชิสสชู่ววว', img: 'https://i.pinimg.com/564x/b6/dc/3b/b6dc3b10d6333e6efa7834f583d639a5.jpg' },
    { username: 'ปรีชา', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หน้าเดินน', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หันหลัง', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'สไปเดอร์', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'ความมืดในแสงแดด', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'พระจันทร์และดวงดาว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'เทพอักคี', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },


];

const itemsPerPage = 12; // จำนวนรายการต่อหน้า

function AllUserPage() {
    const [page, setPage] = useState(1);

    const handleChange = (_event: any, value: SetStateAction<number>) => {
        setPage(value);
    };

    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const displayedUsers = userData.slice(firstIndex, lastIndex);

    return (
        <div className="background_admin" style={{ marginTop: "50px", minHeight: "100vh" }}>
            <Grid
                container spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 3, sm: 9, md: 10 }}
                style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}
            >
                {displayedUsers.map((data, index) => (
                    <Grid xs={2} sm={4} md={2} key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "8px", marginTop: "90px" }}>
                        <Card sx={{ minHeight: '150px', width: 180 }}>
                            <CardCover>
                                <img
                                    src={data.img}
                                    srcSet={data.img}
                                    loading="lazy"
                                    alt=""
                                />
                            </CardCover>
                            <CardCover
                                sx={{
                                    background:
                                        'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 50px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 100px)',
                                }}
                            />
                            <CardContent sx={{ justifyContent: 'flex-end' }}>
                                <Typography level="title-lg" textColor="#fff" sx={{ fontFamily: 'Kanit, sans-serif' }}>
                                    {data.username}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={Math.ceil(userData.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
                color="primary"
                style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
            />
        </div>
    );
}

export default AllUserPage;

