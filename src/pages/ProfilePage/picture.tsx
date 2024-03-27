import { Box, Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { memeMashService } from "../../service";

function PicturePage() {
    const navigate = useNavigate();
    const iduser = localStorage.getItem("id_user")
    const service = new memeMashService();
    const name = useRef<HTMLInputElement>();
    const [Img, setImg] = useState("");
    function navigateToBack() {
        navigate("/profile");
    }
    async function bntAddImage(img: string, name: string) {
        const res = await service.postImage(img, +iduser!, name);
        //     setImagesData(res);
        if (res == 200) {
            navigate("/profile");
        }
    }
    return (
        <div className="flex justify-center items-center flex-col bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500" style={{ minHeight: "100vh" }}>
            <div className="card_edit">
                <div
                    className="flex justify-center "
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <h1 className="text-2xl font-bold">เพิ่มรูปภาพ MEME สุดเท่</h1>
                    <Box className="pb-8">
                        <Button
                            variant="contained"
                            onClick={navigateToBack}
                            sx={{ fontFamily: "Kanit, sans-serif" }}
                        >
                            กลับ
                        </Button>
                    </Box>
                </div>

                {Img == "" ? (<>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 100 }}>
                        <Box
                            className="group hover:bg-sky-500 hover:ring-sky-500"
                            sx={{
                                position: "relative",
                                width: 250,
                                height: 250,
                                borderRadius: "10px",
                                overflow: "hidden",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <div
                                className="icon-add"
                                onClick={() => {
                                    const url = prompt("Image URL:");
                                    setImg(url!)
                                }}
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer"
                                }}
                            >
                                <AddIcon style={{ fontSize: "56px" }} />
                            </div>
                        </Box>
                    </div>
                </>) : (<>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 100 }}>
                        <Box
                            sx={{
                                position: "relative",
                                width: "50%",
                                height: 0,
                                paddingBottom: "50%",
                                borderRadius: "10px",
                                overflow: "hidden",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <img
                                className="cursor-pointer transition-transform transform hover:scale-110"
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                                src={Img}
                                alt=""

                            />
                        </Box>
                    </div>
                </>)}

                <div style={{ display: "flex", flexDirection: "column", marginLeft: 100, marginTop: 30 }}>
                    <h2>ชื่อรูปภาพ</h2>
                    <TextField fullWidth style={{ width: 700 }} inputRef={name} />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                        <Button variant="contained" sx={{ fontFamily: 'Kanit, sans-serif' }} onClick={() => {
                            bntAddImage(Img, name.current!.value);
                        }}>บันทึก</Button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PicturePage;
