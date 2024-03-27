import { Button, CircularProgress, Dialog, DialogActions, DialogTitle, Slide, Tab, Tabs, TextField } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import React, { useEffect, useRef, useState } from "react";
import { GetImageRespone } from "../../model/getImageRespone";
import { memeMashService } from "../../service";
import { useNavigate } from "react-router-dom";
import { UserGetRes } from "../../model/userGetRes";
import { TransitionProps } from "@mui/material/transitions";

function AllUserPage() {
  const navigate = useNavigate();
  const setCooldown = useRef<HTMLInputElement>();
  const [value, setValue] = useState("1");
  const service = new memeMashService();
  const pics = useRef<GetImageRespone[]>([]);
  const users = useRef<UserGetRes[]>([]);
  const [CoolDownvalue, setCoolDownValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleClose = () => {
    setOpen(false);
  };


  const handleChange = (
    _event: any,
    newValue: React.SetStateAction<string>
  ) => {
    setValue(newValue);
  };
  useEffect(() => {
    const loadDataAsync = async () => {
      if (localStorage.getItem("username") == "") {
        localStorage.setItem("username", "บุคคลนิรนาม");
      }
      const res = await service.getReqImage();
      pics.current = res;
      console.log(pics.current);

      const resuser = await service.getUserRes();
      users.current = resuser;
      console.log(users.current);

      const rescool = await service.getResCooldown();
      setCoolDownValue(rescool);

      // console.log(pics.current);
    };
    loadDataAsync();
  }, []);

  function navigateToGraph(id_img: number) {
    navigate(`/graph/${id_img}`);
  }
  async function bntEditCooldown(Cdown: number) {
    const res = await service.putEditCooldown(Cdown, 1);
    if (res == 200) {
      setOpen(true);
    }
  }
  return (
    <div className="flex justify-center items-center bg-primary w-screen h-screen bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500">
      <div className="px-5 py-5 bg-[#F5F7F8] shadow-2xl rounded-2xl w-2/3 h-4/5 overflow-y-scroll">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-2xl font-bold">
            เลือกดูข้อมูลรูปภาพ หรือ ข้อมูลผู้ใช้ทั้งหมด
          </h1>
        </div>
        <>
          <div className="">
            <TabContext value={value}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                centered
              >
                <Tab value="1" label="All Picture" />
                <Tab value="2" label="All Users" />
                <Tab value="3" label="Update CoolDown" />
              </Tabs>
              <TabPanel className="h-full" value="1">
                {pics.current.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <CircularProgress color="secondary" />
                  </div>
                ) : (
                  <div className="max-h-[550px] grid grid-cols-4 gap-2 pb-2">
                    {pics.current.map((image, index) => (
                      <div
                        key={index}
                        className="col-span-1 shadow-md rounded-md bg-white pb-1"
                        onClick={() => {
                          navigateToGraph(image.id_img);
                        }}
                      >
                        <div className="overflow-hidden rounded-t-md">
                          <img
                            className="rounded-t-md h-64 w-full object-cover transition duration-300 hover:scale-110"
                            src={image.img}
                            alt={image.name}
                          />
                        </div>

                        <div className="pt-1 px-2 flex flex-col justify-center items-center">
                          <div className="font-semibold text-lg">
                            {image.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabPanel>
              <TabPanel className="h-full" value="2">
                {users.current.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <CircularProgress color="secondary" />
                  </div>
                ) : (
                  <div className="max-h-[550px] grid grid-cols-4 gap-2 pb-2">
                    {users.current.map((user, index) => (
                      <div
                        key={index}
                        className="col-span-1 shadow-md rounded-md bg-white pb-1"
                        onClick={() => {}}
                      >
                        <div className="overflow-hidden rounded-t-md">
                          <img
                            className="rounded-t-md h-64 w-full object-cover transition duration-300 hover:scale-110"
                            src={user.img_avatar}
                            alt={user.username}
                            onClick={() => {
                              navigate(`/profile_user/` + user.id_user);
                              localStorage.setItem(
                                "img_avatar_user",
                                user.img_avatar
                              );
                              localStorage.setItem(
                                "username_user",
                                user.username
                              );
                            }}
                          />
                        </div>

                        <div className="pt-1 px-2 flex flex-col justify-center items-center">
                          <div className="font-semibold text-lg">
                            {user.username}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabPanel>
              <TabPanel className="h-full" value="3">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 30,
                  }}
                >
                  <h2>แก้ไขเวลาคูลดาวน์</h2>
                  <br />
                  <TextField
                    fullWidth
                    style={{ width: 700 }}
                    inputRef={setCooldown}
                    defaultValue={CoolDownvalue}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ fontFamily: "Kanit, sans-serif" }}
                      onClick={() => {
                        bntEditCooldown(+setCooldown.current!.value);
                      }}
                    >
                      บันทึก
                    </Button>
                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>
                        {"ทำการแก้ไข cooldown เรียบร้อย"}
                      </DialogTitle>
                      <DialogActions>
                        <Button onClick={handleClose}>ยืนยัน</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </div>
        </>
      </div>
    </div>
  );
}
export default AllUserPage;
