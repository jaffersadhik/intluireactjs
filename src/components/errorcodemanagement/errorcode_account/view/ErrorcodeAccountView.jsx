import React  from 'react';
import { useLocation } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa'; // Icon for price

import { Base64 } from 'js-base64';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
function ErrorcodeAccountView() {
    const location = useLocation();
    const ErrorcodeAccount = location.state?.ErrorcodeAccount;  // Get PriceAccount data from location
    const dispatch = useDispatch();
    const pagename = { pagename: 'Errorcode Account View' };  // Update the page name if needed
    dispatch(pagenamechange(pagename));

    
    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Errorcode  Management &gt; Errorcode Account View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Errorcode Account  Details</h1>
                        </div>

                        {/* Price Account Card */}
                        {ErrorcodeAccount ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Price Account Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center">
                                            <FaDollarSign className="mr-2 admin-table-text" /> Errorcode Account  Information
                                        </h2>
                                        <p className="mb-2"><strong>Account Name:</strong> {Base64.decode(ErrorcodeAccount.accountname) || 'N/A'}</p>
                                        <p className="mb-2"><strong>Status :</strong> {ErrorcodeAccount.status || 'N/A'}</p>
                                        <p className="mb-2"><strong>Errorcode :</strong> {ErrorcodeAccount.errorcode || 'N/A'}</p>
                                        <p className="mb-2"><strong>Platformerrorcode :</strong> {ErrorcodeAccount.platformerrorcode || 'N/A'}</p>

                                        <p className="mb-2"><strong>Description :</strong> {ErrorcodeAccount.description || 'N/A'}</p>

                                        <p className="mb-2"><strong>Created Date:</strong> {new Date(ErrorcodeAccount.created_date).toLocaleString()}</p>
                                        {ErrorcodeAccount.update_date && (
                                            <p className="mb-2"><strong>Update Date:</strong> {new Date(ErrorcodeAccount.update_date).toLocaleString()}</p>
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No Errorcode Account  data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ErrorcodeAccountView;
