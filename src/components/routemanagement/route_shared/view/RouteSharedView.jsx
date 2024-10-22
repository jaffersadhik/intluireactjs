import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";

function RouteSharedView() {
    const dispatch = useDispatch();

    const pagename = { pagename: 'Route Shared View' };
    dispatch(pagenamechange(pagename));
    const location = useLocation();
    const RouteShared = location.state?.RouteShared; // Get the RouteShared data from the location state
    
    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Route Management &gt; Route Shared View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Route Shared View</h1>
                        </div>

                        {/* Route Account Card */}
                        {RouteShared ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Account Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center"><FaUser className="mr-2 admin-table-text" /> Route Shared Information</h2>
                                        <p className="mb-2"><strong>Route Name:</strong> {RouteShared.routename || 'N/A'}</p>
                                        <p className="mb-2"><strong>SMSC ID:</strong> {RouteShared.smscid || 'N/A'}</p>
                                        <p className="mb-2"><strong>Dial-In Code:</strong> {RouteShared.dial_in_code || 'N/A'}</p>
                                        <p className="mb-2"><strong>Weight:</strong> {RouteShared.weight || 'N/A'}</p>
                                    </div>

                                    {/* Additional Info */}
                                    {/* <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center"><BiBuilding className="mr-2 admin-table-text" /> Additional Details</h2>
                                    </div> */}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No  Route Shared data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default RouteSharedView;
