import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { pagenamechange } from "../../../../store/AuthSlice";
import { FaDollarSign } from 'react-icons/fa'; // Icon for price

function ErrorCodePlatformView() {
    const location = useLocation();
    const errorCodeData = location.state?.Errorcodeplatform; // Get errorCodeData from location
    const dispatch = useDispatch();
    const pagename = { pagename: 'ErrorCode Platform View' };  // Update the page name if needed
    dispatch(pagenamechange(pagename));

    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Errorcode Management &gt; ErrorCode Platform View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">ErrorCode Platform Details</h1>
                        </div>

                        {/* Error Code Platform Data Card */}
                        {errorCodeData ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Platform Error Code Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center">
                                            <FaDollarSign className="mr-2 admin-table-text" /> Errorcode Platform Information
                                        </h2>
                                        <p className="mb-2"><strong>Description:</strong> {errorCodeData.description || 'N/A'}</p>
                                        <p className="mb-2"><strong>Error Code:</strong> {errorCodeData.errorcode || 'N/A'}</p>
                                        <p className="mb-2"><strong>Status:</strong> {errorCodeData.status || 'N/A'}</p>
                                        <p className="mb-2"><strong>Carrier Name:</strong> {errorCodeData.carriername || 'N/A'}</p>
                                        <p className="mb-2"><strong>Created Date:</strong> {new Date(errorCodeData.created_date).toLocaleString()}</p>
                                        {errorCodeData.update_date && (
                                            <p className="mb-2"><strong>Update Date:</strong> {new Date(errorCodeData.update_date).toLocaleString()}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No ErrorCode Platform data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ErrorCodePlatformView;
