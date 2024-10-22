import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaMobileAlt } from 'react-icons/fa'; // You can choose any relevant icon
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";

function DcSmscidView() {
    const location = useLocation();
    const dispatch = useDispatch();
    
    const pagename = { pagename: 'DcSmscid View' };
    dispatch(pagenamechange(pagename));

    const DcSmscid = location.state?.DcSmscid;


    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Vendor Management &gt; Dc DcSmscidid  View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Dc DcSmscid Details</h1>
                        </div>

                        {/* DcSmscid Card */}
                        {DcSmscid ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* DcSmscid Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center">
                                            <FaMobileAlt className="mr-2 admin-table-text" /> DcSmscid Information
                                        </h2>
                                        <p className="mb-2"><strong>IP Address:</strong> {DcSmscid.ip}</p>
                                        <p className="mb-2"><strong>Username:</strong> {DcSmscid.username ? atob(DcSmscid.username) : 'N/A'}</p>
                                        <p className="mb-2"><strong>Password:</strong> {DcSmscid.password ? atob(DcSmscid.password) : 'N/A'}</p>
                                        <p className="mb-2"><strong>Port:</strong> {DcSmscid.port}</p>
                                        <p className="mb-2"><strong>Secure Level:</strong> {DcSmscid.securelevel}</p>
                                        <p className="mb-2"><strong>TPS:</strong> {DcSmscid.tps}</p>
                                        <p className="mb-2 uppercase"><strong>kannelhostname:</strong> {DcSmscid.kannelhostname}</p>
                                        <p className="mb-2 uppercase"><strong>dcname:</strong> {DcSmscid.dcname}</p>
                                        <p className="mb-2"><strong>Created Date:</strong> {new Date(DcSmscid.created_date).toLocaleString()}</p>
                                        {DcSmscid.update_date && (
                                            <p className="mb-2"><strong>Update Date:</strong> {new Date(DcSmscid.update_date).toLocaleString()}</p>
                                        )}
                                    </div>

                                    {/* Additional Info */}
                          
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No DcSmscid data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default DcSmscidView;
