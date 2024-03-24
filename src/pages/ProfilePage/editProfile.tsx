import { Box, Button, Card, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { memeMashService } from "../../service";
import { UploadPostRespone } from "../../model/uploadPostRespone";
import axios from "axios";
import { PostUserRespone } from "../../model/postUserRespone";

function EditProfilePage() {
  const navigate = useNavigate();
  const user: PostUserRespone | undefined = JSON.parse(
    localStorage.getItem("user") as string
  );
  // console.log(user)
  const service = new memeMashService();
  const [avatar, setAvatar] = useState(user?.img_avatar);
  const [file, setFile] = useState<File>();
  const username = useRef<HTMLInputElement>();
  const pwd = useRef<HTMLInputElement>();

  useEffect(() => {
    const updateImagePreviews = () => {
      if (!file) {
        setAvatar(user?.img_avatar);
        return;
      }
      const newImagePreview = URL.createObjectURL(file);
      setAvatar(newImagePreview);
    };
    updateImagePreviews();
  }, [file]);

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0]);
      // loadImge()
    }
  }

  async function loadImge() {
    if (file) {
      console.log("uploading...");
      const url = "http://localhost:3000/upload";
      const body = {
        file: file,
      };
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = response.data;
      // setAvatar("http://localhost:3000"+result.filename);
    }
  }
  function navigateToBack() {
    navigate("/profile");
  }
  async function btnEditData (username:string,password:string){
    

  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500" style={{ minHeight: "100vh" }}>
      <div className="card_edit">
        <div
          className="flex justify-center "
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1 className="text-lg font-bold">แก้ไขโปรไฟล์</h1>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", width: 700, height: 200, backgroundColor: "lightcyan" }}>
            <div
              className="profile-image"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: 50,
                marginRight: 50,
                marginTop: 25,
              }}
            >
              <img src={avatar} alt="profile" />

            </div>
            <div>
              <Button
                variant="contained"
                sx={{ fontFamily: "Kanit, sans-serif" }}
              >
                <label htmlFor="file">change image</label>
              </Button>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={selectFile}
                style={{ display: "none" }}
              />
            </div>
          </Card>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 70,
            marginTop: 30,
          }}
        >
          <h2>ชื่อ</h2>
          <TextField
            fullWidth
            style={{ width: 700 }}
            defaultValue={user?.username}
            inputRef={username}
          />
          <h2 className="mt-6" >โปรดใส่รหัสผ่านเพื่อยืนยันการแก้ไข</h2>
          <TextField fullWidth style={{ width: 700 }} type="password" inputRef={pwd}/>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
              marginRight: 60
            }}
          >
            <Button
              variant="contained"
              sx={{ fontFamily: "Kanit, sans-serif" }}
              onClick={() => {
              if (username.current && pwd.current) {
                btnEditData(username.current.value, pwd.current.value);
              }
            }}
            >
              บันทึก
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
