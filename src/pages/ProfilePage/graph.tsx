import { Box, Button, CircularProgress } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useNavigate, useParams } from "react-router-dom";
import { memeMashService } from "../../service";
import { Fragment, useEffect, useRef, useState } from "react";
import { ImgeVoteGetRes } from "../../model/ImgeVoteGetRes";
import moment from "moment";
import { ImgeVoteGetYlabelRes } from "../../model/ImgeVoteGetYlabelRes";
import { VotePostDateRes } from "../../model/votePostDateRes";
import { GetImageRespone } from "../../model/getImageRespone";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

function GraphPage() {
  const service = new memeMashService();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const imagesData = useRef<ImgeVoteGetRes[]>([]);
  const ylabel = useRef<ImgeVoteGetYlabelRes[]>([]);
  const [label, setLabel] = useState<ImgeVoteGetYlabelRes[]>([
    {
      score: 0,
      time: "00:00",
      day: "",
    },
  ]);
  const formattedDateTime = moment().format("Y-MM-DD");
  const [imagesDataTotal, setImagesDataTotal] = useState<GetImageRespone[]>([]);
  const [today, setToday] = useState(formattedDateTime);
  const [imagesDataBefore, setImagesDataBefore] = useState<VotePostDateRes[]>(
    []
  );
  const formattedDateTimeTest = new Date();
  // console.log(formattedDateTimeTest);
  const dateOptions = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(formattedDateTimeTest);
    date.setDate(formattedDateTimeTest.getDate() - (index - 0));
    // console.log(date.toISOString().split("T")[0]);
    return date.toISOString().split("T")[0];
  });

  function navigateToBack() {
    navigate("/profile");
  }
  useEffect(() => {
    const loadDataAsync = async () => {
      try {
        // console.log(today);
        const resTotal: GetImageRespone[] = await service.getReqImageTop10();
        setImagesDataTotal(resTotal);
        const res: ImgeVoteGetRes[] = await service.getImageVote();
        const allimage: ImgeVoteGetRes[] = res.filter(
          (image: ImgeVoteGetRes) => image.id_img === +id!
        );
        imagesData.current = allimage;

        const resY: ImgeVoteGetYlabelRes[] = await service.getYlabel(+id!);
        const labels: ImgeVoteGetYlabelRes[] | [] = resY.filter(
          (label: { day: string | undefined }) => label.day === today
        );
        const resBefore: VotePostDateRes[] = await service.getBeforeRank(today);
        setImagesDataBefore(resBefore);
        // console.log(labels);
        // console.log(today);
        ylabel.current = labels;
        setLabel(ylabel.current);
        // console.log(ylabel.current);
        // console.log(label);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDataAsync();
  }, [id, service]);

  return (
    <div
      className="flex justify-center items-center bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500"
      style={{ minHeight: "100vh" }}
    >
      <div
        style={{
          flexDirection: "column",
          marginTop: 90,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {imagesData.current.map((image) => (
              <Fragment key={image.id_img}>
                <div className="card_1">
                  {/* <Button
                    variant="contained"
                    onClick={navigateToBack}
                    sx={{ fontFamily: "Kanit, sans-serif" }}
                  >
                    กลับ
                  </Button> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: 20,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "200px",
                        height: "180px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <img
                        style={{
                          position: "absolute",
                          width: "200px",
                          height: "180px",
                          objectFit: "cover",
                        }}
                        src={image.img}
                        alt=""
                      />
                    </Box>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <h1
                        className="text-2xl font-bold"
                        style={{ marginRight: 200 }}
                      >
                        {image.name}
                      </h1>
                      <Box className="text-lg mt-6">
                        {imagesDataBefore.findIndex(
                          (dataBef) => dataBef.id_img == image.id_img
                        ) >= 0 ? (
                          <>
                            {imagesDataBefore.map((databefore, idx) => {
                              let n = 0;
                              for (
                                let i = 0;
                                i < imagesDataBefore.length;
                                i++
                              ) {
                                if (image.id_img == imagesDataBefore[i].id_img) {
                                  n = 1;
                                }
                              }
                              if (n == 1) {
                                if (image.id_img == databefore.id_img) {
                                  return (
                                    <div key={idx}>
                                      {databefore.number - image.number > 0 ? (
                                        <>
                                          อันดับที่ {image.number} &nbsp;&nbsp;
                                          <ExpandLessIcon
                                            sx={{ color: "green" }}
                                          ></ExpandLessIcon>
                                          {databefore.number - image.number}
                                        </>
                                      ) : databefore.number - image.number ===
                                        0 ? (
                                        <>
                                          อันดับที่ {image.number} &nbsp;&nbsp;
                                          <ArrowLeftIcon
                                            sx={{ color: "gray" }}
                                          ></ArrowLeftIcon>
                                          {databefore.number - image.number}
                                        </>
                                      ) : (
                                        <>
                                          อันดับที่ {image.number} &nbsp;&nbsp;
                                          <ExpandMoreIcon
                                            sx={{ color: "red" }}
                                          ></ExpandMoreIcon>
                                          {Math.abs(
                                            databefore.number - image.number
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
                                  imagesDataBefore.map((databefore, idx) => {
                                    let n = 0;
                                    for (
                                      let i = 0;
                                      i < imagesDataBefore.length;
                                      i++
                                    ) {
                                      if (
                                        image.id_img ==
                                        imagesDataBefore[i].id_img
                                      ) {
                                        n = 1;
                                      }
                                    }
                                    console.log(n);
                                    if (n == 1) {
                                      if (image.id_img == databefore.id_img) {
                                        return (
                                          <div key={idx}>
                                            {databefore.number - image.number >
                                              0 ? (
                                              <>
                                                อันดับที่ {image.number} &nbsp;&nbsp;
                                                <ExpandLessIcon
                                                  sx={{ color: "green" }}
                                                ></ExpandLessIcon>
                                                {databefore.number -
                                                  image.number}
                                              </>
                                            ) : databefore.number -
                                              image.number ===
                                              0 ? (
                                              <>
                                                อันดับที่ {image.number} &nbsp;&nbsp;
                                                <ArrowLeftIcon
                                                  sx={{ color: "gray" }}
                                                ></ArrowLeftIcon>
                                                {databefore.number -
                                                  image.number}
                                              </>
                                            ) : (
                                              <>
                                                อันดับที่ {image.number}  &nbsp;&nbsp;
                                                <ExpandMoreIcon
                                                  sx={{ color: "red" }}
                                                ></ExpandMoreIcon>
                                                {Math.abs(
                                                  databefore.number -
                                                  image.number
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
                            อันดับที่ {image.number}  &nbsp;&nbsp;
                            <ExpandLessIcon
                              sx={{ color: "green" }}
                            ></ExpandLessIcon>
                            {imagesDataTotal.length - image.number}
                          </>
                        )}
                      </Box>
                      {/* <Box className="text-lg mt-6" >อันดับที่ {image.number}</Box> */}
                    </div>
                    <div
                      className="card_3"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h1 className="text-5xl mt-6 font-bold">
                        {image.countvote}
                      </h1>
                      <h4 className="text-2xl mt-6 font-bold">
                        จำนวนโหวตทั้งหมด
                      </h4>
                    </div>
                  </div>
                </div>
                <div
                  className="card_2"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <h3 className="text-2xl font-bold">สถิติของรูปภาพ</h3>
                    <h3 className="mt-4">{today}</h3>
                    <div
                      className="card_3 mt-4"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h1>{ylabel.current.length}</h1>
                      <h4>จำนวนโหวต</h4>
                    </div>

                    <h3 className="mt-4">ประวัติย้อนหลัง</h3>
                    <select
                      id="countries"
                      className="text-black mt-1"
                      style={{ borderRadius: 30, width: 140 }}
                      defaultValue={today}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        loadLineChart(selectedValue);
                      }}
                    >
                      {dateOptions.map((dateOption) => (
                        <option key={dateOption} value={dateOption}>
                          {dateOption}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: "flex" }}>
                    <LineChart
                      key={today}
                      width={700}
                      height={500}
                      series={[
                        {
                          curve: "natural",
                          data: label.map((data) => data.score),
                          label: "Like",
                        },
                      ]}
                      xAxis={[
                        {
                          scaleType: "point",
                          data: label.map((data) => data.time),
                        },
                      ]}
                      slotProps={{
                        legend: {
                          labelStyle: {
                            fontSize: 14,
                            fill: "white",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
  async function loadLineChart(date: string) {
    setToday(date);
    // console.log(ylabel.current);
  }
}

export default GraphPage;
