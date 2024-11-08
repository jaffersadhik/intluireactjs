import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaUsersGear } from "react-icons/fa6";
import { MdCorporateFare } from "react-icons/md";
import { IoIosPerson, IoIosBriefcase, IoIosDocument, IoIosCar, IoIosGitBranch, IoIosArrowDown } from 'react-icons/io';
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdOnDeviceTraining } from "react-icons/md";
import { BiMailSend } from "react-icons/bi";
import { MdDevices } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdOutlineTextsms } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineRoute } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { userlogout } from "../../../../store/AuthSlice";
function SidebarTop({ pageName }) {
    const dispatch = useDispatch();

    const color = useSelector((state) => state.Auth.hovercolourapi)
    const colorhover = useSelector((state) => state.Auth.colourapi)
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const sidebarToggle = useSelector((state) => state.Auth.sidebarToggle)
    const [showIcons, setShowIcons] = useState(sidebarToggle);
    const [activeMenu, setActiveMenu] = useState(null);
    const handleItemClick = (menuItem) => {
        setActiveMenu(activeMenu === menuItem ? null : menuItem);
    };
    const handleBackClick = () => {
        setActiveMenu(null);
    };
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();

        dispatch(userlogout());
        navigate("/");
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
        "Whitelist Management": [
            { name: "Sender id", link: "/whitelist/senderidlist", icon: BiMailSend },
            { name: "Ip", link: "/whitelist/iplist", icon: IoIosGitBranch },
            { name: "Device", link: "/whitelist/devicelist", icon: MdDevices },
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
        ],

    };
    const handleMenuItemClick = (link) => {
        navigate(link);
        setActiveMenu(null)
        setToggle(!toggle)
    };
    const [hoveredIndex, setHoveredIndex] = useState(null);


    return (
        <>
            <div className=" hidden md:flex w-full px-4 h-auto justify-start gap-3   bg-opacity-35 border-t-2 border-white transition-all duration-200 ease-in-out  bg-admin-color1"  >
                <nav className=' '>
                    <div className='flex justify-start gap-9 px-4  items-center  mb-5 '>

                    </div>
                    <div className='flex justify-center  '>
                        <div className='text-white flex items-center gap-2 text-[11.5px]'>
                            <div className='relative'>
                                <div className='flex items-center  cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Account Management")} style={{ backgroundColor: color }}>
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
                                <div className='flex items-center  cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("SenderId Management")} style={{ backgroundColor: color }}>
                                    <MdOnDeviceTraining />

                                    <span className='flex items-center'>
                                        <span>SenderId Management</span>
                                        <IoIosArrowDown />
                                    </span>

                                </div>
                                {activeMenu === "SenderId Management" && (
                                    <div className=" absolute z-50 top-10 w-[100%] cursor-pointer  p-2 gap-2 mb-4  rounded-md " style={{ backgroundColor: color }}>
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
                                <div className='flex items-center cursor-pointer p-2 gap-2 mb-4  rounded-md transform transition-transform duration-200 hover:scale-110' style={{ backgroundColor: color }} onClick={() => handleItemClick("Vendor Management")}>
                                    <FaUsersGear />
                                    <span className='flex items-center'>
                                        <span>Vendor Management</span>
                                        <IoIosArrowDown />
                                    </span>

                                </div>


                                {activeMenu === "Vendor Management" && (
                                    <div className="absolute z-50 top-10  w-[100%] cursor-pointer transform transition-transform duration-200 p-2 gap-2 mb-4 rounded-md" style={{ backgroundColor: color }}>
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



                                <div className='flex items-center  cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Route Management")} style={{ backgroundColor: color }}>
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
                                <div className='flex items-center  cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Ip Management")} style={{ backgroundColor: color }}>
                                    <MdOnDeviceTraining />
                                    <span className='flex items-center'>
                                        <span>Ip Management</span>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                {activeMenu === "Ip Management" && (
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
                                <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Cost Management")} style={{ backgroundColor: color }}>
                                    <MdOnDeviceTraining />
                                    <span className='flex items-center'>
                                        <span>Cost Management</span>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                {activeMenu === "Cost Management" && (
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
                                <div className='flex items-center  cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Price Management")} style={{ backgroundColor: color }}>
                                    <MdOnDeviceTraining />
                                    <span className='flex items-center'>
                                        <span>
                                            Price Management
                                        </span>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                {activeMenu === "Price Management" && (
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
                                <div className='flex items-center  cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Error Code Management")} style={{ backgroundColor: color }}>
                                    <MdOnDeviceTraining />
                                    <span className='flex items-center'>
                                        <span>        Error Code Management
                                        </span>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                {activeMenu === "Error Code Management" && (
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
                                <div className='flex items-center  cursor-pointer  p-2 gap-2 mb-4  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Webhook Management")} style={{ backgroundColor: color }}>
                                    <MdOnDeviceTraining />
                                    <span className='flex items-center'>
                                        <span>     Webhook Management
                                        </span>
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                                {activeMenu === "Webhook Management" && (
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


                                <div className='flex justify-center items-center  mb-5 '>
                                    {/* <h1 className='text-white font-poppins text-[14px]'>Menu</h1> */}
                                </div>
                                <div className='flex justify-center  '>

                                    <div className='text-white text-[17px]'>

                                        <div className='flex items-center cursor-pointer p-2 gap-2 mb-4 bg-admin-color2 rounded-md transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Account Management")} style={{ backgroundColor: colorhover }}>
                                            <FaUsersGear />
                                            {showIcons && (
                                                <span className='flex items-center'>
                                                    <span>Account  Management</span>
                                                    <IoIosArrowForward />
                                                </span>
                                            )}
                                        </div>








                                        <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("SenderId Management")} style={{ backgroundColor: colorhover }}>
                                            <MdOutlineRoute />
                                            {showIcons && (
                                                <span className='flex items-center'>
                                                    <span>SenderId Management</span>
                                                    <IoIosArrowForward />
                                                </span>
                                            )}
                                        </div>


                                        <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Vendor Management")} style={{ backgroundColor: colorhover }}>
                                            <MdOutlineRoute />
                                            {showIcons && (
                                                <span className='flex items-center'>
                                                    <span>Vendor Management</span>
                                                    <IoIosArrowForward />
                                                </span>
                                            )}
                                        </div>



                                        <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Ip Management")} style={{ backgroundColor: colorhover }}>
                                            <MdOutlineRoute />

                                            {showIcons && (
                                                <span className='flex items-center'>
                                                    <span>Ip Management</span>
                                                    <IoIosArrowForward />
                                                </span>

                                            )}


                                        </div>
                                        <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Cost Management")} style={{ backgroundColor: colorhover }}>
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
                                        <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Price Management")} style={{ backgroundColor: colorhover }}>
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
                                        <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Error Code Management")} style={{ backgroundColor: colorhover }}>
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

                                        <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Route Management")} style={{ backgroundColor: colorhover }} >
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
                                        <div className='flex items-center cursor-pointer  p-2 gap-2 mb-4 bg-admin-color2  rounded-md  transform transition-transform duration-200 hover:scale-110' onClick={() => handleItemClick("Webhook Management")} style={{ backgroundColor: colorhover }}>
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


                                        <div className=' border-b-[1px] bg-[#F6F6F6] rounded-md border-gray-200 w-full mb-2 items-center justify-center  flex gap-4 p-2'>

                                            <div className='flex justify-center font-semibold items-center cursor-pointer gap-2'>
                                                <IoIosLogOut style={{ color: colorhover }} />

                                                <span className="leading-tight m-0 text-xs text-[#0085FF] font-semibold" onClick={handleLogout}>Log out </span>
                                            </div>



                                        </div>

                                    </div>

                                </div>

                            </nav>)}
                </nav>
            </div>

        </>

    )
}

export default SidebarTop
