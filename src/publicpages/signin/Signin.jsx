import React, { useState, useEffect,useRef,useMemo  } from 'react';
import logo from '../../assets/images/Login/logo login.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";
import logotop from '../../assets/images/Login/login logo.png';
import { PieChart, Pie, Cell } from 'recharts';
import TranslateComponent from '../Transalation/TranslateComponent';
import { useDispatch, useSelector } from "react-redux";
import { setCredentials ,slidebartype,colourapi,hovercolourapi} from "../../store/AuthSlice";
// import { adminauthenticate } from '../../constants/contextpath/user/login/Login';
import axios from 'axios';
import Footer from '../footer/Footer';
import { connectAPIViaGet } from '../../services/Get';
// import { apitheme } from '../../constants/contextpath/user/utils/Utils';
import { SigninApi } from '../../constants/contextpath/admin/authentication/Authentication';
function Signin() {
    
    const authstate = useSelector((state) => state.Auth);
    console.log(authstate)
    const dispatch = useDispatch();



  const translate = useRef(null)
//   console.log("test ref",translate)

  const [isTranslateVisible, setIsTranslateVisible] = useState(false);

  const handleLanguageButtonClick = () => {

    setIsTranslateVisible(!isTranslateVisible);
    if (translate.current) {
      translate.current.click()
    }
  };


  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const data = [
    { name: 'Within 1 second ', value: 400 },
    { name: 'Within 2 second ', value: 300 },
    { name: 'Within 5 second ', value: 300 },
    { name: 'Within 10 second ', value: 200 },
    { name: 'More than 60 second ', value: 200 },

  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0066E2'];

  const datatwo = [
    { name: 'India ', value: 400 },
    { name: 'UAE ', value: 300 },
    { name: 'UK ', value: 300 },
    { name: 'USA ', value: 200 },
    { name: 'Other ', value: 200 },

  ];

  const [showPassword, setShowPassword] = useState(false);
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        try {

            connectAPIViaGet()
                .then((response) => {
                    console.log(response.data);
                    const data = {
                      sidebartype: response.data.logindefault.menusidebartype || 'left',
                    };
                    
                    const datatwo = {
                      colourapinew: response.data.logindefault.menucolordark || '#3248a8',
                    };
                    
                    const datathree = {
                      hovercolourapinew: response.data.logindefault.menucolorlight || '#9aa8e3',
                    };
                    
                    dispatch(slidebartype(data));
                    
                    dispatch(colourapi(datatwo));
                    dispatch(hovercolourapi(datathree));
                })
                .catch((error) => {
                    console.error('Error fetching country list:', error);

                    const data = {
                      sidebartype:  'left',
                    };
                    
                    const datatwo = {
                      colourapinew:  '#3248a8',
                    };
                    
                    const datathree = {
                      hovercolourapinew: '#9aa8e3',
                    };
                    
                    dispatch(slidebartype(data));
                    dispatch(colourapi(datatwo));
                    dispatch(hovercolourapi(datathree));
                });
        } catch
        (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = {
      username: username,
      password: password,
    };
  
    try {
      const apiUrl = process.env.REACT_APP_API_URL + SigninApi
    
      const response = await axios.post(apiUrl, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        setError("");
        localStorage.clear();
        localStorage.setItem('access_token', response.data.access);
        
        const userdata = {
          accessToken: response.data.access,
          username : response.data.username,
          refreshToken:response.data.refresh

        };
        console.log(userdata,"test me now")
  
        if (userdata && userdata.accessToken) {
          console.log(userdata, "userdata__________");
          dispatch(setCredentials(userdata));
        } else {
          console.log("Access token not available. Nothing done.");
        }
  
        localStorage.setItem('refresh_token', response.data.refreshToken);
        localStorage.setItem('username', response.data.username);
  
        console.log(response.status, "test data")
        navigate('/account/accountsgetall');
      }
      console.log(response);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError('User name or password do not match');
        } else {
          setError('An error occurred during login. Please try again later');
        }
       
     

      } else {
        setError('An error occurred. Please check your network connection.');
       
      }
    }
  };
  


  const divIds = useMemo(() => ["div1", "div2", "div3", "div4", "div5", "div6"], []); // useMemo to memoize the array
  const currentIndexRef = useRef(0); // useRef to maintain mutable state

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const addAndRemoveClasses = () => {
      if (!isActive) {
        return;
      }

      divIds.forEach((id) => {
        const div = document.getElementById(id);
        if (div) {
          div.classList.remove('scale-150', 'rotate-x-6');
        }
      });

      const currentDiv = document.getElementById(divIds[currentIndexRef.current]);
      if (currentDiv) {
        currentDiv.classList.add('scale-150', 'rotate-x-6');
      }

      currentIndexRef.current = (currentIndexRef.current + 1) % divIds.length;
    };

    const intervalId = setInterval(addAndRemoveClasses, 2000);

    return () => clearInterval(intervalId);
  }, [isActive, divIds]);

  const handleMouseEnter = () => {
    setIsActive(false);

    divIds.forEach((id) => {
      const div = document.getElementById(id);
      if (div) {
        div.classList.remove('scale-150', 'rotate-x-6');
      }
    });
  };

  const handleMouseLeave = () => {
    setIsActive(true);
  };

  const containerIds = useMemo(() => ["maindiv1", "maindiv2", "maindiv3", "maindiv4", "maindiv5", "maindiv6", "maindiv7", "maindiv8", "maindiv9", "maindiv10"], []);
  const currentIndexmainRef = useRef(0); // useRef to maintain mutable state

  const [isAnimationActive, setIsAnimationActive] = useState(true);

  useEffect(() => {
    const modifyContainerClasses = () => {
      if (!isAnimationActive) {
        return;
      }

      containerIds.forEach((id) => {
        const container = document.getElementById(id);
        if (container) {
          container.classList.remove('scale-150', 'rotate-x-6');
        }
      });

      const currentContainer = document.getElementById(containerIds[currentIndexmainRef.current]);
      if (currentContainer) {
        currentContainer.classList.add('scale-150', 'rotate-x-6');
      }

      currentIndexmainRef.current = (currentIndexmainRef.current + 1) % containerIds.length;
    };

    const intervalId = setInterval(modifyContainerClasses, 2000);

    return () => clearInterval(intervalId);
  }, [isAnimationActive, containerIds]); // Dependency array includes isAnimationAct

  const handleMouseEnterContainer = () => {
    setIsAnimationActive(false);

    containerIds.forEach((id) => {
      const container = document.getElementById(id);
      if (container) {
        container.classList.remove('scale-150', 'rotate-x-6');
      }
    });
  };

  const handleMouseLeaveContainer = () => {
    setIsAnimationActive(true);
  };








  return (
    <>


      <div class="flex md:mb-[50px] justify-between w-full" style={{ background: 'transparent linear-gradient(127deg, #A00039 0%, #1169B4 100%) 0% 0% no-repeat padding-box' }}>
        <div class="md:py-[20px] md:pl-[34px] ">
          <div className=''>
            <img className='object-contain md:w-32 w-16  md:h-10 h-10' src={logotop} alt="" />


          </div>
        </div>
        <div class="  flex flex-row md:gap-[51px] gap-1 items-center md:pr-[178px] text-white font-poppins md:text-[15px] text-[8px]">
          <div id="div1" className='hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <button>Products</button>
          </div>
          <div id="div2" className='hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <button>Industry Solutions</button>
          </div>
          <div id="div3" className='hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <button>About Us</button>
          </div>
          <div id="div4" className='hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <button>FAQ</button>
          </div>
          {/* <div className='hover:transform hover:scale-150 hover:rotate-x-6 transition-transform'>
            <button>Location</button>
          </div> */}
          <div id="div5" className='hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <button>Contact Us</button>
          </div>
          <div id="div6" className='hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>

            <button onClick={handleLanguageButtonClick}>Language</button>
            <div className='flex justify-center '>
              {isTranslateVisible ?  <div ref={translate}><TranslateComponent  /></div>  : null}
            </div>
           


          </div>

        </div>

      </div>





      <div className="items-center  flex flex-col justify-center h-auto px-4 max-md:px-5  md:mb-[50px] ">
        <div className="w-full max-w-[81.25vw]  max-md:max-w-full max-md:my-10 flex justify-normal ">
          <div className='md:flex justify-between w-full gap-[6.77vw]'>
            <div className=' w-full'>

              <div className=' md:rounded-[40px] rounded-[20px]  ' style={{ background: 'transparent linear-gradient(to bottom right, #B01A4D, #0F3659)' }}>
                <div className='bg-bg-5 bg-cover bg-no-repeat w-full h-full  md:py-[50px] py-5 px-2 md:px-[65px]  '>

                  <div className='md:flex gap-[40px]  justify-between md:mb-[47px] mb-4'>
                    <div id='maindiv1' className=' bg-white bg-opacity-25 md:h-[18vh] h-[110px] flex justify-center items-center md:py-[20px] md:px-[45px] md:w-[17vw] rounded-[30px] md:mb-0 mb-4 hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnterContainer}
                      onMouseLeave={handleMouseLeaveContainer}>
                      <div className='  justify-center text-white'>

                        <div className='w-full flex justify-center font-poppins font-bold text-[25px]'>
                          + 300

                        </div>
                        <div className='w-full justify-center font-poppins font-semibold '>
                          Total users count

                        </div>

                      </div>

                    </div>

                    <div id='maindiv2' className='bg-white bg-opacity-25 md:h-[18vh] h-[110px]  flex justify-center items-center md:py-[20px] md:px-[45px] md:w-[17vw] rounded-[30px] hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnterContainer}
                      onMouseLeave={handleMouseLeaveContainer}>
                      <div className='  justify-center text-white'>

                        <div className='w-full flex justify-center font-poppins font-bold text-[25px]'>
                          + 1,500

                        </div>
                        <div className='w-full justify-center font-poppins font-semibold'>
                          Total smpp account

                        </div>

                      </div>

                    </div>


                  </div>
                  <div className='md:flex gap-[40px]  justify-between md:mb-[47px] mb-4'>
                    <div id='maindiv3' className='bg-white bg-opacity-25 md:h-[18vh] h-[110px]  flex justify-center items-center md:py-[20px] md:px-[45px] md:w-[17vw] rounded-[30px] md:mb-0 mb-4 hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnterContainer}
                      onMouseLeave={handleMouseLeaveContainer}>
                      <div className='  justify-center text-white'>

                        <div className='w-full flex justify-center font-poppins font-bold text-[25px]'>
                          + 2000

                        </div>
                        <div className='w-full justify-center font-poppins font-semibold '>
                          Total http account
                        </div>

                      </div>

                    </div>

                    <div id='maindiv4' className='bg-white bg-opacity-25 md:h-[18vh] h-[110px]  flex justify-center items-center md:py-[20px] md:px-[45px] md:w-[17vw] rounded-[30px] hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnterContainer}
                      onMouseLeave={handleMouseLeaveContainer}>
                      <div className='  justify-center text-white'>

                        <div className='w-full flex justify-center font-poppins font-bold text-[25px]'>
                          + 300

                        </div>
                        <div className='w-full justify-center font-poppins font-semibold text-[12px]'>
                          Total SMSC connectivity

                        </div>
                        <div className='w-full  flex justify-center font-poppins font-semibold text-[12px]'>
                          account count


                        </div>
                      </div>

                    </div>


                  </div>
                  <div className='md:flex gap-[40px]  justify-between md:mb-[47px] mb-4'>
                    <div id='maindiv5' className='bg-white bg-opacity-25 md:h-[18vh] h-[110px]  flex justify-center items-center md:py-[20px] md:px-[25px] md:w-[17vw] rounded-[30px] md:mb-0 mb-4 hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnterContainer}
                      onMouseLeave={handleMouseLeaveContainer}>
                      <div className='  justify-center text-white'>

                        <div className='w-full flex flex-row justify-between gap-6 mb-2'>

                          <div>

                            <div className="relative size-10">
                              <svg className="size-full " width="10" height="10" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-white dark:text-white " strokeWidth="2" ></circle>
                                <g className="origin-center -rotate-90 transform">
                                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-gray-900 text-opacity-20 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="50"></circle>
                                </g>
                              </svg>
                              <div className="absolute top-[18px] start-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
                                <span className="text-center text-[10px] font-bold text-white">50%</span>
                              </div>

                            </div>
                            <div className='flex justify-center'>
                              <span className='text-[10px] font-poppins'>otp</span>
                            </div>
                          </div>

                          <div>

                            <div className="relative size-10 ">

                              <svg className="size-full " width="10" height="10" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-white dark:text-gray-700" strokeWidth="2" ></circle>
                                <g className="origin-center -rotate-90 transform">
                                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-gray-900 text-opacity-20 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="72"></circle>
                                </g>
                              </svg>

                              <div className="absolute top-[18px] start-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
                                <span className="text-center text-[10px] font-bold text-white">72%</span>
                              </div>

                            </div>
                            <div className='flex justify-center'>
                              <span className='text-[10px] font-poppins'>Transaction</span>
                            </div>
                          </div>
                          <div>

                            <div className="relative size-10">
                              <svg className="size-full " width="10" height="10" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-white dark:text-gray-700" strokeWidth="2" ></circle>
                                <g className="origin-center -rotate-90 transform">
                                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-gray-900 text-opacity-20 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="20"></circle>
                                </g>
                              </svg>
                              <div className="absolute top-[18px] start-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
                                <span className="text-center text-[10px] font-bold text-white">20%</span>
                              </div>

                            </div>
                            <div className='flex justify-center'>
                              <span className='text-[10px] font-poppins'>Bulk</span>
                            </div>
                          </div>






                        </div>
                        <div className='w-full flex justify-center font-poppins font-semibold text-[12px]'>
                          Cluster wise

                        </div>
                        <div className='w-full flex justify-center font-poppins font-semibold text-[12px]'>
                          processing sms count

                        </div>

                      </div>

                    </div>

                    <div id='maindiv6' className='bg-white bg-opacity-25 md:h-[18vh] h-[110px] overflow-hidden  flex justify-center items-center md:py-[20px] md:px-[5px] md:w-[17vw] rounded-[30px] hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnterContainer}
                      onMouseLeave={handleMouseLeaveContainer}>
                      <div className='  justify-center text-white'>

                        <div className='w-full flex flex-row justify-between gap-2 mb-2'>

                          <div>

                            <div className="relative size-10">
                              <svg className="size-full " width="10" height="10" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-white dark:text-white " strokeWidth="2" ></circle>
                                <g className="origin-center -rotate-90 transform">
                                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-gray-900 text-opacity-20 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="80"></circle>
                                </g>

                              </svg>
                              <div className="absolute top-[18px] start-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
                                <span className="text-center text-[10px] font-bold text-white">80%</span>
                              </div>

                            </div>
                            <div className='flex justify-center'>
                              <span className='text-[10px] font-poppins'>Priority 1 </span>
                            </div>
                          </div>

                          <div>

                            <div className="relative size-10">
                              <svg className="size-full " width="10" height="10" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-white dark:text-white " strokeWidth="2" ></circle>
                                <g className="origin-center -rotate-90 transform">
                                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-gray-900 text-opacity-20 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="50"></circle>
                                </g>
                              </svg>
                              <div className="absolute top-[18px] start-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
                                <span className="text-center text-[10px] font-bold text-white">50%</span>
                              </div>

                            </div>
                            <div className='flex justify-center'>
                              <span className='text-[10px] font-poppins'>Priority 2 </span>
                            </div>
                          </div>
                          <div>

                            <div className="relative size-10">
                              <svg className="size-full " width="10" height="10" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-white dark:text-white " strokeWidth="2" ></circle>
                                <g className="origin-center -rotate-90 transform">
                                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-gray-900 text-opacity-20 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="50"></circle>
                                </g>
                              </svg>
                              <div className="absolute top-[18px] start-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
                                <span className="text-center text-[10px] font-bold text-white">50%</span>
                              </div>

                            </div>
                            <div className='flex justify-center'>
                              <span className='text-[10px] font-poppins'>Priority 3</span>
                            </div>
                          </div>
                          <div>

                            <div className="relative size-10">
                              <svg className="size-full " width="10" height="10" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-white dark:text-white " strokeWidth="2" ></circle>
                                <g className="origin-center -rotate-90 transform">
                                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-gray-900 text-opacity-20 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="50"></circle>
                                </g>
                              </svg>
                              <div className="absolute top-[18px] start-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
                                <span className="text-center text-[10px] font-bold text-white">50%</span>
                              </div>

                            </div>
                            <div className='flex justify-center'>
                              <span className='text-[10px] font-poppins'>Priority 4</span>
                            </div>
                          </div>
                          <div>

                            <div className="relative size-10">
                              <svg className="size-full " width="10" height="10" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-white dark:text-white " strokeWidth="2" ></circle>
                                <g className="origin-center -rotate-90 transform">
                                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-current  text-gray-900 text-opacity-20 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="50"></circle>
                                </g>
                              </svg>
                              <div className="absolute top-[18px] start-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
                                <span className="text-center text-[10px] font-bold text-white">50%</span>
                              </div>

                            </div>
                            <div className='flex justify-center'>
                              <span className='text-[10px] font-poppins'>Priority 5</span>
                            </div>
                          </div>


                        </div>





                        <div className='w-full flex justify-center font-poppins font-semibold text-[12px]'>
                          Priority wise processing
                        </div>
                        <div className='w-full flex justify-center font-poppins font-semibold text-[12px]'>
                          sms count

                        </div>

                      </div>

                    </div>


                  </div>
                  <div className='md:flex gap-[40px]  justify-between md:mb-[47px] mb-4'>
                    <div id='maindiv7' className='bg-white bg-opacity-25 md:h-[18vh] h-[110px]  flex justify-center items-center md:py-[20px] md:px-[45px] md:w-[17vw]  rounded-[30px] md:mb-0 mb-4 hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnterContainer}
                      onMouseLeave={handleMouseLeaveContainer}>
                      <div className='  justify-center text-white'>

                        <div className='w-full flex justify-center font-poppins font-bold text-[25px]'>
                          + 2,500

                        </div>
                        <div className='w-full flex justify-center font-poppins font-semibold text-[14px]'>
                          Last year processing             </div>
                        <div className='w-full flex justify-center font-poppins font-semibold text-[14px]'>
                          sms count

                        </div>

                      </div>

                    </div>

                    <div id='maindiv8' className='bg-white bg-opacity-25 md:h-[18vh] h-[110px]  flex justify-center items-center md:py-[20px] md:px-[45px] md:w-[17vw] rounded-[30px] hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnterContainer}
                      onMouseLeave={handleMouseLeaveContainer}>
                      <div className='  justify-center text-white'>

                        <div className='w-full flex justify-center font-poppins font-bold text-[25px]'>
                          + 1,500

                        </div>
                        <div className='w-full flex justify-center font-poppins font-semibold text-[14px]'>
                          Last month processing            </div>
                        <div className='w-full flex justify-center font-poppins font-semibold text-[14px]'>
                          sms count

                        </div>

                      </div>

                    </div>


                  </div>


                  <div className='md:flex gap-[40px]  justify-between '>
                    <div id='maindiv9' className=' bg-white bg-opacity-25 md:h-[18vh] h-[110px] md:mb-0 mb-4  flex justify-center items-center md:py-[20px] md:px-[15px] px-6 md:w-[17vw] rounded-[30px] hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnterContainer}
                      onMouseLeave={handleMouseLeaveContainer}>
                      <PieChart width={180} height={400}>
                        <Pie
                          data={data}
                          cx={80}
                          cy={200}
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={1}
                          dataKey="value"
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>

                      <div className=' w-[300px] '>
                        <table className="min-w-full text-[10px]">
                          <thead className="">
                            <tr className='flex flex-row items-center justify-start'>
                              <th className="py-0.5 px-1 font-semibold md:pl-3 pl-1 text-white">Label</th>
                              <th className="py-0.5 px-1 font-semibold md:pl-12 pl-6 text-white">Value</th>
                              <th className="py-0.5 px-1 font-semibold md:pl-2 pl-2 text-white">%</th>
                            </tr>
                          </thead>
                          <tbody className="">
                            {data.map((item, index) => (
                              <tr key={index} className="flex flex-row justify-start items-center text-[8px]">
                                <span style={{ backgroundColor: COLORS[index] }} className="justify-center items-center w-2 h-2 rounded-full"></span>
                                <td className=" text-white flex justify-start  md:w-[80px] w-[70px]">{item.name}</td>
                                <td className="py-0.5 px-1 text-white flex justify-start">{item.value}</td>
                                <td className="py-0.5 px-1 md:pl-4 text-white flex justify-start">10%</td>
                              </tr>
                            ))}




                          </tbody>

                        </table>






                      </div>

                    </div>

                    <div id='maindiv10' className=' bg-white bg-opacity-25 md:h-[18vh] h-[110px]  flex justify-center items-center md:py-[20px] md:px-[15px] px-6 md:w-[17vw] rounded-[30px] hover:transform hover:scale-150 hover:rotate-x-6 transition-transform' onMouseEnter={handleMouseEnterContainer}
                      onMouseLeave={handleMouseLeaveContainer}>



                      <PieChart width={180} height={400}>
                        <Pie
                          data={data}
                          cx={80}
                          cy={200}
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={1}
                          dataKey="value"
                        >
                          {datatwo.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>

                      <div className=' w-[300px] '>
                        <table className="min-w-full text-[10px]">
                          <thead className="">
                            <tr className='flex flex-row items-center justify-start text-[8px]'>
                              <th className="md:py-0.5 px-1 font-semibold md:pl-6 pl-6 text-white">Label</th>
                              <th className="py-0.5 px-1 font-semibold md:pl-12 pl-6 text-white">Value</th>
                              <th className="py-0.5 px-1 font-semibold md:pl-4 pl-2 text-white">%</th>
                            </tr>
                          </thead>
                          <tbody className="">
                            {datatwo.map((item, index) => (
                              <tr key={index} className="flex flex-row justify-start items-center text-[8px]">
                                <span style={{ backgroundColor: COLORS[index] }} className="justify-center items-center w-2 h-2 rounded-full"></span>
                                <td className="py-0.5 px-3 text-white  md:w-[80px] w-[60px]">{item.name}</td>
                                <td className="py-0.5 px-3 text-white">{item.value}</td>
                                <td className="py-0.5 px-1 text-white">10%</td>
                              </tr>
                            ))}




                          </tbody>

                        </table>






                      </div>












                    </div>


                  </div>





                </div>




              </div>
            </div>




            <div className=' md:flex md:items-center'>
              <div className='md:w-[479px] md:h-[420px] bg-white '>
                <div className=' md:h-[100px]'>
                  <img className='md:h-[100px]' src={logo} alt="" />
                </div>
                <div className='mb-2 flex justify-start'>
                  <p className='font-poppins'>Enter your username and password</p>
                </div>
                {error && (
                  <div className='bg-red-200 bg-opacity-70 rounded-md md:p-2 p-1'>
                    <p className='md:text-[15px] text-xs'>{error}</p>
                  </div>
                )}
                <div className='mb-4 flex justify-start'>
                  <h1 className='text-4xl font-bold font-poppins'>Log in</h1>
                </div>
                <div className=''>
                  <div className="bg-white   flex flex-col">
                    <div className="mb-4 ">
                      <label className=" text-grey-darker px-1 text-sm  mb-2 flex justify-start" htmlFor="username">
                        Username
                      </label>
                      <input className={`appearance-none  bg-[#C0DBEA] rounded w-full py-2 px-3 text-grey-darker ${username ? 'bg-[#C0DBEA]' : ''
                        }`} id="username" type="text" placeholder="Enter Email" onChange={(e) => {
                          setusername(e.target.value);
                          setError(null);
                        }}
                      />
                    </div>
                    <div className="py-2 mb-[40px]">
                      <div className='flex justify-between'>
                        <span className="px-1 text-sm mb-2">Password</span>
                        <span className="px-1 text-sm text-[#A10039] hover:cursor-pointer" onClick={() => navigate('/forgotPassword')}
                        >Forgot Password ?</span>



                      </div>
                      <div className="relative text-grey-darker ">
                        <input
                          placeholder="Enter your password"
                          type={showPassword ? 'text' : 'password'}
                          className={`appearance-none  bg-[#C0DBEA] rounded w-full py-2 px-3 text-grey-darker ${password ? 'bg-[#C0DBEA]' : ''
                            }`}
                          onChange={(e) => setPassword(e.target.value)}


                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                          {showPassword ? (
                            <FaEyeSlash
                              className="h-6 text-[#A10039] cursor-pointer"
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          ) : (
                            <FaEye
                              className="h-6 text-[#A10039] cursor-pointer"
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className=' rounded-2xl h-[40px] flex justify-center text-white md:mb-4 mb-3' onClick={handleSubmit} style={{ background: 'transparent linear-gradient(127deg, #1169B4 0%, #A00039 100%) 0% 0% no-repeat padding-box' }}>
                      <button className=' flex justify-center items-center'>
                        <div className='pr-[10px]'>
                          Login
                        </div>
                        <div>
                          <FaLongArrowAltRight />
                        </div>
                      </button>
                    </div>
                    <div className='flex justify-center'>
                      <p className='md:text-sm text-xs'>
                        Don't have an account?{' '}
                        <button className='text-[#CB1F9C] font-poppins font-semibold' onClick={() => navigate('/signup')}>
                          Create account
                        </button>

                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>


        </div>
      </div>

























      {/* <Footer /> */}
      <Footer/>
    </>
  );
}

export default Signin;
