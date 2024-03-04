import { Box, AppBar, Toolbar, Menu, MenuItem } from "@mui/material";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RecommendRoundedIcon from '@mui/icons-material/RecommendRounded';
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

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ boxShadow: 10, backgroundColor: "cornflowerblue" }} >
                <Toolbar>
                    <RecommendRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            flexGrow: 1
                        }}
                    >
                        MEMEMASH
                    </Typography>
                    <div>
                        <Button color="inherit" onClick={navigateToHome} sx={{ fontFamily: 'Kanit, sans-serif' }}>หน้าแรก</Button>
                        <Button color="inherit" onClick={navigateToProfile} sx={{ fontFamily: 'Kanit, sans-serif' }}>โปรไฟล์</Button>
                        <Button color="inherit" onClick={navigateToRank} sx={{ fontFamily: 'Kanit, sans-serif' }}>อันดับ</Button>
                        <Button
                            color="inherit"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ fontFamily: 'Kanit, sans-serif' }}>
                            ออกจากระบบ
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => { navigateToAllUser(); handleClose(); }}>User</MenuItem>
                            <MenuItem onClick={() => { navigateToAllUser(); handleClose(); }}>Admin</MenuItem>
                            <MenuItem onClick={() => { navigateToLogin(); handleClose(); }}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;