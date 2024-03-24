import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Box,
  CardContent,
  Typography,
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

  return (
    <div className="flex justify-center items-center flex-col bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500" style={{ minHeight: "100vh" }} >
      <Box className="mb-8 text-2xl font-bold text-white">
        <h2>อันดับตารางคะแนน MEME แห่งปี</h2>
      </Box>
      <div className="">
        <Box className="bg-slate-50 rounded-md " sx={{ width: "1200px", height: "650px" }}>
          <div className="flex justify-center items-center">
            <table className="table-auto mt-8" style={{ width: "1000px", height: "60px" }}>
              <tbody>
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
              </tbody>
            </table>
          </div>
        </Box>
      </div>
    </div>
  );
}
export default RankingPage;
