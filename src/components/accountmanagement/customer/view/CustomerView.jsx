import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaUser} from 'react-icons/fa';
import { BiBuildings } from 'react-icons/bi';
function CustomerView() {
    const location = useLocation();
    const customer = location.state?.customer;

    // Helper function to decode Base64-encoded password
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
                <p className="text-admin-color2">Account Management &gt; Customer View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                        <h1 className="text-xl font-semibold admin-table-text ">Customer Details </h1>

                        </div>

                        {/* Customer Card */}
                        {customer ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Customer Info */}
                                    <div className="p-4 border rounded-lg shadow-sm ">
                                    <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center"><FaUser className="mr-2 admin-table-text" /> Customer Information</h2>
                                        <p className="mb-2"><strong>Name:</strong> {customer.customername}</p>
                                        <p className="mb-2"><strong>Company:</strong> {customer.companyname}</p>
                                        <p className="mb-2"><strong>Email:</strong> {customer.email}</p>
                                        <p className="mb-2"><strong>Mobile:</strong> {customer.mobile}</p>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="p-4 border rounded-lg shadow-sm ">
                                    <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center"><BiBuildings className="mr-2 admin-table-text" /> Additional Details</h2>
                                        <p className="mb-2"><strong>First Name:</strong> {customer.first_name}</p>
                                        <p className="mb-2"><strong>Last Name:</strong> {customer.last_name}</p>
                                        <p className="mb-2"><strong>Invoice Type:</strong> {customer.invoicetype}</p>
                                        <p className="mb-2"><strong>Created Date:</strong> {new Date(customer.created_date).toLocaleString()}</p>
                                        {customer.update_date && (
                                            <p className="mb-2"><strong >Update Date:</strong> {new Date(customer.update_date).toLocaleString()}</p>
                                        )}                                        <p className="mb-2"><strong>Login Password:</strong> {decodePassword(customer.loginpassword)}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No customer data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default CustomerView;