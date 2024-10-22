import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom';
import { FaUsersGear } from "react-icons/fa6";
import { MdCorporateFare } from "react-icons/md";
import { IoIosPerson, IoIosBriefcase, IoIosDocument, IoIosCar, IoIosSettings, IoIosGitBranch, IoIosArrowDown } from 'react-icons/io';
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdOnDeviceTraining } from "react-icons/md";
import { BiMailSend } from "react-icons/bi";
import { MdDevices } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdOutlineTextsms } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineRoute } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";


function SidebarTop({ pageName }) {
    const color = useSelector((state) => state.Auth.colourapi)

    const colorhover = useSelector((state) => state.Auth.hovercolourapi)



    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const sidebarToggle = useSelector((state) => state.Auth.sidebarToggle)
    console.log(sidebarToggle, "test side")
    console.log(pageName, "coming submenu")
    // useEffect(() => {
    //     if (pageName) {
    //         setsubActiveMenu(pageName);
    //     }
    //     else {
    //         setsubActiveMenu(null);

    //     }

    // }, [pageName]);

    // const dispatch = useDispatch()
    // const handleIconClick = () => {
    //     setActiveMenu(null);

    //     setShowIcons(!showIcons);
    //     dispatch(slidebar())
    //     console.log(showIcons, "now")
    //     // setActiveMenu(null)

    // };

    const [activeMenu, setActiveMenu] = useState(null);
    // const [activesubMenu, setsubActiveMenu] = useState(null);


    const handleItemClick = (menuItem) => {
        setActiveMenu(activeMenu === menuItem ? null : menuItem);
        // setShowIcons(!showIcons);
        // dispatch(slidebar())

    };


    const handleBackClick = () => {
        setActiveMenu(null);
        // setShowIcons(!showIcons);
    };

    const menuData = {
        "Customer Management": [

            { name: "Customer", link: "/customer/getall", icon: IoIosPerson },
            { name: "TopUp", link: "/customer/topuplist", icon: FaMoneyBillTrendUp },

            { name: "Customer Rateplan", link: "/customer/customerrateplan", icon: MdCorporateFare },
            { name: " Customer Delivery  Plan", link: "/customer/customerdeliveryplan", icon: AiOutlineDeliveredProcedure },
            { name: " Rate Provisioning", link: "/customer/rateprovisioninglist", icon: AiOutlineDeliveredProcedure },
            { name: "Delivery provisioning", link: "/customer/deliveryprovisioninglist", icon: AiOutlineDeliveredProcedure },
            { name: "Route Provisioning", link: "/customer/routeprovisioninglist", icon: AiOutlineDeliveredProcedure },




        ],
        "Vendor Management": [
            { name: "Vendor", link: "/vendor/vendorlist", icon: IoIosPerson },
            { name: "Vendor Rateplan", link: "/vendor/vendorrateplan", icon: MdCorporateFare },
            { name: "Vendor Delivery  Plan", link: "/vendor/vendordeliveryplan", icon: AiOutlineDeliveredProcedure },
        ],
        "Smsc Management": [
            { name: "Smsc ", link: "/smse/smsclist", icon: MdOutlineTextsms },
            { name: "Delivery  Provisioning ", link: "/smse/deliveryprovisioninglist", icon: MdOutlineTextsms },
            { name: "Rate  Provisioning ", link: "/smse/rateprovisioninglist", icon: MdOutlineTextsms },
            { name: " Smstype Provisioning  ", link: "/smse/provisioningsmstypelist", icon: MdOutlineTextsms },





        ],
        "Manager Management": [
            { name: "Manager", link: "/manager/userlist", icon: FaUsers },

        ],

        "Whitelist Management": [
            { name: "Sender id", link: "/whitelist/senderidlist", icon: BiMailSend },
            { name: "Ip", link: "/whitelist/iplist", icon: IoIosGitBranch },
            { name: "Device", link: "/whitelist/devicelist", icon: MdDevices },


        ],

        "Settings": [
            { name: "SMTP Manager", link: "/vendors", icon: IoIosSettings },
            { name: "Entity", link: "/vendor-orders", icon: IoIosDocument },
        ],
        "Account Management": [
            { name: "Account", link: "/accounts/accountlist", icon: BiSolidUserAccount },
            { name: "Delivery Provisioning ", link: "/accounts/provisioningdeliverylist", icon: BiSolidUserAccount },
            { name: "Rate Provisioning ", link: "/accounts/provisioningratelist", icon: BiSolidUserAccount },
            { name: "Route Provisioning ", link: "/accounts/routeprovisioninglist ", icon: IoIosSettings },
            { name: "Delivery Plan ", link: "/accounts/deliveryplanlist ", icon: IoIosSettings },
            { name: "Rate Plan ", link: "/accounts/rateplanlist ", icon: IoIosSettings },





        ],
        "Route Management": [
            { name: "Route Group", link: "/route/routegrouplist", icon: IoIosBriefcase },
            { name: "Custom Route LCR", link: "/route/lcrroutelist", icon: IoIosDocument },
            { name: "Automate LCR Route", link: "/route/automatelcrroutelist", icon: IoIosCar },
            { name: "Exclude LCR", link: "/route/excludelcrlist", icon: IoIosSettings },
            { name: "Routeplan", link: "/route/routeplanlist", icon: FaMoneyCheckAlt },


        ],
        "Server Management": [
            { name: "Datacenter", link: "/server/datacenterList", icon: IoIosBriefcase },
            { name: "IP ", link: "/server/iplist", icon: IoIosDocument },
            { name: "PORT  ", link: "/server/portlist", icon: IoIosCar },
            // { name: "TLVTAG ", link: "/gateway/tlgvlist", icon: IoIosSettings },
            // { name: "Kannel", link: "/route/routeplanlist", icon: FaMoneyCheckAlt },


        ],
        "Processor Management": [

            { name: "TLVTAG ", link: "/processor/tlgvlist", icon: IoIosSettings },
            { name: "Kannel", link: "/processor/kannellist", icon: FaMoneyCheckAlt },
            { name: "Mysql Billing DB ", link: "/processor/mysqlbillingdblist", icon: IoIosSettings },
            // { name: "Mysql concate DB ", link: "/processor/mysqlconcatedblist", icon: IoIosSettings },
            { name: "MysqlQueueDB ", link: "/processor/mysqlqueuedblist", icon: FaMoneyCheckAlt },
            { name: "RedisQueueDB ", link: "/processor/redisqueuedblist", icon: IoIosSettings },
            // { name: "Queue DB to Redis ", link: "/processor/queuedbtoredislist", icon: IoIosSettings },
            { name: "Request Receiver", link: "/processor/requestreceiverlist", icon: IoIosSettings },
            { name: "Request Processor", link: "/processor/requestprocessorlist", icon: IoIosSettings },
            // { name: "Smpp Interface ", link: "/processor/smppinterfacelist", icon: IoIosBriefcase },
            // { name: "Smpp LoadBalancer ", link: "/processor/smpploadbalancerlist", icon: IoIosBriefcase },


            { name: "Loadbalancer ", link: "/processor/httpLoadbalancerlist", icon: FaMoneyCheckAlt },
            // { name: "Queuedbloadbalancer ", link: "/processor/queuedbloadbalancerlist", icon: FaMoneyCheckAlt },
            // { name: "Concate Receiver ", link: "/processor/concatereceiverlist", icon: FaMoneyCheckAlt },
            { name: "Billing Log ", link: "/processor/billingloglist", icon: FaMoneyCheckAlt },









        ],
    };


    const handleMenuItemClick = (link) => {
        navigate(link);
        setActiveMenu(null)
        // setToggle(!toggle)
        setToggle(!toggle)

    };
    console.log(activeMenu, "active menu_____________")
    const [hoveredIndex, setHoveredIndex] = useState(null);


    return (
        <>
            {/* <div className={`hidden md:flex absolute cursor-pointer text-white top-[6vh] left-[15vw] ${showIcons ? 'show-icons' : ''}`}>
                <FaBars onClick={handleIconClick} />
            </div> */}


            {/* <div className=" hidden md:flex w-full px-4 h-auto justify-start gap-3  bg-[#dd6600] bg-opacity-35 border-t-2 border-white transition-all duration-200 ease-in-out  "  style={{ backgroundColor: color }}> */}
            <div className=" hidden md:flex w-full px-4 h-auto justify-start gap-3   bg-opacity-35 border-t-2 border-white transition-all duration-200 ease-in-out  bg-admin-color1"  >


                {/* <div className={`hidden md:flex w-full px-4 h-auto justify-start gap-3 ${bgClass} bg-opacity-35 border-t-2 border-white transition-all duration-200 ease-in-out`}> */}



                <nav className=' '>


                    <div className='flex justify-start gap-9 px-4  items-center  mb-5 '>

                    </div>
                    <div className='flex justify-center  '>

                        <div className='text-white flex items-center gap-4 text-[17px]'>





                            <div className='relative'>




                                <div className='flex items-center text-sm p-2 gap-2 mb-4  rounded-md transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Customer Management")} style={{ backgroundColor: color }}>
                                    <FaUsersGear />

                                    <span className='flex items-center'>
                                        <span>Customer Management</span>
                                        <IoIosArrowDown />
                                    </span>


                                </div>
                                {activeMenu === "Customer Management" && (
                                    <div className=" absolute z-50 top-10 w-[100%] text-sm cursor-pointer transform transition-transform duration-200 p-2 gap-2 mb-4  rounded-md " style={{ backgroundColor: color }}>
                                        {menuData[activeMenu].map((item, index) => (
                                            <p key={index} className="flex items-center p-2 text-sm gap-2   rounded-md " onClick={() => handleMenuItemClick(item.link)} style={{ backgroundColor: hoveredIndex === index ? colorhover : 'initial' }}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}>
                                                <item.icon />
                                                <span>{item.name}</span>

                                            </p>
                                        ))}
                                    </div>
                                )}

                            </div>




                            <div className='relative'>



                                <div className='flex items-center text-sm cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Account Management")} style={{ backgroundColor: color }}>
                                    <MdOnDeviceTraining />

                                    <span className='flex items-center'>
                                        <span>Account Management</span>
                                        <IoIosArrowDown />
                                    </span>

                                </div>
                                {activeMenu === "Account Management" && (
                                    <div className=" absolute z-50 top-10 w-[100%] text-sm cursor-pointer  p-2 gap-2 mb-4  rounded-md " style={{ backgroundColor: color }}>
                                        {menuData[activeMenu].map((item, index) => (
                                            <p key={index} className="flex items-center p-2 text-sm gap-2 rounded-md  " onClick={() => handleMenuItemClick(item.link)} style={{ backgroundColor: hoveredIndex === index ? colorhover : 'initial' }}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}>
                                                <item.icon />
                                                <span className=''>{item.name}</span>
                                            </p>
                                        ))}
                                    </div>
                                )}


                            </div>



                            <div className='relative'>



                                <div
                                    className='flex items-center text-sm cursor-pointer p-2 gap-2 mb-4  rounded-md transform transition-transform duration-200 hover:scale-110' style={{ backgroundColor: color }}
                                    onClick={() => handleItemClick("Vendor Management")}
                                >
                                    <FaUsersGear />

                                    <span className='flex items-center'>
                                        <span>Vendor Management</span>
                                        <IoIosArrowDown />
                                    </span>

                                </div>


                                {activeMenu === "Vendor Management" && (
                                    <div className="absolute z-50 top-10 text-sm w-[100%] cursor-pointer transform transition-transform duration-200 p-2 gap-2 mb-4 rounded-md" style={{ backgroundColor: color }}>
                                        {menuData[activeMenu].map((item, index) => (
                                            <p
                                                key={index}
                                                onClick={() => handleMenuItemClick(item.link)}
                                                className="flex items-center p-2 text-sm gap-2 rounded-md "
                                                style={{ backgroundColor: hoveredIndex === index ? colorhover : 'initial' }}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                            >
                                                <item.icon />
                                                <span>{item.name}</span>
                                            </p>
                                        ))}
                                    </div>

                                )}
                            </div>



                            <div className='relative'>



                                <div className='flex items-center text-sm cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Smsc Management")} style={{ backgroundColor: color }}>
                                    <MdOnDeviceTraining />

                                    <span className='flex items-center'>
                                        <span>Smsc Management</span>
                                        <IoIosArrowDown />
                                    </span>

                                </div>
                                {activeMenu === "Smsc Management" && (
                                    <div className=" absolute z-50 top-10 w-[100%] text-sm cursor-pointer  p-2 gap-2 mb-4  rounded-md " style={{ backgroundColor: color }}>
                                        {menuData[activeMenu].map((item, index) => (
                                            <p key={index} className="flex items-center p-2 text-sm gap-2 rounded-md  " onClick={() => handleMenuItemClick(item.link)} style={{ backgroundColor: hoveredIndex === index ? colorhover : 'initial' }}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}>
                                                <item.icon />
                                                <span className=''>{item.name}</span>
                                            </p>
                                        ))}
                                    </div>
                                )}


                            </div>


                            <div className='relative'>



                                <div className='flex items-center text-sm cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Route Management")} style={{ backgroundColor: color }}>
                                    <MdOnDeviceTraining />

                                    <span className='flex items-center'>
                                        <span>Route Management</span>
                                        <IoIosArrowDown />
                                    </span>

                                </div>
                                {activeMenu === "Route Management" && (
                                    <div className=" absolute z-50 top-10 w-[100%] text-sm cursor-pointer  p-2 gap-2 mb-4  rounded-md " style={{ backgroundColor: color }}>
                                        {menuData[activeMenu].map((item, index) => (
                                            <p key={index} className="flex items-center p-2 text-sm gap-2 rounded-md  " onClick={() => handleMenuItemClick(item.link)} style={{ backgroundColor: hoveredIndex === index ? colorhover : 'initial' }}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}>
                                                <item.icon />
                                                <span className=''>{item.name}</span>
                                            </p>
                                        ))}
                                    </div>
                                )}


                            </div>



                            <div className='relative'>
                                <div className='flex items-center text-sm cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Manager Management")} style={{ backgroundColor: color }}>
                                    <MdOnDeviceTraining />
                                    <span className='flex items-center'>
                                        <span>Manager Management</span>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                {activeMenu === "Manager Management" && (
                                    <div className=" absolute z-50 top-10 w-[100%] text-sm cursor-pointer  p-2 gap-2 mb-4  rounded-md " style={{ backgroundColor: color }}>
                                        {menuData[activeMenu].map((item, index) => (
                                            <p key={index} className="flex items-center p-2 text-sm gap-2 rounded-md  " onClick={() => handleMenuItemClick(item.link)} style={{ backgroundColor: hoveredIndex === index ? colorhover : 'initial' }}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}>
                                                <item.icon />
                                                <span className=''>{item.name}</span>
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>


                            <div className='relative'>
                                <div className='flex items-center text-sm cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Whitelist Management")} style={{ backgroundColor: color }}>
                                    <MdOnDeviceTraining />
                                    <span className='flex items-center'>
                                        <span>Whitelist Management</span>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                {activeMenu === "Whitelist Management" && (
                                    <div className=" absolute z-50 top-10 w-[100%] text-sm cursor-pointer  p-2 gap-2 mb-4  rounded-md " style={{ backgroundColor: color }}>
                                        {menuData[activeMenu].map((item, index) => (
                                            <p key={index} className="flex items-center p-2 text-sm gap-2 rounded-md  " onClick={() => handleMenuItemClick(item.link)} style={{ backgroundColor: hoveredIndex === index ? colorhover : 'initial' }}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}>
                                                <item.icon />
                                                <span className=''>{item.name}</span>
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>






                        </div>
                    </div>

                </nav>



            </div>
            <div className="md:hidden absolute top-0 right-0 z-10 ">
                <button
                    className="w-14 h-14 relative focus:outline-none  rounded"
                    onClick={() => setToggle(!toggle)}
                >
                    <div className="block w-5 absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span
                            className={`block absolute h-0.5 w-7  bg-current transform transition duration-500 ease-in-out ${toggle ? "rotate-45 text-white " : " -translate-y-1.5 bg-white bg-opacity-95"
                                }`}
                        ></span>
                        <span
                            className={`block absolute h-0.5 w-7 bg-white  bg-opacity-95e bg-current transform transition duration-500 ease-in-out ${toggle ? "opacity-0" : ""
                                }`}
                        ></span>
                        <span
                            className={`block absolute h-0.5 w-7 bg-current transform transition duration-500 ease-in-out ${toggle ? "-rotate-45 text-white " : "translate-y-1.5 bg-white  bg-opacity-95"
                                }`}
                        ></span>
                    </div>
                </button>
            </div>
            <div className={ toggle  ? "fixed md:hidden top-0 left-0 w-[300px] h-screen bg-[#6592C7] bg-opacity-95 z-10 duration-300" : "fixed md:hidden top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"}style={{ backgroundColor: color }}>
                <button className="w-14 h-14 relative focus:outline-none  rounded" onClick={() => setToggle(!toggle)} >
                    <div className="block w-5 absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span
                            className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-500 ease-in-out ${toggle ? "rotate-45" : " -translate-y-1.5"
                                }`}
                        ></span>
                        <span
                            className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-500 ease-in-out ${toggle ? "opacity-0" : ""
                                }`}
                        ></span>
                        <span
                            className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-500 ease-in-out ${toggle ? "-rotate-45" : "translate-y-1.5"
                                }`}
                        ></span>
                    </div>
                </button>
                <nav>
                {activeMenu ? (
                    <div className=" text-white  w-full px-4  ">
                        <div className="gap-2 flex p-2 items-center  mt-6 mb-2  rounded-md "   onClick={handleBackClick} style={{ backgroundColor: colorhover }}>
                        <IoIosArrowBack /> {activeMenu}
                        </div>
                        <div className=''>
                            {menuData[activeMenu].map((submenuItem, index) => (
                                <div key={index} className="p-2 mb-2 bg-[#6592C7] rounded-md  transform transition-transform duration-200 hover:scale-110" onClick={() => handleMenuItemClick(submenuItem.link)} style={{ backgroundColor: colorhover }}>
                                    <span className='flex justify-start items-center pl-5'>
                                        {React.createElement(submenuItem.icon, { className: 'mr-2' })}
                                        {submenuItem.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    )
                        : (

                            <nav>


                            <div className='flex justify-center items-center mt-4 mb-5 '>
                                {/* <h1 className='text-white font-poppins text-[14px]'>Menu</h1> */}
                            </div>
                            <div className='flex justify-center  '>

                                <div className='text-white text-[17px]'>
                                    {/* <div className='flex items-center cursor-pointer p-2 gap-2 mb-4 bg-[#6592C7]  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => navigate('/dashboard/dashboard')} style={{ backgroundColor: colorhover }}> 
                                        <MdDashboard />

                                       
                                            <span className='flex items-center '>
                                                <span>DashBoard</span>
                                                <IoIosArrowForward />
                                            </span>

                                      


                                       


                                    </div> */}
                                    <div className='flex items-center cursor-pointer p-2 gap-2 mb-4 bg-[#6592C7] rounded-md transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Customer Management")} style={{ backgroundColor: colorhover }}>
                                        <FaUsersGear />
                                        
                                            <span className='flex items-center'>
                                                <span>Customer Management</span>
                                                <IoIosArrowForward />
                                            </span>
                                       
                                    </div>

                                    <div className='flex items-center cursor-pointer p-2 gap-2 mb-4 bg-[#6592C7] rounded-md transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Account Management")} style={{ backgroundColor: colorhover }}>
                                        <MdManageAccounts />
                                      
                                            <span className='flex items-center'>
                                                <span>Account Management</span>
                                                <IoIosArrowForward />
                                            </span>
                                        
                                    </div>


                                    <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 rounded-md bg-[#6592C7] transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Vendor Management")} style={{ backgroundColor: colorhover }}>
                                        <FaUsersGear />
                                      

                                            <span className='flex items-center'>
                                                <span>Vendor Management</span>
                                                <IoIosArrowForward />
                                            </span>
                                       


                                    </div>
                                    <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-[#6592C7]  rounded-md transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Smsc Management")} style={{ backgroundColor: colorhover }}>
                                        <MdOutlineTextsms />
                                       
                                            <span className='flex items-center'>
                                                <span>SMSC Management</span>
                                                <IoIosArrowForward />
                                            </span>

                                        


                                    </div>
                                    <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-[#6592C7]  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Route Management")} style={{ backgroundColor: colorhover }}>
                                        <MdOutlineRoute />

                                        
                                            <span className='flex items-center'>
                                                <span>Route Management</span>
                                                <IoIosArrowForward />
                                            </span>

                                      

                                       
                                    </div>

                                    <div className='flex items-center p-2 gap-2 mb-4 bg-[#6592C7]  rounded-md transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Manager Management")} style={{ backgroundColor: colorhover }}>
                                        <GrUserManager /> 
                                       
                                            <span className='flex items-center'>
                                                <span>Manager Management</span>
                                                <IoIosArrowForward />
                                            </span>

                                       
                                        
                                        
                                        
                                       



                                    </div>


                                    <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-[#6592C7]  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Whitelist Management")} style={{ backgroundColor: colorhover }}>
                                        <MdOnDeviceTraining />

                                        
                                            <span className='flex items-center'>
                                                <span>Whitelist Management</span>
                                                <IoIosArrowForward />
                                            </span>

                                      
                                        


                                        

                                    </div>
                                    {/* <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-[#6592C7]  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Server Management")}>
                                        <MdOnDeviceTraining />
                                        {showIcons && (
                                            <span className='flex items-center'>
                                                <span>Server Management</span>
                                                <IoIosArrowForward />
                                            </span>

                                        )}


                                     

                                    </div>
                                    <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-[#6592C7]  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Processor Management")}>
                                        <MdOnDeviceTraining />
                                        {showIcons && (
                                            <span className='flex items-center'>
                                                <span> Processor Management</span>
                                                <IoIosArrowForward />
                                            </span>

                                        )}



                                       

                                    </div>


                                    <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-[#6592C7]  rounded-md transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Settings")}>
                                        <IoSettingsOutline />
                                        {showIcons && (
                                            <span className='flex items-center'>
                                                <span> Settings</span>
                                                <IoIosArrowForward />
                                            </span>

                                        )}


                                       

                                    </div> */}




                                </div>
                            </div>

                        </nav>)}
                </nav>
            </div>

        </>

    )
}

export default SidebarTop
