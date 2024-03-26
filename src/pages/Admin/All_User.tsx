import { Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import React, { useEffect, useRef, useState } from "react";
import { GetImageRespone } from "../../model/getImageRespone";
import { memeMashService } from "../../service";
import { useNavigate } from "react-router-dom";

const adminData = [
    { username: 'ชินโนะสุเกะ', img: 'https://i.pinimg.com/564x/ab/db/38/abdb38ce0cfa76701a17e6b8afc5b437.jpg' },
];



function AllUserPage() {
    const navigate = useNavigate();
    const [value, setValue] = useState("1");
    const service = new memeMashService();
    const pics = useRef<GetImageRespone[]>([]);
    const handleChange = (_event: any, newValue: React.SetStateAction<string>) => {
        setValue(newValue);
    };
    useEffect(() => {
        const loadDataAsync = async () => {
          if (localStorage.getItem("username") == "") {
            localStorage.setItem("username", "บุคคลนิรนาม")
          }
          const res = await service.getReqImage();
          pics.current = res;
          console.log(pics.current);
          
          // console.log(pics.current);
          
        };
        loadDataAsync();
      }, []);
      function navigateToGraph(id_img: number) {
        navigate(`/graph/${id_img}`);
      }
    return (
        <div className="flex justify-center items-center bg-primary w-screen h-screen bg-gradient-to-r from-purple-300 via-purple-500 to-indigo-500">
            <div className="px-5 py-5 bg-[#F5F7F8] shadow-2xl rounded-2xl w-2/3 h-4/5 overflow-y-scroll">
                <div className="w-fit p-3 rounded-md flex justify-start items-center gap-4 shadow-md shadow-slate-300">
                    <div className="flex justify-center items-center gap-12">
                        <img
                            src={adminData[0].img} 
                            className="h-16 w-16 object-cover rounded-full"
                            alt={adminData[0].username}
                        />
                        <div>
                            <div className="text-3xl font-medium text-start">
                                {adminData[0].username} {/* แสดงชื่อของผู้ดูแลระบบ */}
                            </div>
                            <div className="text-base font-medium text-start">
                                Type : Admin 
                            </div>
                        </div>
                    </div>
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
                                <Tab value="1" label="Show all users" />
                            </Tabs>
                            <TabPanel className="h-full" value="1">
                                <div className="max-h-[550px] grid grid-cols-4 gap-2 pb-2">
                                    {pics.current.map((image, index) => (
                                        <div key={index} className="col-span-1 shadow-md rounded-md bg-white pb-1" onClick={()=>{
                                            navigateToGraph(image.id_img);
                                        }}>
                                            <div className="overflow-hidden rounded-t-md"
                                                    
                                            >
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
                            </TabPanel>
                        </TabContext>
                    </div>
                </>
            </div>
        </div>
    );
}
export default AllUserPage;

