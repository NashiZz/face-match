import { Box, Button, Card, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 120,
      }}
    >
      <div className="card_edit">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 20,
          }}
        >
          <h1 style={{ marginLeft: 80 }}>แก้ไขโปรไฟล์</h1>
          <Box sx={{ marginRight: 10, marginTop: 2 }}>
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
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: 100,
          }}
        >
          <Card sx={{display:"flex",flexDirection:"column",justifyContent:"start",alignItems:"center", width: 700, height: 200, backgroundColor: "lightcyan" }}>
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
            marginLeft: 100,
            marginTop: 30,
          }}
        >
          <h2>ชื่อ</h2>
          <TextField
            fullWidth
            style={{ width: 700 }}
            defaultValue={user?.username}
          />
          <h2>โปรดใส่รหัสผ่านเพื่อยืนยันการแก้ไข</h2>
          <TextField fullWidth style={{ width: 700 }} type="password" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Button
              variant="contained"
              sx={{ fontFamily: "Kanit, sans-serif" }}
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
