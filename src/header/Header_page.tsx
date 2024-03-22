import { Box, AppBar, Toolbar, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import { useNavigate } from "react-router-dom";
import React from "react";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  function navigateToAllUser() {
    navigate("/admin_all_user");
  }

  function navigateToRank() {
    navigate("/rank");
  }

  function navigateToProfile() {
    navigate("/profile");
  }

  function navigateToHome() {
    navigate("/");
  }

  function navigateToLogin() {
    navigate("/login");
  }
  function navigateToLoOut() {
    localStorage.setItem("username", "บุคคลนิรนาม");
    localStorage.setItem("email", "");
    localStorage.setItem("status", "");
    localStorage.setItem("id_user", "");
    localStorage.setItem("img_avatar", "");
    localStorage.setItem("user", "");
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ boxShadow: 10, backgroundColor: "cornflowerblue" }}
      >
        <Toolbar>
          <RecommendRoundedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            MEMEMASH
          </Typography>
          <div>
            <Button
              color="inherit"
              onClick={navigateToHome}
              sx={{ fontFamily: "Kanit, sans-serif" }}
            >
              หน้าแรก
            </Button>
            {localStorage.getItem("username") == "บุคคลนิรนาม" ? (
              <></>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={navigateToProfile}
                  sx={{ fontFamily: "Kanit, sans-serif" }}
                >
                  โปรไฟล์
                </Button>
              </>
            )}
            <Button
              color="inherit"
              onClick={navigateToRank}
              sx={{ fontFamily: "Kanit, sans-serif" }}
            >
              อันดับ
            </Button>
            {localStorage.getItem("username") === "บุคคลนิรนาม" ? (<><Button
              color="inherit"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ fontFamily: "Kanit, sans-serif" }}
            >
              เข้าสู่ระบบ
            </Button></>):(<>
                <Button
              color="inherit"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ fontFamily: "Kanit, sans-serif" }}
            >
              ออกจากระบบ
            </Button>
            </>)}
            
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {localStorage.getItem("status") === "admin" ? (
                <MenuItem
                  onClick={() => {
                    navigateToAllUser();
                    handleClose();
                  }}
                >
                  Admin
                </MenuItem>
              ) : (
                <p></p>
              )}
              {localStorage.getItem("username") === "บุคคลนิรนาม" ? (
                <MenuItem
                  onClick={() => {
                    navigate("/login");
                    handleClose();
                  }}
                >
                  LogIn
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    navigateToLoOut();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              )}

            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
