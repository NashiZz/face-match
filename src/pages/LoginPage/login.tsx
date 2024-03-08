import { Button, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { memeMashService } from "../../service";

function LoginPage() {
  const username = useRef<HTMLInputElement>();
  const pwd = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const service = new memeMashService();

  async function login(username: string, pwd: string) {
    console.log(username, pwd);

    const user = await service.getLogin(username, pwd);
    console.log(user?.status);
    localStorage.setItem("username", user!.username);
    localStorage.setItem("email", user!.email);
    localStorage.setItem("status", user!.status);
    if (user?.status == "user") {
      navigate("/");
    } else if (user?.status == "admin") {
      navigate("/admin");
    } else {
      console.log("รหัสผ่านผิด");
    }
  }

  return (
    <div
      className="kanit-regular"
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
            <EmailIcon
              sx={{ width: 20, pl: 1, pb: 1, pr: "8px" }}
              className="icon"
            />
            <TextField label="อีเมล" inputRef={username} fullWidth />
          </div>
          <div
            style={{ display: "flex", flexDirection: "row" }}
            className="input-box"
          >
            <LockIcon
              sx={{ width: 20, pl: 1, pb: 1, pr: "8px" }}
              className="icon"
            />
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
              คุณยังไม่ได้สมัครสมาชิก? <a href="/register">สมัครสมาชิก</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
