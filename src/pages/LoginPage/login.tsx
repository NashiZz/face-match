import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { memeMashService } from "../../service";

function LoginPage() {
  const username = useRef<HTMLInputElement>();
  const pwd = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const service = new memeMashService();

  async function login(username: string, pwd: string) {
    // console.log(username, pwd);

    const user = await service.getLogin(username, pwd);
    localStorage.setItem("id_user", user!.id_user.toString());
    localStorage.setItem("username", user!.username);
    localStorage.setItem("email", user!.email);
    localStorage.setItem("status", user!.status);
    localStorage.setItem("img_avatar", user!.img_avatar);
    localStorage.setItem("user", JSON.stringify(user));
    if (user?.status == "user") {
      navigate("/");
    } else if (user?.status == "admin") {
      navigate("/admin_all_user");
    } else {
      console.log("รหัสผ่านผิด");
    }
  }

  return (
    <div
      className="kanit-regular flex justify-center items-center bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500"
      style={{
        display: "flex",
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div className="wrapper">
        <form action="">
          <h1>เข้าสู่ระบบ</h1>
          <div
            style={{ display: "flex", flexDirection: "row" }}
            className="input-box"
          >
            <TextField label="อีเมล" inputRef={username} fullWidth />
          </div>
          <div
            style={{ display: "flex", flexDirection: "row" }}
            className="input-box"
          >
            <TextField
              label="รหัสผ่าน"
              type="password"
              inputRef={pwd}
              fullWidth
            />
          </div>
          <div className="remember">
            <a href="#"> ลืมรหัสผ่าน?</a>
          </div>
          <Button
            onClick={() => {
              if (username.current && pwd.current) {
                login(username.current.value, pwd.current.value);
              }
            }}
          >
            ล๊อคอิน
          </Button>
          <div className="register">
            <p>
              คุณยังไม่ได้สมัครสมาชิก? <Link to="/registers">สมัครสมาชิก</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
