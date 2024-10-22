import React, { useState, useEffect } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux'
import { slidebar } from '../../../../store/AuthSlice';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaUsersGear } from "react-icons/fa6";
import { MdCorporateFare } from "react-icons/md";
import { MdOutlineRoute } from "react-icons/md";
import { IoIosPerson, IoIosBriefcase, IoIosDocument, IoIosCar, IoIosSettings, IoIosGitBranch } from 'react-icons/io';
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { GrUserManager } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdOnDeviceTraining } from "react-icons/md";
import { BiMailSend } from "react-icons/bi";
import { MdDevices } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdOutlineTextsms } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";

function Sidebar({ pageName }) {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const sidebarToggle = useSelector((state) => state.Auth.sidebarToggle)
    const sidebartype = useSelector((state) => state.Auth.sidebarType)
    const color = useSelector((state) => state.Auth.colourapi)
    const colorhover = useSelector((state) => state.Auth.hovercolourapi)
    console.log(sidebarToggle, "test side")
    const [showIcons, setShowIcons] = useState(sidebarToggle);
    console.log(pageName, "coming submenu")
    useEffect(() => {
        if (pageName) {
            setActiveMenu(pageName);
        }
        else {
            setActiveMenu(null);

        }

    }, [pageName]);

    const dispatch = useDispatch()
    const handleIconClick = () => {

        setShowIcons(!showIcons);
        dispatch(slidebar())
        console.log(showIcons, "now")
        setActiveMenu(null);


    };

    const [activeMenu, setActiveMenu] = useState(null);

    const handleItemClick = (menuItem) => {
        // setActiveMenu(activeMenu === menuItem ? null : menuItem);
        setActiveMenu(menuItem);

        // setShowIcons(!showIcons);
        // dispatch(slidebar())

    };
    console.log(activeMenu)
    const handleBackClick = () => {
        setActiveMenu(null);
        // setShowIcons(!showIcons);
        dispatch(slidebar())
    };

    const menuData = {
        "Master Enum": [

            { name: "ip check", link: "/customer/getall", icon: IoIosPerson },
            { name: "mnc mcc check", link: "/customer/topuplist", icon: FaMoneyBillTrendUp },

            { name: "invoicetype", link: "/masterenum/invoicetypelist", icon: MdCorporateFare },
            { name: " protocol", link: "/customer/customerdeliveryplan", icon: AiOutlineDeliveredProcedure },
            { name: "Route check", link: "/customer/rateprovisioninglist", icon: AiOutlineDeliveredProcedure },
            { name: "Route type", link: "/customer/deliveryprovisioninglist", icon: AiOutlineDeliveredProcedure },
            { name: "senderid check", link: "/customer/routeprovisioninglist", icon: AiOutlineDeliveredProcedure },
            { name: "smstype", link: "/customer/routeprovisioninglist", icon: AiOutlineDeliveredProcedure },
            { name: "status", link: "/customer/routeprovisioninglist", icon: AiOutlineDeliveredProcedure },
            { name: "price check", link: "/customer/routeprovisioninglist", icon: AiOutlineDeliveredProcedure },




        ],
        "NumberingPlan": [
            { name: "country ", link: "/vendor/vendorlist", icon: IoIosPerson },
            { name: " mnc mcc", link: "/vendor/vendorrateplan", icon: MdCorporateFare },

            { name: "mnc mcc prefix", link: "/vendor/vendordeliveryplan", icon: AiOutlineDeliveredProcedure },
            { name: "worldtimezone", link: "/vendor/vendordeliveryplan", icon: AiOutlineDeliveredProcedure },
        ],
        "Currency": [
            { name: "currency ", link: "/smse/smsclist", icon: MdOutlineTextsms },
            { name: "currency conversion ", link: "/smse/deliveryprovisioninglist", icon: MdOutlineTextsms },
            { name: "currency conversion invoicedate ", link: "/smse/rateprovisioninglist", icon: MdOutlineTextsms },





        ],
        "Account": [
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
            { name: "Account", link: "/account/accountsgetall", icon: BiSolidUserAccount },
            { name: "Customer", link: "/account/customersgetall", icon: BiSolidUserAccount },

            { name: "Company", link: "/account/companygetall", icon: BiSolidUserAccount },
            { name: "Sms Service Provide", link: "/account/smsserviceprovidegetall", icon: BiSolidUserAccount },



            

        ],
        "SenderId Management": [
            { name: "senderid account", link: "/senderid/senderidaccountgetall", icon: IoIosBriefcase },
            { name: "senderid customer", link: "/senderid/senderidcustomerlist", icon: IoIosDocument },
            { name: "senderid shared", link: "/senderid/senderidsharedlist", icon: IoIosCar },



        ],
        "Vendor Management": [
            { name: "Carrier", link: "/Vendor/carriergetall", icon: IoIosBriefcase },
            { name: "Smsc", link: "/Vendor/smscgetall", icon: IoIosBriefcase },
            { name: "Data Center", link: "/Vendor/datacentergetall", icon: IoIosBriefcase },
            { name: "Kannel Host", link: "/Vendor/kannelhostgetall", icon: IoIosBriefcase },
            { name: "Dc Smscid", link: "/Vendor/dcsmscidgetall", icon: IoIosBriefcase },

            
            

        ],
        "Cost Management": [
            { name: "Cost Carrier", link: "/cost/costcarriergetall", icon: IoIosBriefcase },

            { name: "Cost Carrier Mnc Mcc", link: "/cost/costcarriermncmccgetall", icon: IoIosBriefcase },
            { name: "Cost Smsc", link: "/cost/costsmscgetall", icon: IoIosBriefcase },
            { name: "cost smsc mnc mcc", link: "/cost/costsmscmncmccgetall", icon: IoIosBriefcase },



        ],
        "Price Management": [
            { name: "Price Account", link: "/price/priceaccountgetall", icon: IoIosBriefcase },
            { name: "Price Account Mnc Mcc", link: "/price/priceaccountmncmccgetall", icon: IoIosBriefcase },

            { name: "Price Customer", link: "/price/pricecustomergetall", icon: IoIosBriefcase },
            { name: "Price Customer Mnc Mcc ", link: "/price/pricecustomermncmccgetall", icon: IoIosBriefcase },

            { name: "Price Shared", link: "/price/pricesharedgetall", icon: IoIosBriefcase },
            { name: "Price Shared Mnc Mcc", link: "/price/pricesharedmncmccgetall", icon: IoIosBriefcase },

            
            
            
        ],

        "Error Code Management": [
            { name: "Error Code platform ", link: "/errorcode/errorcodeplatformgetall", icon: IoIosBriefcase },
            { name: "Error Code carrier ", link: "/errorcode/errorcodecarriergetall", icon: IoIosBriefcase },
            { name: "Error Code Account", link: "/errorcode/errorcodeaccountgetall", icon: IoIosBriefcase },
            { name: "Error Code Customer ", link: "/errorcode/errorcodecustomergetall", icon: IoIosBriefcase },
            { name: "Error Code Sms Service  ", link: "/errorcode/errorcodesmsserviceprovidergetall", icon: IoIosBriefcase },
        ],

        "Route Management": [
            { name: "Route ", link: "/route/routegetall", icon: IoIosBriefcase },

            { name: "Route Account ", link: "/route/routeaccountgetall", icon: IoIosBriefcase },
            { name: "Route Account Mnc Mcc ", link: "/route/routeaccountmncmccgetall", icon: IoIosBriefcase },

            { name: "Route Customer ", link: "/route/routecustomergetall", icon: IoIosBriefcase },
            { name: "Route Customer Mnc Mcc ", link: "/route/routecustomermncmccgetall", icon: IoIosBriefcase },

            { name: "Route Shared ", link: "/route/routesharedgetall", icon: IoIosBriefcase },

            { name: "Route Shared Mnc Mcc ", link: "/route/routesharedmncmccgetall", icon: IoIosBriefcase },

            
        ],

        "Webhook Management": [

            { name: "Webhook Account ", link: "/webhook/webhookaccountgetall", icon: IoIosBriefcase },
            { name: "Webhook Customer ", link: "/webhook/webhookcustomergetall", icon: IoIosBriefcase },

            { name: "Webhook Parameter Index ", link: "/webhook/webhookparameterindexgetall", icon: IoIosBriefcase },

            
        ],
        




        

        "Ip Management": [
            { name: "ip account", link: "/ip/ipaccountgetall", icon: IoIosBriefcase },
            { name: "ip customer", link: "/ip/ipcustomergetall", icon: IoIosDocument },
            { name: "ip shared", link: "/ip/ipsharedgetall", icon: IoIosCar },



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
    };
    console.log(activeMenu, "active menu_____________")

    return (
        <>
            {sidebartype === 'right' ? (
                <div className={`hidden md:flex absolute cursor-pointer text-white top-[6vh] right-[2vw] ${showIcons ? 'show-icons' : ''}`}>
                    <FaBars onClick={handleIconClick} />
                </div>
            ) : (
                <div className={`hidden md:flex absolute cursor-pointer text-white top-[6vh] left-[15vw] ${showIcons ? 'show-icons' : ''}`}>
                    <FaBars onClick={handleIconClick} />
                </div>
            )}
            {/* <div className='hid'>

            </div> */}

            {/* <div className={` md:flex w-[22%] h-auto  justify-center   container bg-[#6592C7] bg-opacity-35  border-t-2 border-white  ${showIcons ? ' w-[22%]' : 'w-[5%]'}`} > */}
            <div className={`hidden md:flex w-[22%]  h-auto min-h-screen justify-center container  bg-opacity-35 border-t-2 border-white transform transition-all duration-300 bg-admin-color1  ${showIcons || activeMenu ? 'w-[22%]' : 'w-[5%]'}`} >

                {activeMenu ? (
                    <div className=" text-white  w-full px-4  ">
                        <div className="gap-2 flex p-2 items-center bg-admin-color2  mt-6 mb-2  rounded-md cursor-pointer " onClick={handleBackClick} >
                            <IoIosArrowBack /> {activeMenu}
                        </div>
                        <div className=''>
                            {menuData[activeMenu].map((submenuItem, index) => (
                                <div key={index} className="p-2 mb-2 bg-admin-color2 rounded-md  transform transition-transform duration-200 hover:scale-110 cursor-pointer" onClick={() => handleMenuItemClick(submenuItem.link)} >
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

                                    <div className='flex items-center cursor-pointer p-2 gap-2 mb-4 bg-admin-color2 rounded-md transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Account Management")} >
                                        <FaUsersGear />
                                        {showIcons && (
                                            <span className='flex items-center'>
                                                <span>Account  Management</span>
                                                <IoIosArrowForward />
                                            </span>
                                        )}
                                    </div>








                                    <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("SenderId Management")} >
                                        <MdOutlineRoute />
                                        {showIcons && (
                                            <span className='flex items-center'>
                                                <span>SenderId Management</span>
                                                <IoIosArrowForward />
                                            </span>
                                        )}
                                    </div>


                                    <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Vendor Management")} >
                                        <MdOutlineRoute />
                                        {showIcons && (
                                            <span className='flex items-center'>
                                                <span>Vendor Management</span>
                                                <IoIosArrowForward />
                                            </span>
                                        )}
                                    </div>



                                    <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Ip Management")} >
                                        <MdOutlineRoute />

                                        {showIcons && (
                                            <span className='flex items-center'>
                                                <span>Ip Management</span>
                                                <IoIosArrowForward />
                                            </span>

                                        )}


                                    </div>
                                    <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Cost Management")} >
                                        <MdOutlineRoute />
                                        {showIcons && (
                                            <span className='flex items-center'>
                                                <span>
                                                     Cost Management
                                                </span>
                                                <IoIosArrowForward />
                                            </span>

                                        )}
                                        </div>
                                        <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Price Management")} >
                                        <MdOutlineRoute />
                                        {showIcons && (
                                            <span className='flex items-center'>
                                                <span>
                                                     Price Management
                                                </span>
                                                <IoIosArrowForward />
                                            </span>

                                        )}
                                        </div>
                                        <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Error Code Management")} >
                                        <MdOutlineRoute />
                                        {showIcons && (
                                            <span className='flex items-center'>
                                                <span>
                                                Error Code Management
                                                </span>
                                                <IoIosArrowForward />
                                            </span>

                                        )}
                                        </div>

                                        <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Route Management")} >
                                        <MdOutlineRoute />
                                        {showIcons && (
                                            <span className='flex items-center'>
                                                <span>
                                                Route Management
                                                </span>
                                                <IoIosArrowForward />
                                            </span>

                                        )}
                                        </div>
                                        <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Webhook Management")} >
                                        <MdOutlineRoute />
                                        {showIcons && (
                                            <span className='flex items-center'>
                                                <span>
                                                Webhook Management
                                                </span>
                                                <IoIosArrowForward />
                                            </span>

                                        )}
                                        </div>
                                  
                                       


                                </div>
                            </div>

                        </nav>)}


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
            <div className={toggle ? "fixed md:hidden top-0 left-0 w-[300px] h-screen bg-[#6592C7] bg-opacity-95 z-10 duration-300" : "fixed md:hidden top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"} style={{ backgroundColor: color }}>
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
                            <div className="gap-2 flex p-2 items-center  mt-6 mb-2  rounded-md " onClick={handleBackClick} style={{ backgroundColor: colorhover }}>
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

export default Sidebar
