import { memeMashService } from "../../service";
import { GetImageRespone } from "../../model/getImageRespone";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
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
  // const navigate = useNavigate();
  // const [IndexImage,setIndexImage] = useState(4);

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
    };
    loadDataAsync();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4 bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500 " style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "50px" }}>
      <h1 style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", fontSize: "2vw", color: "white" }}>
        โหวตรูปภาพ Meme ที่คุณชอบโดยการคลิก!!
      </h1>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 50px)">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="pb-16"  style={{ fontSize: "2vw", color: "white" }} >
            โหวตรูปภาพ Meme ที่คุณชอบโดยการคลิก ห่าขั้วมึง!! 
          </h1>
          <div className="flex flex-row justify-center items-center">
            {P1 && P2 ? (
              <>
                <div className="w-1/2 m-5 relative">
                  <img
                    src={P1?.img}
                    alt={P1?.name}
                    className="border-4 w-full h-80 rounded-lg cursor-pointer transition-transform transform hover:scale-110 object-cover"
                    onClick={() => btnVote(P1.score, P2.score, 1, 0)}
                  />
                  <div className="mt-6 text-white">
                    <h3 className="text-center text-lg font-bold">{P1?.name}</h3>
                    {chekShowP == 0 ? (
                      <></>
                    ) : (
                      <>
                        {chekColor == 1 ? (
                          <><p style={{ color: "green" }}>+{scorePa}</p></>
                        ) : (
                          <><p style={{ color: "red" }}>{scorePa}</p></>
                        )}
                      </>
                    )}
                    <p className="text-center">{score1}</p>
                  </div>
                </div>
                <div className="">
                  <img
                    src={VsImage}
                    className="w-60 h-50 object-cover"
                  />
                </div>
                <div className="w-1/2 m-4 relative">
                  <img
                    src={P2?.img}
                    alt={P2?.name}
                    className="border-4 w-full h-80 rounded-lg cursor-pointer transition-transform transform hover:scale-110 object-cover"
                    onClick={() => btnVote(P1.score, P2.score, 0, 1)}
                  />
                  <div className="mt-6 text-white">
                    <h3 className="text-center text-lg font-bold">{P2?.name}</h3>
                    {chekShowP == 0 ? (
                      <></>
                    ) : (
                      <>
                        {chekColor == 2 ? (
                          <><p style={{ color: "green" }}>+{scorePb}</p></>
                        ) : (
                          <><p style={{ color: "red" }}>{scorePb}</p></>
                        )}
                      </>
                    )}
                    <p className="text-center">{score2}</p>
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

    await delay(10000);
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
