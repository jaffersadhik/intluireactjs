import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { BiBuilding } from 'react-icons/bi';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
function IpAccountView() {
    const dispatch = useDispatch();

    const pagename = { pagename: 'Ip Account View' };
    dispatch(pagenamechange(pagename));
    const location = useLocation();
    const IpAccount = location.state?.IpAccount; // Get the sender ID account data from the location state
    const decodeaccount = (encodedPassword) => {
        try {
            return atob(encodedPassword);  
        } catch (error) {
            return "Invalid Decodeing";  
        }
    };
    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Ip  Management &gt; Ip Account View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Ip Account View</h1>
                        </div>

                        {/* Sender ID Account Card */}
                        {IpAccount ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Account Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center"><FaUser className="mr-2 admin-table-text" /> Sender ID Information</h2>
                                        <p className="mb-2"><strong>Account Name:</strong> {decodeaccount(IpAccount.accountname)}</p> 
                                        <p className="mb-2"><strong>Sender ID:</strong> {IpAccount.senderid}</p>
                                        <p className="mb-2"><strong>Created Date:</strong> {new Date(IpAccount.created_date).toLocaleString()}</p>
                                        {IpAccount.update_date && (
                                            <p className="mb-2"><strong>Update Date:</strong> {new Date(IpAccount.update_date).toLocaleString()}</p>
                                        )}
                                    </div>

                                    {/* Additional Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center"><BiBuilding className="mr-2 admin-table-text" /> Additional Details</h2>
                                        <p className="mb-2"><strong>Status:</strong> {IpAccount.status || 'N/A'}</p>
                                        <p className="mb-2"><strong>Email Status:</strong> {IpAccount.emailstatus || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No Ip account data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default IpAccountView;
