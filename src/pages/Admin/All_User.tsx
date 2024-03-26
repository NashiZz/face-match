import { Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import React, { useState } from "react";

const adminData = [
    { username: 'ชินโนะสุเกะ', img: 'https://i.pinimg.com/564x/ab/db/38/abdb38ce0cfa76701a17e6b8afc5b437.jpg' },
];

const userData = [
    { username: 'น้องม่ายรู้วว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'แฮนด์ซั่มม', img: 'https://i.pinimg.com/564x/4d/93/de/4d93de6f4331acf998113a1c51547456.jpg' },
    { username: 'ชิสสชู่ววว', img: 'https://i.pinimg.com/564x/b6/dc/3b/b6dc3b10d6333e6efa7834f583d639a5.jpg' },
    { username: 'ปรีชา', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หน้าเดินน', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หันหลัง', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'สไปเดอร์', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'ความมืดในแสงแดด', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'พระจันทร์และดวงดาว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'เทพอักคี', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'น้องม่ายรู้วว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'แฮนด์ซั่มม', img: 'https://i.pinimg.com/564x/4d/93/de/4d93de6f4331acf998113a1c51547456.jpg' },
    { username: 'ชิสสชู่ววว', img: 'https://i.pinimg.com/564x/b6/dc/3b/b6dc3b10d6333e6efa7834f583d639a5.jpg' },
    { username: 'ปรีชา', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หน้าเดินน', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หันหลัง', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'สไปเดอร์', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'ความมืดในแสงแดด', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'พระจันทร์และดวงดาว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'เทพอักคี', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'น้องม่ายรู้วว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'แฮนด์ซั่มม', img: 'https://i.pinimg.com/564x/4d/93/de/4d93de6f4331acf998113a1c51547456.jpg' },
    { username: 'ชิสสชู่ววว', img: 'https://i.pinimg.com/564x/b6/dc/3b/b6dc3b10d6333e6efa7834f583d639a5.jpg' },
    { username: 'ปรีชา', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หน้าเดินน', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หันหลัง', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'สไปเดอร์', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'ความมืดในแสงแดด', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'พระจันทร์และดวงดาว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'เทพอักคี', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'น้องม่ายรู้วว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'แฮนด์ซั่มม', img: 'https://i.pinimg.com/564x/4d/93/de/4d93de6f4331acf998113a1c51547456.jpg' },
    { username: 'ชิสสชู่ววว', img: 'https://i.pinimg.com/564x/b6/dc/3b/b6dc3b10d6333e6efa7834f583d639a5.jpg' },
    { username: 'ปรีชา', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หน้าเดินน', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หันหลัง', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'สไปเดอร์', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'ความมืดในแสงแดด', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'พระจันทร์และดวงดาว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'เทพอักคี', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'น้องม่ายรู้วว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'แฮนด์ซั่มม', img: 'https://i.pinimg.com/564x/4d/93/de/4d93de6f4331acf998113a1c51547456.jpg' },
    { username: 'ชิสสชู่ววว', img: 'https://i.pinimg.com/564x/b6/dc/3b/b6dc3b10d6333e6efa7834f583d639a5.jpg' },
    { username: 'ปรีชา', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หน้าเดินน', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'หันหลัง', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'สไปเดอร์', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'ความมืดในแสงแดด', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'พระจันทร์และดวงดาว', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },
    { username: 'เทพอักคี', img: 'https://i.pinimg.com/564x/23/ce/56/23ce56a43d2aefdb1ae3aad23fb3e089.jpg' },

];

function AllUserPage() {
    const [value, setValue] = useState("1");

    const handleChange = (_event: any, newValue: React.SetStateAction<string>) => {
        setValue(newValue);
    };

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
                                    {userData.map((user, index) => (
                                        <div key={index} className="col-span-1 shadow-md rounded-md bg-white pb-1">
                                            <div className="overflow-hidden rounded-t-md">
                                                <img
                                                    className="rounded-t-md h-64 w-full object-cover transition duration-300 hover:scale-110"
                                                    src={user.img}
                                                    alt={user.username}
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
                            </TabPanel>
                        </TabContext>
                    </div>
                </>
            </div>
        </div>
    );
}
export default AllUserPage;

