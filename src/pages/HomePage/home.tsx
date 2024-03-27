import { memeMashService } from "../../service";
import { GetImageRespone } from "../../model/getImageRespone";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import VsImage from "../../assets/img/Vs.png";
import { CircularProgress } from "@mui/material";
import { useNavigate, } from "react-router-dom";

async function delay(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
function HomePage() {
  const service = new memeMashService();
  const pics = useRef<GetImageRespone[]>([]);
  const [P1, setP1] = useState<GetImageRespone | undefined>(undefined);
  const [P2, setP2] = useState<GetImageRespone | undefined>(undefined);
  const [score1, setScore1] = useState(P1?.score);
  const [score2, setScore2] = useState(P2?.score);
  const [chekShowP, setChekShowP] = useState(0);
  const [chekVote, setChekVote] = useState(0);
  const [chekColor, setChekColor] = useState(0);
  const [scorePa, setScorePa] = useState(0);
  const [scorePb, setScorePb] = useState(0);

  const [showKa, setShowKa] = useState(0);
  const [showKb, setShowKb] = useState(0);
  const [showEa, setShowEa] = useState(0);
  const [showEb, setShowEb] = useState(0);
  const [showPa, setShowPa] = useState(0);
  const [showPb, setShowPb] = useState(0);
  const navigate = useNavigate();
  // const [IndexImage,setIndexImage] = useState(4);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadDataAsync = async () => {
      if (localStorage.getItem("username") == "") {
        localStorage.setItem("username", "บุคคลนิรนาม")
      }
      const res = await service.getReqImage();
      const imgs = shuffleImages(res);
      pics.current = imgs;
      // console.log(pics.current);
      loadNextImg();
      setLoaded(true);
    };
    loadDataAsync();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4 bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500 " style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "50px" }}>
      {loaded ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 50px)">
          <div className="flex flex-col justify-center items-center ">
            <h1 className="pb-16" style={{ fontSize: "2vw", color: "white" }} >
              โหวตรูปภาพ Meme ที่คุณชอบโดยการคลิก!!
            </h1>
            <div className="flex flex-row justify-center items-center">
              {P1 && P2 ? (
                <>
                  <div className="w-1/2 m-4 relative ">
                    <Box
                      className="cursor-pointer transition-transform transform hover:scale-110 mx-20"
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
                        src={P1?.img}
                        alt={P1?.name}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onClick={() => {
                          if (chekVote == 0) {
                            btnVote(P1.score, P2.score, 1, 0)
                          }
                        }}
                      />
                    </Box >
                    <div className="mt-6 text-white">
                      {localStorage.getItem("status") == "" ? (<><h3 className="text-center text-lg font-bold ">{P1?.name}</h3></>) : (<>
                        <div className="flex flex-row justify-center items-center">
                          <Box sx={{
                            position: "relative",
                            width: "15%",
                            height: 0,
                            paddingBottom: "15%",
                            borderRadius: "50%",
                            overflow: "hidden",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            marginBottom: "10px"
                          }}
                          >
                            <img src={P1.img_avatar} onClick={() => {
                              navigate(`/profile_user/` + P1.id_user);
                              localStorage.setItem("img_avatar_user", P1.img_avatar)
                              localStorage.setItem("username_user", P1.username)
                            }} />

                          </Box>
                          <h3 className="text-center text-lg font-bold mx-5">{P1?.name}</h3>
                        </div>
                      </>)}
                      {chekShowP == 0 ? (
                        <></>
                      ) : (
                        <>
                          {chekColor == 1 ? (
                            <>
                              <div className="border-4 rounded-lg border-lime-200 p-4 text-sm" >
                                <p className="text-center" style={{ color: "white" }}>การคำนวณ</p>
                                <p style={{ color: "white" }}>
                                  คำนวณหาค่าคาดหวัง <br />
                                  1 / (1 + 10 ** ((Rb - Ra) / 400)) = Ea <br />
                                  1 / (1 + 10 ** (({P2.score} - {P1.score}) / 400)) = {showEa.toFixed(2)} <br /> <br />
                                  ขั้นตอนที่ 2 คำนวณคะแนนที่ได้จากการโหวด <br />
                                  Ka * (Sa - Ea) = Pa <br />
                                  {showKa} * (1 - {showEa.toFixed(2)}) = {showPa.toFixed(2)} <br /> <br />
                                  ขั้นตอนที่ 3 อัปเดตคะแนน <br />
                                  Ra + Pa = Ra <br />
                                  {P1.score} + {showPa.toFixed(2)} = {score1} <br />
                                </p>
                              </div>
                              <p className="text-center" style={{ color: "green" }}>+{scorePa}</p></>
                          ) : (
                            <>
                              <div className="border-4 rounded-lg border-red-300 p-4 " >
                                <p className="text-center" style={{ color: "white" }}>การคำนวณ</p>
                                <p style={{ color: "white" }}>
                                  คำนวณหาค่าคาดหวัง <br />
                                  1 / (1 + 10 ** ((Rb - Ra) / 400)) = Ea <br />
                                  1 / (1 + 10 ** (({P2.score} - {P1.score}) / 400)) = {showEa.toFixed(2)} <br /> <br />
                                  ขั้นตอนที่ 2 คำนวณคะแนนที่ได้จากการโหวด <br />
                                  Ka * (Sa - Ea) = Pa <br />
                                  {showKa} * (0 - {showEa.toFixed(2)}) = {showPa.toFixed(2)} <br /> <br />
                                  ขั้นตอนที่ 3 อัปเดตคะแนน <br />
                                  Ra + Pa = Ra <br />
                                  {P1.score} + {showPa.toFixed(2)} = {score1} <br />
                                </p>
                              </div>
                              <p className="text-center" style={{ color: "red" }}>{scorePa}</p></>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mx-5">
                    <img
                      src={VsImage}
                      className="w-full h-60 object-cover"
                    />
                  </div>
                  <div className="w-1/2 m-4 relative">
                    <Box
                      className="cursor-pointer transition-transform transform hover:scale-110"
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
                        src={P2?.img}
                        alt={P2?.name}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onClick={() => {
                          if (chekVote == 0) {
                            btnVote(P1.score, P2.score, 0, 1)
                          }

                        }}
                      />
                    </Box>
                    <div className="mt-6 text-white">
                      {localStorage.getItem("status") == "" ? (<><h3 className="text-center text-lg font-bold ">{P1?.name}</h3></>) : (<>
                        <div className="flex flex-row justify-center items-center">
                          <Box sx={{
                            position: "relative",
                            width: "15%",
                            height: 0,
                            paddingBottom: "15%",
                            borderRadius: "50%",
                            overflow: "hidden",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            marginBottom: "10px"
                          }}>
                            <img src={P2.img_avatar} onClick={() => {
                              navigate(`/profile_user/` + P2.id_user);
                              localStorage.setItem("img_avatar_user", P2.img_avatar)
                              localStorage.setItem("username_user", P2.username)
                            }} />
                          </Box>
                          <h3 className="text-center text-lg font-bold mx-5">{P2?.name}</h3>
                        </div>
                      </>)}
                      {chekShowP == 0 ? (
                        <></>
                      ) : (
                        <>
                          {chekColor == 2 ? (
                            <>
                              <div className="border-4 rounded-lg border-lime-200 p-4 text-sm" >
                                <p className="text-center" style={{ color: "white" }}>การคำนวณ</p>
                                <p style={{ color: "white" }}>
                                  คำนวณหาค่าคาดหวัง <br />
                                  1 / (1 + 10 ** ((Ra - Rb) / 400)) = Ea <br />
                                  1 / (1 + 10 ** (({P1.score} - {P2.score}) / 400)) = {showEb.toFixed(2)} <br /> <br />
                                  ขั้นตอนที่ 2 คำนวณคะแนนที่ได้จากการโหวด <br />
                                  Ka * (Sa - Ea) = Pa <br />
                                  {showKb} * (1 - {showEb.toFixed(2)}) = {showPb.toFixed(2)} <br /> <br />
                                  ขั้นตอนที่ 3 อัปเดตคะแนน <br />
                                  Ra + Pa = Ra <br />
                                  {P2.score} + {showPb.toFixed(2)} = {score2} <br />
                                </p>
                              </div>
                              <p className="text-center" style={{ color: "green" }}>+{scorePb}</p></>
                          ) : (
                            <>
                              <div className="border-4 rounded-lg border-red-300 p-4 " >
                                <p className="text-center" style={{ color: "white" }}>การคำนวณ</p>
                                <p style={{ color: "white" }}>
                                  คำนวณหาค่าคาดหวัง <br />
                                  1 / (1 + 10 ** ((Ra - Rb) / 400)) = Ea <br />
                                  1 / (1 + 10 ** (({P1.score} - {P2.score}) / 400)) = {showEb.toFixed(2)} <br /> <br />
                                  ขั้นตอนที่ 2 คำนวณคะแนนที่ได้จากการโหวด <br />
                                  Ka * (Sa - Ea) = Pa <br />
                                  {showKb} * (1 - {showEb.toFixed(2)}) = {showPb.toFixed(2)} <br /> <br />
                                  ขั้นตอนที่ 3 อัปเดตคะแนน <br />
                                  Ra + Pa = Ra <br />
                                  {P2.score} + {showPb.toFixed(2)} = {score2} <br />
                                </p>
                              </div>
                              <p className="text-center" style={{ color: "red" }}>{scorePb}</p></>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <Box textAlign="center">
                  <p>ไม่มีข้อมูลแล้ว เริ่มใหม่โปรดกด Start และรอ 5 วินาที</p>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={Load}
                  >
                    Start
                  </button>
                </Box>
              )}
            </div>
          </div>
        </Box>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress
            size="lg"
            value={50}
          />
        </div>
      )}
    </div>
  );
  async function btnVote(Ra: number, Rb: number, s1: number, s2: number) {
    const Ea = 1 / (1 + 10 ** ((Rb - Ra) / 400))
    const Eb = 1 / (1 + 10 ** ((Ra - Rb) / 400))
    let R1 = Ra;
    let K1 = 0;
    let R2 = Rb;
    let K2 = 0;
    if (R1 > 3000) {
      K1 = 5;
    } else if (R1 > 2401) {
      K1 = 10;
    } else if (R1 > 601) {
      K1 = 15;
    } else if (R1 > 0) {
      K1 = 25;
    } else {
      K1 = 25;
    }
    if (R2 > 3000) {
      K2 = 5;
    } else if (R2 > 2401) {
      K2 = 10;
    } else if (R2 > 601) {
      K2 = 15;
    } else if (R2 > 0) {
      K2 = 25;
    } else {
      K2 = 25;
    }
    let Pa = K1 * (s1 - Ea)
    let Pb = K2 * (s2 - Eb)
    let RA = Ra + Pa;
    let RB = Rb + Pb;

    setShowKa(K1);
    setShowKb(K2);
    setShowEa(Ea);
    setShowEb(Eb);
    setShowPa(Pa);
    setShowPb(Pb);
    setScorePa(Math.round(Pa))
    setScorePb(Math.round(Pb))
    setScore1(Math.round(RA));
    setScore2(Math.round(RB));
    setChekVote(1);
    setChekShowP(1);
    if (s1 == 1) {
      setChekColor(1)
    }
    if (s2 == 1) {
      setChekColor(2)
    }
    const res1 = await service.putReqImageID(P1!.id_img, P1!.img, P1!.id_user, P1!.name, Math.round(RA));
    if (res1 == 200) {
      service.postReqVote(P1!.id_img, localStorage.getItem("username")!.toString(), Math.round(RA))
    };
    const res2 = await service.putReqImageID(P2!.id_img, P2!.img, P2!.id_user, P2!.name, Math.round(RB));
    if (res2 == 200) {
      service.postReqVote(P2!.id_img, localStorage.getItem("username")!.toString(), Math.round(RB))
    };
    // console.log(P1?.id_img,P2?.id_img,localStorage.getItem("username"));

    await delay(5000);
    setChekShowP(0);
    setChekVote(0);
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
    // console.log(P1?.img_avatar);

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
