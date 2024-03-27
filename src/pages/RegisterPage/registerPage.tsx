import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { memeMashService } from "../../service";

function Register_Page() {

    // const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const username = useRef<HTMLInputElement>();
    const email = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();
    const conpassword = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const service = new memeMashService();

    async function handleRegister() {
        const userData = {
            username: username.current?.value || "",
            email: email.current?.value || "",
            password: password.current?.value || "",
            conpassword: conpassword.current?.value || "",
            img_avatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        };
        if (!userData.username || !userData.email || !userData.password) {
            console.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        if (userData.password !== userData.conpassword) {
            console.error("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
            return;
        }

        try {
            // let img_avatar = "";
            // if (avatarFile) {
            //     const formData = new FormData();
            //     formData.append("file", avatarFile);
            //     try {
            //         const response = await axios.post(HOST + "/upload", formData);
            //         img_avatar = response.data.filename;

            //     } catch (error) {
            //         console.error("Error uploading file:", error);
            //     }
            // }
            console.log(userData);
            
            const response = await service.registerUser(userData.username, userData.email, userData.password, userData.img_avatar);
            if(response==201){
                console.log(1);
            }

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

    // function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = function (e) {
    //             const imageUrl = e.target?.result as string;
    //             const previewImg = document.querySelector("#preview") as HTMLImageElement;
    //             if (previewImg) {
    //                 previewImg.src = imageUrl;
    //             }
    //         };
    //         reader.readAsDataURL(file);
    //         setAvatarFile(file);
    //     }
    // }

    return (
        <div className="kanit-regular flex justify-center items-center bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500"
            style={{ boxSizing: 'border-box', minHeight: '100vh' }}>
            <div className='wrapper'>
                <form action="">
                    <h1>สมัครสมาชิก</h1>
                    <img />
                    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <img id="preview" alt="Image Preview" style={{ borderRadius: "50%", border: "2px solid #191919", color: "GrayText" }} width={140}
                            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }} className='input-box'>
                        <TextField label='ชื่อผู้ใช้' inputRef={username} fullWidth />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }} className='input-box'>
                        <TextField label='อีเมล' inputRef={email} fullWidth />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }} className='input-box'>
                        <TextField label='รหัสผ่าน' type="password" inputRef={password} fullWidth />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }} className='input-box'>
                        <TextField label='ยืนยันรหัสผ่าน' type="password" inputRef={conpassword} fullWidth />
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