import { TextField } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';

function Register_Page() {
    const username = useRef<HTMLInputElement>();
    const pwd = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    function navigateToHome() {
        navigate("/home");
      }

    return (
        <div className="kanit-regular" style={{ display: 'flex', boxSizing: 'border-box', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div className='wrapper'>
            <form action="">
                <h1>สมัครสมาชิก</h1>
                <div style={{ display: 'flex', justifyContent: "center"}}>
                    <img style={{ borderRadius: "50%", border: "2px solid #ccc" }} width={150} src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
                </div>
                <div style={{ display: 'flex',flexDirection: 'row'}} className='input-box'>
                    <EmailIcon sx={{ width: 20, pl: 1, pb: 1, pr: "8px" }} className="icon" />
                    <TextField label='ชื่อผู้ใช้' inputRef={username} fullWidth  />
                </div>
                <div style={{ display: 'flex',flexDirection: 'row'}} className='input-box'>
                    <EmailIcon sx={{ width: 20, pl: 1, pb: 1, pr: "8px" }} className="icon" />
                    <TextField label='อีเมล' inputRef={pwd} fullWidth />
                </div>
                <div style={{ display: 'flex',flexDirection: 'row'}} className='input-box'>
                    <LockIcon sx={{ width: 20, pl: 1, pb: 1, pr: "8px" }} className="icon" />
                    <TextField label='รหัสผ่าน' inputRef={pwd} fullWidth />
                </div>
                <button className="kanit-regular" onClick={navigateToHome}>
                    สมัคร
                </button>

                <div className='register'>
                    <p>มีบัญชีอยู่แล้ว? <a href="/">เข้าสู่ระบบ</a></p>
                </div>
            </form>
            </div>
        </div>
    );
}
export default Register_Page;