import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from "react";
import { memeMashService } from "../../service";
import { GetImageRespone } from "../../model/getImageRespone";
import { PostUserRespone } from "../../model/postUserRespone";

function ProfilePage() {
  const navigate = useNavigate();
  const service = new memeMashService();
  const images = useRef<GetImageRespone[]>([]);
  const user = useRef<PostUserRespone>();
  const [sumScore, setSumScore] = useState(0);

  function navigateToEdit() {
    navigate("/edit_profile");
  }

  function navigateToPicture() {
    navigate("/picture");
  }

  function navigateToGraph(id_img: number) {
    navigate(`/graph/${id_img}`);
  }

  useEffect(() => {
    const loadDataAsync = async () => {
      const usert = localStorage.getItem("user");
      if (usert) {
        const u: PostUserRespone = JSON.parse(usert);
        user.current = u;
        const res: GetImageRespone[] = await service.getReqImage();
        const image: GetImageRespone[] | [] = res.filter(
          (image: { id_user: number | undefined }) =>
            image.id_user === u?.id_user
        );
        images.current = image;
        let sum = 0;
        for (let i = 0; i < images.current.length; i++) {
          sum = sum + images.current[i].score;
        }
        setSumScore(sum);
      }
    };
    loadDataAsync();
  }, []);
  return (
    <>
      <div className="flex justify-center items-center flex-col bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500" style={{ minHeight: "100vh" }}>
        <div className="bg-slate-50 rounded-md" style={{ width: "1200px", height: "700px" }} >
          <Container fixed>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  style={{ marginTop: 20 }}
                >
                  <Grid item xs={3} md={3} lg={3} sx={{ marginRight: 10 }}>
                    <img
                      style={{ borderRadius: "50%", width: "100%" }}
                      src={user.current?.img_avatar}
                      alt=""
                    />
                  </Grid>
                  <Grid
                    item xs={4} md={5.0} lg={6.5}
                    sx={{ fontSize: { xs: 18, md: 25 } }}
                  >
                    <Box>
                      <Box
                        className="mb-8"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <h3 className="kanit-regular">
                          {localStorage.getItem("username")}
                        </h3>
                        <Box sx={{ marginLeft: 2, display: "flex" }}>
                          <Button
                            variant="contained"
                            onClick={navigateToEdit}
                            sx={{
                              fontFamily: "Kanit, sans-serif",
                              fontSize: { xs: 10, md: 14 },
                            }}
                          >
                            แก้ไขโปรไฟล์
                          </Button>
                          <Button
                            variant="contained"
                            onClick={navigateToPicture}
                            sx={{
                              fontFamily: "Kanit, sans-serif",
                              fontSize: { xs: 10, md: 14 },
                              marginLeft: 2,
                            }}
                          >
                            แก้ไขรูปภาพ
                          </Button>
                        </Box>
                      </Box>
                      <Divider sx={{ marginTop: -1 }} />
                      <Box
                        sx={{
                          marginTop: 1,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <h5
                          className="kanit-regular"
                          style={{
                            marginRight: 2,
                            fontWeight: "bold",
                            fontSize: 16,
                          }}
                        >
                          คะแนนทั้งหมด :{" "}
                        </h5>
                        <h5
                          className="kanit-regular"
                          style={{
                            marginRight: 2,
                            fontWeight: "bold",
                            fontSize: 16,
                          }}
                        >
                          {sumScore}
                        </h5>
                        <h5
                          className="kanit-regular"
                          style={{ fontWeight: "bold", fontSize: 16 }}
                        >
                          Point
                        </h5>
                      </Box>
                      <Grid item xs={12} sx={{ marginTop: 1 }}>
                        {/* <p style={{ fontFamily: 'Kanit, sans-serif' }}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt itaque natus facilis ut ratione eaque eum impedit voluptatum nulla nostrum, delectus sequi suscipit cum, excepturi minus nobis. Amet, ea fuga.</p> */}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                  <Container fixed sx={{ marginTop: 5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid
                        container
                        spacing={3}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {[...Array(Math.min(5, images.current.length))].map((_, index) => (
                          <Fragment key={index}>
                            <Grid item xs={2.4} lg={2.4}>
                              <Box
                                sx={{
                                  position: "relative",
                                  width: "100%",
                                  height: 0,
                                  paddingBottom: "100%",
                                  borderRadius: "10px",
                                  overflow: "hidden",
                                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                                <img
                                  className="cursor-pointer transition-transform transform hover:scale-110"
                                  style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                  src={images.current[index].img}
                                  alt=""
                                  onClick={() => {
                                    navigateToGraph(images.current[index].id_img);
                                  }}
                                />
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginTop: "8px",
                                }}
                              >
                                <IconButton aria-label="like">
                                  <FavoriteIcon color="error" />
                                </IconButton>
                                <Typography
                                  variant="body2"
                                  sx={{ fontFamily: "Kanit, sans-serif" }}
                                >
                                  {images.current[index].score} คะแนน
                                </Typography>
                                <IconButton aria-label="more options">
                                  <MoreVertIcon />
                                </IconButton>
                              </Box>
                            </Grid>
                          </Fragment>
                        ))}
                        {images.current.length < 5 && (
                          <Grid item xs={2.4} lg={2.4}>
                            <Box
                              sx={{
                                position: "relative",
                                width: "100%",
                                height: 0,
                                paddingBottom: "100%",
                                borderRadius: "10px",
                                overflow: "hidden",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              <div
                                style={{
                                  position: "absolute",
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <IconButton aria-label="add" onClick={navigateToPicture}>
                                  <AddIcon />
                                </IconButton>
                              </div>
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  </Container>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
