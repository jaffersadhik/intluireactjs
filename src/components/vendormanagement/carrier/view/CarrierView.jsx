import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaTruck } from 'react-icons/fa';
import { BiBuilding } from 'react-icons/bi';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";

function CarrierView() {
    const dispatch = useDispatch();
    
    const pagename = { pagename: 'Carrier View' };
    dispatch(pagenamechange(pagename));

    const location = useLocation();
    const carrier = location.state?.carrier; // Get the carrier data from the location state

    

    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Carrier Management &gt; Carrier View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Carrier View</h1>
                        </div>

                        {/* Carrier Information Card */}
                        {carrier ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Carrier Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center">
                                            <FaTruck className="mr-2 admin-table-text" /> Carrier Information
                                        </h2>
                                        <p className="mb-2"><strong>Carrier Name:</strong> {carrier.carriername}</p>
                                        <p className="mb-2"><strong>Created Date:</strong> {new Date(carrier.created_date).toLocaleString()}</p>
                                        {carrier.update_date && (
                                            <p className="mb-2"><strong>Update Date:</strong> {new Date(carrier.update_date).toLocaleString()}</p>
                                        )}
                                    </div>

                                    {/* Additional Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center">
                                            <BiBuilding className="mr-2 admin-table-text" /> Additional Details
                                        </h2>
                                        <p className="mb-2"><strong>Status:</strong> {carrier.status || 'N/A'}</p>
                                        <p className="mb-2"><strong>Tracking ID:</strong> {carrier.trackingId || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No Carrier data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default CarrierView;
