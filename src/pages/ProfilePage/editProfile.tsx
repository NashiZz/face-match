import { Box, Button, Card, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { memeMashService } from "../../service";
import { PostUserRespone } from "../../model/postUserRespone";

function EditProfilePage() {
  const navigate = useNavigate();
  const user: PostUserRespone | undefined = JSON.parse(
    localStorage.getItem("user") as string
  );
  // console.log(user)
  const service = new memeMashService();
  const [avatar, setAvatar] = useState(user?.img_avatar);
  // const [avatarUpload, setAvatarUpload] = useState(user?.img_avatar);
  const [file, setFile] = useState<File | null>(null);
  const username = useRef<HTMLInputElement>();
  const pwd = useRef<HTMLInputElement>();
  const pwdNew = useRef<HTMLInputElement>();
  // const pwdNew = useRef<HTMLInputElement>();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target?.result as string;
        setAvatar(imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatar(user?.img_avatar);
    }
  }, [file, user?.img_avatar]);

  // async function loadImge()  {
  //     if (file) {
  //     console.log("uploading...");
  //     const url = "http://localhost:3000/upload";
  //     const body = {
  //       file: file,
  //     };
  //     const response = await axios.post(url, body, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     return response.data;

  //   }


  // }
  function navigateToBack() {
    navigate("/profile");
  }
  async function btnEditData(username: string, password: string, passwordNew: string, _image: string) {
    try {
      let newImage: string | undefined = user?.img_avatar;
      if (file) {
        const uploadResponse = await service.postUpload(file);
        if (uploadResponse) {
          newImage = uploadResponse.url;
        } else {
          throw new Error("Failed to upload new image");
        }
      }

      const response = await service.putEditProfile(username, password, passwordNew, user!.id_user, newImage || '');
      if (response === 200) {
        localStorage.setItem("img_avatar", newImage || '');
        navigate("/profile");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function selectFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
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
          <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", width: 700, height: 250, backgroundColor: "lightcyan" }}>
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
          <h2 className="mt-6" >โปรดใส่รหัสผ่านใหม่ที่ต้องการแก้ไข</h2>
          <TextField fullWidth style={{ width: 700 }} type="password" inputRef={pwdNew} />
          <h2 className="mt-6" >โปรดใส่รหัสเดิมเพื่อยืนยันการแก้ไข</h2>
          <TextField fullWidth style={{ width: 700 }} type="password" inputRef={pwd} />
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
                if (username.current && pwd.current && pwdNew.current) {
                  btnEditData(username.current.value, pwd.current.value, pwdNew.current.value, avatar || '');
                } else {
                  console.error("Please fill in all required fields");
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
