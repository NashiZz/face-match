import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { memeMashService } from "../../service";

function PicturePage() {
    const navigate = useNavigate();
    const iduser = localStorage.getItem("id_user")
    const service = new memeMashService();
    const name = useRef<HTMLInputElement>(null); // ต้องกำหนดให้ null ตอนเริ่มต้น
    const [Img, setImg] = useState("");
    const [avatar, setAvatar] = useState(""); // ต้องกำหนดให้ว่างเพื่อเริ่มต้น
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target?.result as string;
                setAvatar(imageUrl);
            };
            reader.readAsDataURL(file);
        } else {
            setAvatar(""); // ต้องกำหนดให้ว่างเพื่อล้างรูปภาพเมื่อไม่มีไฟล์
        }
    }, [file]);

    function navigateToBack() {
        navigate("/profile");
    }

    async function bntAddImage(name: string) {
        if (!iduser) {
            console.error("User ID is not available.");
            return;
        }

        try {
            let newImage: string | undefined = avatar; // ใช้ avatar แทน user?.img_avatar

            if (file) {
                const uploadResponse = await service.postUpload(file);
                if (uploadResponse) {
                    newImage = uploadResponse.url;
                } else {
                    throw new Error("Failed to upload new image");
                }
            }

            const res = await service.postImage(newImage, parseInt(iduser), name); // แก้ไขการเรียกใช้ฟังก์ชัน postImage
            if (res === 200) {
                navigate("/profile");
            }
        } catch (error) {
            console.error("Error while posting image:", error);
        }
    }

    function selectFile(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            setImg(URL.createObjectURL(file));
        }
    }
    function openFileInput() {
        const fileInput = document.getElementById('file');
        if (fileInput) {
            fileInput.click();
        }
    }
    return (
        <div className="flex justify-center items-center flex-col bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500" style={{ minHeight: "100vh" }}>
            <div className="card_edit">
                <div className="flex justify-center " style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 className="text-2xl font-bold">เพิ่มรูปภาพ MEME สุดเท่</h1>
                    <Box className="pb-8">
                        <Button variant="contained" onClick={navigateToBack} sx={{ fontFamily: "Kanit, sans-serif" }}>
                            กลับ
                        </Button>
                    </Box>
                </div>

                {Img !== "" ? (
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
                            onClick={openFileInput}
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
                        <input
                            id="file"
                            type="file"
                            accept="image/*"
                            onChange={selectFile}
                            style={{ display: "none" }}
                        />
                    </div>
                ) : (
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
                                <label htmlFor="file">Change image</label>
                                <input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    onChange={selectFile}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </Box>
                    </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", marginLeft: 100, marginTop: 30 }}>
                    <h2>ชื่อรูปภาพ</h2>
                    <TextField fullWidth style={{ width: 700 }} inputRef={name} />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                        <Button variant="contained" sx={{ fontFamily: 'Kanit, sans-serif' }} onClick={() => {
                            bntAddImage(name.current!.value);
                        }}>บันทึก</Button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PicturePage;
