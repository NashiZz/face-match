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

  function navigateToGraph(id_img:number) {
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
      <div className="bg-profile">
        <Container fixed>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ marginTop: 120 }}
              >
                <Grid item xs={5} md={4} lg={3} sx={{ marginRight: 10 }}>
                  <img
                    style={{ borderRadius: "50%", width: "100%" }}
                    src={user.current?.img_avatar}
                    alt=""
                  />
                </Grid>
                <Grid
                  item
                  xs={8}
                  md={5}
                  lg={6.5}
                  sx={{ fontSize: { xs: 18, md: 25 } }}
                >
                  <Box>
                    <Box
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
              <Grid item xs={12} sx={{ marginTop: 5 }}>
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
                      {images.current
                        ? images.current.map((image) => (
                            <Fragment key={image.id_img}>
                              <Grid item xs={5} lg={3.5}>
                                <Box
                                  sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: 0,
                                    paddingBottom: "100%",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    boxShadow:
                                      "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <img
                                    style={{
                                      position: "absolute",
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                    src={image.img}
                                    alt=""
                                    onClick={()=>{
                                        navigateToGraph(image.id_img)
                                    }}
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "end",
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
                                    {image.score} คะแนน
                                  </Typography>
                                </Box>
                              </Grid>
                            </Fragment>
                          ))
                        : null}
                    </Grid>
                  </Box>
                </Container>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
}

export default ProfilePage;
