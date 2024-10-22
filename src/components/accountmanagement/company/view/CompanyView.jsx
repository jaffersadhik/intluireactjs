import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';
import { BiBuildings } from 'react-icons/bi';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
function CompanyView() {
    const dispatch = useDispatch();
    const pagename = { pagename: 'Company View' };
    dispatch(pagenamechange(pagename));
    const location = useLocation();
    const company = location.state?.company;
    const decodePassword = (encodedPassword) => {
        try {
            return atob(encodedPassword);  // atob decodes a Base64-encoded string
        } catch (error) {
            return "Invalid Password";  // Return an error message if decoding fails
        }
    };
    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Account Management &gt; Company View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Company Details</h1>
                        </div>

                        {/* Company Card */}
                        {company ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Company Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center">
                                            <FaBuilding className="mr-2 admin-table-text" /> Company Information
                                        </h2>
                                        <p className="mb-2"><strong>Name:</strong> {company.fullname}</p>
                                        <p className="mb-2"><strong>Username:</strong>{decodePassword(company.username)} </p>
                                        <p className="mb-2"><strong>password:</strong>{decodePassword(company.password)} </p>

                                        <p className="mb-2"><strong>Email:</strong> {company.email}</p>
                                        <p className="mb-2"><strong>Mobile:</strong> {company.mobilenumber}</p>
                                        <p className="mb-2"><strong>Address:</strong> {company.address}</p>
                                        
                                    </div>

                                    {/* Additional Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center">
                                            <BiBuildings className="mr-2 admin-table-text" /> Additional Details
                                        </h2>
                                        <p className="mb-2"><strong>Active Status:</strong> {company.activestatus ? 'Active' : 'Inactive'}</p>
                                        <p className="mb-2"><strong>Block Customer:</strong> {company.blockcustomer ? 'Yes' : 'No'}</p>
                                        <p className="mb-2"><strong>Created Date:</strong> {new Date(company.created_date).toLocaleString()}</p>
                                        {company.update_date && (
                                            <p className="mb-2"><strong>Update Date:</strong> {new Date(company.update_date).toLocaleString()}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No company data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default CompanyView;
