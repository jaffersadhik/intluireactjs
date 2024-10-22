import React from 'react'
import logo from '../../assets/images/footer/footerlogo.png'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";






function Footer() {
  return (
    <div className='bg-black bg-bg-6 bg-cover bg-no-repeat  px-[44px] py-[70px]'>
      <div className=''>
        <div class="md:flex gap-9 mb-8">
          <div class="md:w-1/5 ">
            <div className='w-[200px] h-[90px]'>
              <img src={logo} alt="" />


            </div>
            <div className='md:mb-[24px] mb-[15px] text-white'>
              <p>Lorem ipsum dolor sit amet </p>
              <p>consectetur adipiscing elit aliquam</p>
            </div>
            <div className='flex flex-row justify-start gap-6 text-white'>
              <div className='h-[19px] '>
                <FaFacebookF />

              </div>
              <div>
                <FaTwitter />

              </div>
              <div>
                <FaInstagram />

              </div>
              <div>
                <FaLinkedinIn />

              </div>

            </div>

          </div>
          <div class="md:w-1/5 ">
            <div className='font-semibold font-poppins text-[#0C77D3] mb-2'>
              <p>Contacts us</p>
            </div>
            <div className='mb-[10px]'>

              <div className='flex flex-row items-center gap-2 text-white md:mb-[5px]'>
                <div className='text-white'>
                  <MdOutlineEmail />

                </div>
                <div className='flex items-center'>
                  <p>contact@company.com</p>
                </div>

              </div>
              <div className='flex flex-row items-center gap-2 text-white'>
                <div className='text-white'>
                  <IoCallOutline />

                </div>
                <div className='flex items-center'>
                  <p>(414) 687 - 5892</p>
                </div>

              </div>
            </div>


            <div className='mb-4'>

              <div className='font-poppins font-semibold text-white'>
                <p>UAE :</p>
              </div>
              <div className='flex flex-row gap-1 justify-center'>
                <div className='text-white pt-1'>
                  <HiOutlineLocationMarker />


                </div>
                <div className='text-white'>
                  <p>Corporate Office: 201,
                    Gate Avenue South Zone, Dubai International Financial Center, Dubai. United Arab Emirates</p>

                </div>

              </div>

            </div>

            <div className=''>

              <div className='font-poppins font-semibold text-white'>
                <p>USA :</p>
              </div>
              <div className='flex flex-row gap-1 justify-center '>
                <div className='text-white pt-1 '>
                  <HiOutlineLocationMarker />


                </div>
                <div className='text-white'>
                  <div className=''>
                    <p className='w-full'>Suite #2786, 99 Wall Street New York, NY 10005</p>
                  </div>

                </div>

              </div>

            </div>

          </div>
          <div class="md:w-1/5  ">
            <div className='md:pt-7 mb-5'>

              <div className='font-poppins font-semibold text-white'>
                <p>INDIA :</p>
              </div>
              <div className='flex flex-row gap-1 justify-center '>
                <div className='text-white pt-1 '>
                  <HiOutlineLocationMarker />


                </div>
                <div className='text-white'>
                  <div className=''>
                    <p className='w-full'>Suite no. 907, Clover Hills Plaza, NIBM Undri Road, Pune 411048</p>
                  </div>

                </div>

              </div>

            </div>
            <div className='mb-5'>


              <div className='flex flex-row gap-1 justify-center '>
                <div className='text-white pt-1 '>
                  <HiOutlineLocationMarker />


                </div>
                <div className='text-white'>
                  <div className=''>
                    <p className='w-full'>Office No:6, Ground floor,
                      Building No:5, Jupiter Complex,
                      Dr. Durgabhai Deshmukh Road,
                      Raja Annamalaai Puram,
                      Chennai - 600 028</p>
                  </div>

                </div>

              </div>

            </div>

            <div className='mb-5'>

              <div className='font-poppins font-semibold text-white'>
                <p>UK :</p>
              </div>
              <div className='flex flex-row gap-1 justify-center '>
                <div className='text-white pt-1 '>
                  <HiOutlineLocationMarker />


                </div>
                <div className='text-white'>
                  <div className=''>
                    <p className='w-full'>Unit 25 Chapel High, Baytree Center Essex Brentwood, London United Kingdom CM144BX</p>
                  </div>

                </div>

              </div>

            </div>

          </div>
          <div class="md:w-1/5 ">
            <div className='pt-7'>
              <div className='font-poppins font-semibold text-white'>
                For Sales and Marketing :
              </div>

              <div className='flex flex-wrap items-center gap-1 text-white md:mb-4 mb-2'>

                <div>
                  <MdOutlineEmail />
                </div>
                <div>
                  marketing@Tenowizards.com
                </div>

              </div>


              <div className='font-poppins font-semibold text-white'>
                For Support :
              </div>
              <div className='flex flex-wrap items-center gap-1 text-white md:mb-2'>

                <div>
                  <MdOutlineEmail />
                </div>
                <div>
                  tech-support@Tenowizards.com
                </div>

              </div>
              <div className='flex flex-wrap items-center gap-1 text-white md:mb-4 mb-2'>

                <div>
                  <IoCallOutline />
                </div>
                <div>
                  (414) 687 - 5892
                </div>

              </div>

              <div className='font-poppins font-semibold text-white'>
                For Data Protection & Privacy :
              </div>

              <div className='flex flex-wrap items-center gap-1 text-white md:mb-2'>

                <div>
                  <MdOutlineEmail />
                </div>
                <div>
                  dpo@Tenowizards.com</div>

              </div>
              <div className='flex flex-wrap items-center gap-1 text-white md:mb-4 mb-2'>

                <div>
                  <IoCallOutline />
                </div>
                <div>
                  (414) 687 - 5892</div>

              </div>

            </div>

          </div>
        </div>


        <div class="flex mb-4 text-white">
          <div class="w-full flex justify-center items-end ">
            <p>@2023 All Rights Reserved by TechnoWizards.io</p>
          </div>
        </div>



      </div>

    </div>
  )
}

export default Footer
