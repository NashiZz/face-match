import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Button,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GetImageRespone } from "../../model/getImageRespone";
import { memeMashService } from "../../service";

function RankingPage() {
  const service = new memeMashService();
  const [imagesData, setImagesData] = useState<GetImageRespone[]>([]);

  useEffect(() => {
    const loadDataAsync = async () => {
      try {
        const res: GetImageRespone[] = await service.getReqImageTop10();
        setImagesData(res);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadDataAsync();
  }, [service]);
  // const rankingData = [
  //     { username: 'น้องม่ายรู้วว', score: 9999, img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
  //     { username: 'แฮนด์ซั่มม', score: 6599, img: 'https://i.pinimg.com/564x/4d/93/de/4d93de6f4331acf998113a1c51547456.jpg' },
  //     { username: 'ชิสสชู่ววว', score: 5099, img: 'https://i.pinimg.com/564x/b6/dc/3b/b6dc3b10d6333e6efa7834f583d639a5.jpg' },
  //     { username: 'ปรีชา', score: 4490, img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
  //     { username: 'หน้าเดินน', score: 4090, img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
  //     { username: 'หันหลัง', score: 3390, img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
  //     { username: 'สไปเดอร์', score: 3090, img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
  //     { username: 'ความมืดในแสงแดด', score: 2890, img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
  //     { username: 'พระจันทร์และดวงดาว', score: 2590, img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
  //     { username: 'เทพอักคี', score: 1090, img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },

  // ];
  // useEffect(() => {
  //     const loadDataAsync = async () => {
  //       const res : GetImageRespone[] = await service.getReqImageTop10();
  //       images.current=res;
  //     };
  //     loadDataAsync();
  //   }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 120,
        }}
      >
        <Card
          sx={{
            width: 1550,
            height: 800,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 10,
            }}
          >
            <h1 style={{ marginLeft: 80 }}>อันดับตารางคะแนนภาพ MEME แห่งปี</h1>
            <Box sx={{ marginRight: 10, marginTop: 2 }}>
              <Button
                variant="contained"
                sx={{ fontFamily: "Kanit, sans-serif" }}
              >
                กลับ
              </Button>
            </Box>
          </div>
          <TableContainer
            component={Paper}
            style={{ maxWidth: 1400, marginBottom: 20 }}
          >
            <Table>
              <TableHead>
                <TableRow style={{}}>
                  <TableCell
                    sx={{
                      fontFamily: "Kanit, sans-serif",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    อันดับ
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "Kanit, sans-serif",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    รูปภาพ
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "Kanit, sans-serif",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    ชื่อรูป
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "Kanit, sans-serif",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    คะแนนโหวต
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {imagesData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        fontFamily: "Kanit, sans-serif",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          position: "relative",
                          width: "80%",
                          height: 0,
                          paddingBottom: "80%",
                          borderRadius: "10px",
                          overflow: "hidden",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <img
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          src={data.img}
                          alt=""
                        />
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "Kanit, sans-serif", fontSize: 16 }}
                    >
                      {data.name}
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "Kanit, sans-serif", fontSize: 16 }}
                    >
                      {data.score}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </>
  );
}
export default RankingPage;
