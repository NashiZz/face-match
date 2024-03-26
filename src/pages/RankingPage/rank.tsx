import { TableCell, TableRow, Box, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { GetImageRespone } from "../../model/getImageRespone";
import { memeMashService } from "../../service";
import { VotePostDateRes } from "../../model/votePostDateRes";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

function RankingPage() {
  const service = new memeMashService();
  const [imagesData, setImagesData] = useState<GetImageRespone[]>([]);
  const [imagesDataBefore, setImagesDataBefore] = useState<VotePostDateRes[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ChekData, setChekData] = useState(0);
  const formattedDateTimeTest = new Date();
  // console.log(formattedDateTimeTest);
  const date = new Date(formattedDateTimeTest);
  date.setDate(formattedDateTimeTest.getDate() - (1 - 0));
  // console.log(date);

  // console.log(date.toISOString().split("T")[0]);
  const beforDate = date.toISOString().split("T")[0].toString();

  useEffect(() => {
    const loadDataAsync = async () => {
      try {
        const res: GetImageRespone[] = await service.getReqImageTop10();
        setImagesData(res);

        const resBefore: VotePostDateRes[] = await service.getBeforeRank(
          beforDate
        );
        setImagesDataBefore(resBefore);

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    loadDataAsync();
  }, [service]);

  return (
    <div
      className="flex justify-center items-center flex-col bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500"
      style={{ minHeight: "100vh" }}
    >
      <Box className="mb-8 text-2xl font-bold text-white">
        <h2>อันดับตารางคะแนน MEME แห่งปี</h2>
      </Box>
      <div className="bg-slate-50 rounded-md">
        {isLoading ? (
          <div className="flex justify-center items-center" style={{ minHeight: "650px" }}>

            <CircularProgress color="primary" />
          </div>
        ) : (
          <>
            <div
              className="overflow-auto flex justify-center"
              style={{ width: "1300px", maxHeight: "650px" }}
            >
              <table
                className="table-auto"
                style={{ width: "100%", height: "60px" }}
              >
                <tbody>
                  {imagesData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          fontFamily: "Kanit, sans-serif",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Kanit, sans-serif",
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {imagesDataฺฺBefore.findIndex(
                          (dataBef) => dataBef.id_img == data.id_img
                        ) >= 0 ? (
                          <>
                            {imagesDataฺฺBefore.map((databefore, idx) => {
                              let n = 0;
                              console.log("start");
                              console.log(databefore.id_img);

                              for (let i = 0; i < imagesDataฺฺBefore.length; i++) {
                                if (data.id_img == imagesDataฺฺBefore[i].id_img) {
                                  n = 1;
                                  console.log("กลาง");
                                }
                              }
                              console.log(n);

                              if (n == 1) {
                                console.log("จบ1");

                                if (data.id_img == databefore.id_img) {
                                  return (
                                    <div key={idx}>
                                      {databefore.number - (index + 1) > 0 ? (
                                        <>
                                          <ExpandLessIcon
                                            sx={{ color: "green" }}
                                          ></ExpandLessIcon>
                                          {databefore.number - (index + 1)}
                                        </>
                                      ) : databefore.number - (index + 1) === 0 ? (
                                        <>
                                          <ArrowLeftIcon
                                            sx={{ color: "gray" }}
                                          ></ArrowLeftIcon>
                                          {databefore.number - (index + 1)}
                                        </>
                                      ) : (
                                        <>
                                          <ExpandMoreIcon
                                            sx={{ color: "red" }}
                                          ></ExpandMoreIcon>
                                          {Math.abs(
                                            databefore.number - (index + 1)
                                          )}
                                        </>
                                      )}
                                    </div>
                                  );
                                } else {
                                  return null;
                                }
                              } else {
                                {
                                  imagesDataฺฺBefore.map((databefore, idx) => {
                                    let n = 0;
                                    for (
                                      let i = 0;
                                      i < imagesDataฺฺBefore.length;
                                      i++
                                    ) {
                                      if (
                                        data.id_img == imagesDataฺฺBefore[i].id_img
                                      ) {
                                        n = 1;
                                      }
                                    }
                                    console.log(n);
                                    if (n == 1) {
                                      if (data.id_img == databefore.id_img) {
                                        return (
                                          <div key={idx}>
                                            {databefore.number - (index + 1) > 0 ? (
                                              <>
                                                <ExpandLessIcon
                                                  sx={{ color: "green" }}
                                                ></ExpandLessIcon>
                                                {databefore.number - (index + 1)}
                                              </>
                                            ) : databefore.number - (index + 1) ===
                                              0 ? (
                                              <>
                                                <ArrowLeftIcon
                                                  sx={{ color: "gray" }}
                                                ></ArrowLeftIcon>
                                                {databefore.number - (index + 1)}
                                              </>
                                            ) : (
                                              <>
                                                <ExpandMoreIcon
                                                  sx={{ color: "red" }}
                                                ></ExpandMoreIcon>
                                                {Math.abs(
                                                  databefore.number - (index + 1)
                                                )}
                                              </>
                                            )}
                                          </div>
                                        );
                                      } else {
                                        return null;
                                      }
                                    } else {
                                      return null;
                                    }
                                  });
                                }
                              }
                            })}
                          </>
                        ) : (
                          <>
                            <ExpandLessIcon
                              sx={{ color: "green" }}
                            ></ExpandLessIcon>
                            {imagesData.length - (index + 1)}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: 0,
                            paddingBottom: "100%",
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
                      <TableCell
                        sx={{ fontFamily: "Kanit, sans-serif", fontSize: 16 }}
                      >
                        {imagesDataฺฺBefore.map((databefore, idx) => {
                          if (data.id_img === databefore.id_img) {
                            return (
                              <div key={idx}>
                                {data.score - databefore.score > 0 ? (
                                  <>
                                    <ExpandLessIcon
                                      sx={{ color: "green" }}
                                    ></ExpandLessIcon>
                                    {data.score - databefore.score}
                                  </>
                                ) : data.score - databefore.score === 0 ? (
                                  <>
                                    <ArrowLeftIcon
                                      sx={{ color: "gray" }}
                                    ></ArrowLeftIcon>
                                    {data.score - databefore.score}
                                  </>
                                ) : (
                                  <>
                                    <ExpandMoreIcon
                                      sx={{ color: "red" }}
                                    ></ExpandMoreIcon>
                                    {Math.abs(data.score - databefore.score)}
                                  </>
                                )}
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default RankingPage;
