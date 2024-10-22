import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa'; // Use an appropriate icon for cost
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";

function CostCarrierView() {
    const location = useLocation();
    const costCarrier = location.state?.carrier; 
    const dispatch = useDispatch();
    const pagename = { pagename: 'Cost Carrier View' };
    dispatch(pagenamechange(pagename));
   

    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Cost Management &gt; Cost Carrier View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Cost Carrier Details</h1>
                        </div>

                        {/* Cost Carrier Card */}
                        {costCarrier ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Cost Carrier Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center"><FaDollarSign className="mr-2 admin-table-text" /> Cost Carrier Information</h2>
                                        {/* <p className="mb-2"><strong>Cost ID:</strong> {costCarrier.cost_id || 'N/A'}</p> */}
                                        <p className="mb-2"><strong>Cost:</strong> {costCarrier.cost || 'N/A'}</p>
                                        <p className="mb-2"><strong>Carrier Name:</strong> {costCarrier.carriername || 'N/A'}</p>
                                        <p className="mb-2"><strong>Dial-In Code:</strong> {costCarrier.dial_in_code || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No cost carrier data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default CostCarrierView;
