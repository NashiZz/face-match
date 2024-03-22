import { Box, Button, CircularProgress } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useNavigate, useParams } from "react-router-dom";
import { memeMashService } from "../../service";
import { Fragment, useEffect, useRef, useState } from "react";
import { ImgeVoteGetRes } from "../../model/ImgeVoteGetRes";
import { ImgeVoteGetXlabelRes } from "../../model/ImgeVoteGetXlabelRes";
import moment from "moment";
import { ImgeVoteGetYlabelRes } from "../../model/ImgeVoteGetYlabelRes";

function GraphPage() {
  const service = new memeMashService();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const imagesData = useRef<ImgeVoteGetRes[]>([]);
  const ylabel = useRef<ImgeVoteGetYlabelRes[]>([]);
  const [label,setLabel ]= useState<ImgeVoteGetYlabelRes[]>([{
    "score": 0,
    "time": "00:00",
    "day": ""
}]);
  const formattedDateTime = moment().format("Y-MM-DD");
  // 
  
  const [today, setToday] = useState(formattedDateTime);
  const formattedDateTimeTest = new Date();
  // console.log(formattedDateTimeTest);
  const dateOptions = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(formattedDateTimeTest);
    date.setDate(formattedDateTimeTest.getDate() - (index-1));
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
        
        const res: ImgeVoteGetRes[] = await service.getImageVote();
        const allimage: ImgeVoteGetRes[] = res.filter(
          (image: ImgeVoteGetRes) => image.id_img === +id!
        );
        imagesData.current = allimage;

        const resY: ImgeVoteGetYlabelRes[] = await service.getYlabel(
          +id!
        );
        const labels : ImgeVoteGetYlabelRes[] | [] = resY.filter(
          (label:{day:string | undefined}) => label.day === today
        );
        // console.log(labels);
        // console.log(today);
        ylabel.current = labels
        setLabel(ylabel.current)
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
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
                    <h1 style={{ marginRight: 200 }}>{image.name}</h1>
                    <Box>อันดับที่ {image.number}</Box>
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
                    <h1>{image.countvote}</h1>
                    <h4 style={{ marginTop: "-15px" }}>จำนวนโหวตทั้งหมด</h4>
                  </div>
                  {/* <Box sx={{ marginRight: 10, marginTop: 2 }}>
                    <Button
                      variant="contained"
                      onClick={navigateToBack}
                      sx={{ fontFamily: "Kanit, sans-serif" }}
                    >
                      กลับ
                    </Button>
                  </Box> */}
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
                  <h3 style={{ marginLeft: 0 }}>สถิติของรูปภาพ</h3>
                  <h3 style={{ marginLeft: 0, marginTop: -20 }}>{today}</h3>
                  <div
                    className="card_3"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1>{ylabel.current.length}</h1>
                    <h4 style={{ marginTop: "-15px" }}>จำนวนโหวต</h4>
                  </div>

                  <h3 style={{ marginLeft: 0 }}>ประวัติย้อนหลัง</h3>
                  <select
                    id="countries"
                    className="text-white"
                    style={{ borderRadius: 30, width: 140, marginTop: -10 }}
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
                        data: label.map((data) => data.score ),
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
  );
  async function loadLineChart(date: string) {
    setToday(date);
    // console.log(ylabel.current);
  }
}

export default GraphPage;
