import React from 'react'
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";

function InvoiceTypeList() {
    const dispatch = useDispatch();
    const pagename = {
        pagename: 'InvoiceTypeList',
    };
    dispatch(pagenamechange(pagename));
    return (
        <div className='w-full h-screen bg-admin-color2'>

            <div className="md:pl-[33px] pl-[20px] md:pt-[30px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Master Enum &gt; InvoiceTypeList </p>
            </div>

            <div className="md:px-[33px] px-[8px]">
                <div className="bg-white md:px-[30px] px-[10px] py-7 rounded-xl">
                    <p className='text-admin-color1'>ddddddds</p>
                </div>
            </div>


        </div>
    )
}

export default InvoiceTypeList
