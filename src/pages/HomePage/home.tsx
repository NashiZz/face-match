import { Grid } from "@mui/material";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { memeMashService } from "../../service";
import { GetImageRespone } from "../../model/getImageRespone";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
async function delay(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
function HomePage() {
  const service = new memeMashService();
  const pics = useRef<GetImageRespone[]>([]);
  const [P1, setP1] = useState<GetImageRespone | undefined>(undefined);
  const [P2, setP2] = useState<GetImageRespone | undefined>(undefined);
  const [score1,setScore1] = useState(P1?.score);
  const [score2,setScore2] = useState(P2?.score);
  const [chekShowP,setChekShowP] = useState(0);
  const [chekColor,setChekColor] = useState(0);
  const [scorePa,setScorePa] = useState(0);
  const [scorePb,setScorePb] = useState(0);
  // const navigate = useNavigate();
  // const [IndexImage,setIndexImage] = useState(4);

  useEffect(() => {
    const loadDataAsync = async () => {
      if (localStorage.getItem("username")==""){
        localStorage.setItem("username","บุคคลนิรนาม")
      }
      const res = await service.getReqImage();
      const imgs = shuffleImages(res);
      pics.current = imgs;
      // console.log(pics.current);
      loadNextImg();
    };
    loadDataAsync();
  }, []);

  return (
    <div className="background">
      <Grid
        container
        spacing={0}
        display="flex"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
      >
        {P1 && P2 ? (
          <>
            <Grid item xs={10} sm={8} md={6} lg={4}>
              <Card
                sx={{
                  width: 550,
                  height: 650,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="kanit-regular" style={{ marginBottom: -15 }}>
                  <h3>{P1?.name}</h3>
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={P1?.img}
                    alt=""
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardContent orientation="horizontal">
                  {chekShowP == 0 ? (<>
                    </>):(<>
                      {chekColor == 1 ? (<><p style={{color:"green"}}>+{scorePa}</p></>):(<><p style={{color:"red"}}>{scorePa}</p></>)}
                    </>)}
                    <p>{score1}</p>
                    <Button
                      variant="solid"
                      size="lg"
                      color="primary"
                      onClick={()=>{
                        btnVote(P1.score,P2.score,1,0)
                      }}
                      sx={{
                        ml: "auto",
                        alignSelf: "center",
                        fontWeight: 600,
                        fontFamily: "Kanit, sans-serif",
                      }}
                    >
                      Like
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid item xs={10} sm={8} md={6} lg={4}>
              <Card
                sx={{
                  width: 550,
                  height: 650,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="kanit-regular" style={{ marginBottom: -15 }}>
                  <h3>{P2?.name}</h3>
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={P2?.img}
                    alt=""
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardContent orientation="horizontal">
                  {chekShowP == 0 ? (<>
                    </>):(<>
                      {chekColor == 2 ? (<><p style={{color:"green"}}>+{scorePb}</p></>):(<><p style={{color:"red"}}>{scorePb}</p></>)}
                    </>)}
                    <p>{score2}</p>
                    <Button
                      variant="solid"
                      size="lg"
                      color="primary"
                      onClick={()=>{
                        btnVote(P1.score,P2.score,0,1)
                      }}
                      sx={{
                        ml: "auto",
                        alignSelf: "center",
                        fontWeight: 600,
                        fontFamily: "Kanit, sans-serif",
                      }}
                    >
                      Like
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </Grid>
          </>
        ) : (
          <>
            {" "}
            <Box display={"flex"} sx={{flexDirection:"column",alignItems:"center"}}>
              <p>ไม่มีข้อมูลแล้ว เริ่มใหม่โปรดกด Start และรอ 5 วินาที</p>
              <Button
                variant="solid"
                size="lg"
                color="primary"
                onClick={Load}
                
                sx={{
                  ml: "auto",
                  alignSelf: "center",
                  fontWeight: 600,
                  fontFamily: "Kanit, sans-serif",
                }}
              >
                Start
              </Button>
            </Box>
          </>
        )}
      </Grid>
    </div>
  );
  async function btnVote(Ra : number,Rb: number,s1 : number,s2 : number) {
    const Ea = 1/(1+10**((Rb-Ra)/400))
    const Eb = 1/(1+10**((Ra-Rb)/400))
    let R1 = Ra;
    let K1 = 0;
    let R2 = Rb;
    let K2 = 0;
    if (R1 > 3000){
      K1 = 5;
    }else if (R1 > 2401){
      K1 = 10;
    }else if (R1 > 601){
      K1 = 15;
    }else if (R1 > 0){
      K1 = 25;
    }else {
      K1= 0;
    }
    if (R2 > 3000){
      K2 = 5;
    }else if (R2 > 2401){
      K2 = 10;
    }else if (R2 > 601){
      K2 = 15;
    }else if (R2 > 0){
      K2 = 25;
    }else {
      K2 = 0;
    }
    let Pa = K1*(s1-Ea)
    let Pb = K2*(s2-Eb)
    let RA = Ra + Pa;
    let RB = Rb + Pb;
    setScorePa(Math.round(Pa))
    setScorePb(Math.round(Pb))
    setScore1(Math.round(RA));
    setScore2(Math.round(RB));
    setChekShowP(1);
    if (s1==1){
      setChekColor(1)
    } 
    if (s2==1){
      setChekColor(2)
    }
    const res1 = await service.putReqImageID(P1!.id_img,P1!.img,P1!.id_user,P1!.name,Math.round(RA));
    if(res1==200){
      service.postReqVote(P1!.id_img,localStorage.getItem("username")!.toString(),Math.round(RA))
    };
    const res2 = await service.putReqImageID(P2!.id_img,P2!.img,P2!.id_user,P2!.name,Math.round(RB));
    if(res2==200){
      service.postReqVote(P2!.id_img,localStorage.getItem("username")!.toString(),Math.round(RB))
    };
    // console.log(P1?.id_img,P2?.id_img,localStorage.getItem("username"));
    
    await delay(2000);
    setChekShowP(0);
    loadNextImg();
    // await delay(5000);
  }
  function shuffleImages(images: GetImageRespone[]) {
    let currentIndex = images.length;
    let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [images[currentIndex], images[randomIndex]] = [
        images[randomIndex],
        images[currentIndex],
      ];
    }
    return images;
  }
  async function loadNextImg() {
    
    const selectImg: GetImageRespone[] = pics.current.splice(0, 2);
    // console.log(selectImg);
    // console.log(pics.current);
    // setIndexImage(pics.current);
    setP1(selectImg[0]);
    setP2(selectImg[1]);
    // console.log(P1?.score);
    
    setScore1(selectImg[0].score)
    setScore2(selectImg[1].score)
    
  }
  async function Load() {
    // window.location.reload(false);
    await delay(5000);
    window.location.reload();
  }
}

export default HomePage;
