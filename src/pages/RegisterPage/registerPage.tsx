import { Button, IconButton, TextField } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { memeMashService } from "../../service";

function Register_Page() {
    const username = useRef<HTMLInputElement>();
    const email = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const service = new memeMashService();

    async function handleRegister() {
        const userData = {
            username: username.current?.value || "",
            email: email.current?.value || "",
            password: password.current?.value || "",
            img_avatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" // URL รูปภาพ
        };
        if (!userData.username || !userData.email || !userData.password) {
            console.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        try {
            const response = await service.registerUser(userData.username, userData.email, userData.password, userData.img_avatar);

            if (!response) {
                throw new Error("เกิดข้อผิดพลาดในการลงทะเบียนผู้ใช้");
            }

            const user = await service.getLogin(userData.email, userData.password);

            localStorage.setItem("id_user", user!.id_user.toString());
            localStorage.setItem("username", user!.username);
            localStorage.setItem("email", user!.email);
            localStorage.setItem("status", user!.status);
            localStorage.setItem("img_avatar", user!.img_avatar);
            localStorage.setItem("user", JSON.stringify(user));
            if (user?.status == "user") {
                navigate("/");
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="kanit-regular flex justify-center items-center bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500"
            style={{ boxSizing: 'border-box', minHeight: '100vh' }}>
            <div className='wrapper'>
                <form action="">
                    <h1>สมัครสมาชิก</h1>
                    <div style={{ display: 'flex', justifyContent: "center", position: "relative" }}>
                        <img style={{ borderRadius: "50%", border: "2px solid #191919", color: "GrayText" }} width={140} src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
                        <div style={{ display: 'flex', justifyContent: "center", position: "absolute", bottom: "-5px", left: "200px" }}>
                            <IconButton style={{ backgroundColor: "white", borderRadius: "50%", padding: "8px" }}>
                                <AddIcon style={{ color: "#191919" }} />
                            </IconButton>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }} className='input-box'>
                        <TextField label='ชื่อผู้ใช้' inputRef={username} fullWidth />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }} className='input-box'>
                        <TextField label='อีเมล' inputRef={email} fullWidth />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }} className='input-box'>
                        <TextField label='รหัสผ่าน' inputRef={password} fullWidth />
                    </div>
                    <Button onClick={handleRegister}>
                        สมัคร
                    </Button>

                    <div className='register'>
                        <p>มีบัญชีอยู่แล้ว? <a href="/">เข้าสู่ระบบ</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register_Page;