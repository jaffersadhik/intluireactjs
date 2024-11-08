import React, { useState } from 'react'
import logomain from '../../../../assets/images/navbar/usernavbar/logomain.png'
// import proimage from '../../../../assets/images/navbar/usernavbar/proimage.png'
// import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userlogout } from "../../../../store/AuthSlice";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux"
function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const color  = useSelector((state) => state.Auth.colourapi)
    const pagename = useSelector((state)=> state.Auth.pagename)
    console.log(pagename,"pagename_cua page")
    const authstate = useSelector((state)=> state.Auth)


    const sidebartype = useSelector((state) => state.Auth.sidebarType)
    
    console.log(sidebartype,"psidebartype_cua page")


    const [togiletwo, setTogiletwo] = useState(false);
    // const [togilaccount, settogilaccount] = useState(true);


    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();

        dispatch(userlogout());
        navigate("/");
    };

    const colurapi = "#dd6600"
    console.log(color ,"one colur")
    console.log(colurapi,"two colur")

    return (
        <>
            {/* <div class="flex  flex-row-reverse  flex-wrap md:flex-wrap md:h-[100px] h-[50px]  " style={{ background: 'transparent linear-gradient(127deg, #A00039 0%, #1169B4 100%) 0% 0% no-repeat padding-box' }}> */}
            {sidebartype === 'right' ? (
                <div className="flex flex-row-reverse flex-wrap md:flex-wrap md:h-[100px] h-[50px] " style={{ backgroundColor: color }}>
                    <div class="md:w-[18%] w-[30%] flex items-center md:p-0 p-2 md:pl-2 text-center md:h-[100px] h-[50px] text-gray-700 ">
                        <div className='hidden md:flex md:flex-row justify-start items-center flex-wrap'>

                            <div className=' '>
                                <img className='md:h-[50px] md:w-[170px]   h-[20px] w-[30px]' src={logomain} alt="logo" />
                            </div>

                        </div>



                        {/* for mobile */}


                        {/* for mobile */}

                    </div>

                    <div class=" md:w-[82%] w-[70%]  md:p-4  flex items-center text-center text-gray-200 md:h-[100px] h-[50px] border-r-2 border-white-500" >
                        <div className='hidden  md:flex md:flex-row  pl-[20px]   justify-between w-full'>




                            <div className=' flex  justify-start  items-center w-[226px] pl-[10px]'>



                                <div className='flex justify-center items-center w-[46px] cursor-pointer ' onClick={() => setTogiletwo(!togiletwo)}>
                                    <div className='w-10 h-10 flex justify-center items-center rounded-full  bg-opacity-10 border-4 border-white' style={{ backgroundColor: color }}>
                                        <p>A</p>
                                    </div>
                                </div>


                                {togiletwo &&
                                    <div className=' absolute z-50 left-10 top-16 mt-2 bg-blue-50  w-80 h-[270px] rounded-xl text-black shadow-md'>

                                        <div className='flex  justify-start  text-[20px] mt-2 px-5  '>
                                            <div className='w-5 h-5 hover:bg-gray-200   p-3 rounded-full flex justify-center items-center'>
                                                <p className='cursor-pointer' onClick={() => setTogiletwo(!togiletwo)}><IoCloseSharp />
                                                </p>
                                            </div>
                                        </div>


                                        <div className='flex items-center justify-center  mt-4'>
                                            <div className='w-16 h-16 mb-4 flex justify-center items-center rounded-full text-white font-bold bg-blue-600 border-8 border-indigo-200'>
                                                <p>A</p>
                                            </div>
                                        </div>

                                        <div className='flex justify-center items-center mb-2'>
                                            <span>Hi, </span> 
                                            <span>{authstate.username}</span>

                                        </div>

                                        <div className='flex justify-center items-center mb-5'>
                                            <p className='border border-black px-4 rounded-xl text-blue-600'>manage your account</p>

                                        </div>




                                        <div className='bg-white h-14 flex justify-center cursor-pointer gap-6 items-center font-semibold  px-4 rounded-b-lg mb-[2px]'>

                                            <p onClick={handleLogout}>Signout</p>

                                        </div>
                                    </div>


                                }




                            </div>
                            <div className='flex justify-center items-center '>
                                <h1 className='text-2xl font-bold text-white'>{pagename}</h1>

                            </div>

                        </div>


                        {/* for mobile */}

                        <div className='md:hidden flex flex-row justify-between items-center w-full  '>

                            <div className='pl-[10px]'>
                                <img className='h-[30px] w-[80px]' src={logomain} alt="" />
                            </div>
                            <div className='md:hidden flex flex-row justify-between  pr-7'>
                                <div className='flex justify-start items-end '>
                                    <p className='pl-2 font-poppins text-[14px] '>{pagename}</p>
                                </div>








                            </div>

                        </div>
                        {/* for mobile */}




                    </div>



                </div>
            ) : (
                <div className={`flex flex-row-reverse flex-wrap md:flex-wrap md:h-[100px] h-[50px] bg-[${colurapi}]`} style={{ backgroundColor: color }}>
                    <div class=" md:w-[82%] w-[70%]  md:p-4  flex items-center text-center text-gray-200 md:h-[100px] h-[50px] border-l-2 border-white-500" >
                        <div className='hidden  md:flex md:flex-row  pl-[20px]   justify-between w-full'>
                            <div className='flex justify-center items-center '>
                                <h1 className='text-2xl font-bold text-white'>{pagename}</h1>

                            </div>



                            <div className=' flex  justify-end   items-center w-[226px] pl-[10px]'>



                                <div className='flex justify-center items-center w-[46px] cursor-pointer ' onClick={() => setTogiletwo(!togiletwo)}
                                >
                                    <div className='w-10 h-10 flex justify-center items-center rounded-full  bg-opacity-10 border-4 border-white' style={{ backgroundColor: color }}>
                                    <p>{authstate.username ? authstate.username.charAt(0).toUpperCase() : null}</p>
                                    </div>
                                </div>


                                {togiletwo &&
                                    <div className=' absolute z-50 right-10 top-16 mt-2 bg-blue-50  w-80 h-[270px] rounded-xl text-black shadow-md'>

                                        <div className='flex  justify-end  text-[20px] mt-2 px-5  '>
                                            <div className='w-5 h-5 hover:bg-gray-200   p-3 rounded-full flex justify-center items-center'>
                                                <p className='cursor-pointer' onClick={() => setTogiletwo(!togiletwo)}><IoCloseSharp />
                                                </p>
                                            </div>
                                        </div>


                                        <div className='flex items-center justify-center  mt-4'>
                                            <div className='w-16 h-16 mb-4 flex justify-center items-center rounded-full text-white font-bold  border-8 border-indigo-200' style={{ backgroundColor: color }} >
                                            <p>{authstate.username ? authstate.username.charAt(0).toUpperCase() : null}</p>
                                            </div>
                                        </div>

                                        <div className='flex justify-center items-center mb-2'>
                                        <span>Hi, </span><b>{authstate.username}</b>

                                        </div>

                                        <div className='flex justify-center items-center mb-5'>
                                            <p className='border border-black px-4 rounded-xl text-blue-600'>manage your account</p>

                                        </div>




                                        <div className='bg-white h-14 flex justify-center cursor-pointer gap-6 items-center font-semibold  px-4 rounded-b-lg mb-[2px]'>

                                            <p onClick={handleLogout}>Signout</p>

                                        </div>
                                    </div>


                                }




                                {/* </div> */}
                            </div>
                            {/* </div> */}

                        </div>


                        {/* for mobile */}
                        <div className='md:hidden flex flex-row justify-between  '>
                            <div className='flex justify-start items-end '>
                                <p className='pl-2 font-poppins text-[14px] '>{pagename}</p>
                            </div>


                            {/* <div className='flex flex-row items-center  gap-3  pr-14'  >
                                <div className='w-[30px] h-[30px]  flex justify-center items-center rounded-xl' onClick={() => navigate('/myaccounts')}>
                                    <img src={proimage} alt="" />
                                </div>


                                <div className='  font-poppins  flex text-[15px]'>
                                    <div>
                                        {userSub && <h6>{userSub}</h6>}
                                        <div className=' pl-6' onClick={() => setTogiletwo(!togiletwo)}>

                                            <IoIosArrowDown />
                                            {togiletwo &&
                                                <div className='flex flex-col absolute right-10 top-10 mt-2 bg-white shadow-md rounded-md '>
                                                    <div className='px-4 py-2'>Option 1</div>
                                                    <div className='px-4 py-2'>Option 2</div>
                                                    <div className='px-4 py-2'>Option 3</div>
                                                </div>}

                                        </div>

                                    </div>



                                </div>




                            </div> */}





                        </div>
                        {/* for mobile */}




                    </div>


                    <div class="md:w-[18%] w-[30%] flex items-center md:p-0 p-2 md:pl-2 text-center md:h-[100px] h-[50px] text-gray-700 ">
                        <div className='hidden md:flex md:flex-row justify-start items-center flex-wrap'>

                            <div className=' '>
                                <img className='md:h-[50px] md:w-[170px]   h-[20px] w-[30px]' src={logomain} alt="logo" />
                            </div>

                        </div>



                        {/* for mobile */}

                        <div className='md:hidden flex flex-row justify-center items-center w-full  '>

                            <div className='pl-[10px]'>
                                <img className='h-[30px] w-[80px]' src={logomain} alt="" />
                            </div>

                        </div>
                        {/* for mobile */}

                    </div>
                </div>)}







        </>
    )
}

export default Navbar
