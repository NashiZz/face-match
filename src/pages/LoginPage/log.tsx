import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import "./login.css";
import { useRef } from "react";

// import { useNavigate } from "react-router-dom";
import axios from "axios";
function LoginPage2() {
  let emailRef = useRef<HTMLInputElement>();
  let passwordRef = useRef<HTMLInputElement>();

  return (
    <>
      <Container fixed>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            padding: 2,
            fontSize: 35,
            fontWeight: "bold",
            color: "purple",
            width: 400,
            height: 400,
            border: "1px solid white",
            borderRadius: 3,
            bgcolor: "#B6AEAE",
            "&:hover": {
              color: "purple",
              bgcolor: "white",
            },
          }}
        >
          Login
          <TextField
            type="text"
            inputRef={emailRef}
            label="email"
            color="secondary"
            
            InputProps={{
              sx: { color: "white", borderColor: "white" },
            }}
            sx={{
              marginTop: 3,
              width: 380,
            }}
          />
          <TextField
            type="text"
            inputRef={passwordRef}
            label="PassWord"
            color="secondary"
            
            InputProps={{
              sx: { color: "white", borderColor: "white" },
            }}
            sx={{
              marginTop: 3,
              width: 380,
            }}
          />
          <a
            href=""
            style={{
              fontSize: 15,
              textDecoration: "none",
              marginTop: 18,
              color: "purple",
            }}
          >
            forget password
          </a>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              marginTop: 3,
              width: 380,
            }}
          >
            Sing in
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={send}
            sx={{
              marginTop: 1,
              width: 380,
            }}
          >
            Send
          </Button>
          <br />
          
        </Box>
      </Container>
    </>
  );
  async function send() {
    const url = "http://localhost:3000/login" 
        const body = {
            email:emailRef.current?.value,
            password:passwordRef.current?.value
        }
        // console.log(body);
        
        const response = await axios.post(url, body);
        const result = response.data;
        console.log(result);
        
        // if (response.status==200){
        //     navigate("/profile");
        // }
        // else {
        //     navigate("/profile");
        // }
  }
}
export default LoginPage2;