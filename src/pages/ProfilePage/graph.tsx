import { Box, Button } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useNavigate } from "react-router-dom";

const likeData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const likeData = [0];
const loseData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    '00',
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
];

function GraphPage() {
    const navigate = useNavigate();

    function navigateToBack() {
        navigate("/profile");
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 90 }}>
            <div className='card_1'>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: 20 }}>
                    <Box sx={{ position: 'relative', width: '200px', height: '180px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                        <img
                            style={{ position: 'absolute', width: '200px', height: '180px', objectFit: 'cover' }}
                            src="https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg"
                            alt="" />
                    </Box>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <h1 style={{ marginRight: 200 }}>วันว่างๆของหมาน้อย</h1>
                        <Box>
                            อันดับที่ 15
                        </Box>
                        <Box>
                            967 โหวต
                        </Box>
                    </div>
                    <Box sx={{ marginRight: 10, marginTop: 2 }}>
                        <Button variant="contained" onClick={navigateToBack} sx={{ fontFamily: 'Kanit, sans-serif' }} >กลับ</Button>
                    </Box>
                </div>
            </div>
            <div className='card_2' style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <h3 style={{ marginLeft: 0 }}>สถิติของรูปภาพ</h3>
                    <div className='card_3' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <h1>999</h1>
                        <h4 style={{ marginTop: "-15px" }}>จำนวนโหวต</h4>
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <LineChart
                        width={700}
                        height={500}
                        series={[
                            { curve: "natural", data: likeData, label: 'Like' }
                        ]}
                        xAxis={[{ scaleType: 'point', data: xLabels }]}
                        slotProps={{
                            legend: {
                                labelStyle: {
                                    fontSize: 14,
                                    fill: 'white',
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default GraphPage;
