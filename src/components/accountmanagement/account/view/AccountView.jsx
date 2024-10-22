import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { BiBuildings } from 'react-icons/bi';
import { customerGetAll } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';
import { connectAPIViaGet } from '../../../../services/Get';

function AccountView() {
    const location = useLocation();
    const account = location.state?.account;
    const [Customer, setCustomer] = useState();
console.log(account.customer_id,"upcome cusotmer id")
const [customerName, setCustomerName] = useState('');

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await connectAPIViaGet(`${customerGetAll}?all=true`);
        const customers = response.data.data;
        setCustomer(customers);

        // Find the customer by customer_id and set the name
        const foundCustomer = customers.find(c => c.customer_id === account?.customer_id);
        if (foundCustomer) {
          setCustomerName(foundCustomer.customername);
        } else {
          console.error("Customer not found");
        }
      } catch (error) {
        console.error('Error fetching customer list:', error);
      }
    };

    fetchData();
  }, [account?.customer_id]);
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
                <p className="text-admin-color2">Account Management &gt; Account View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Account Details</h1>
                        </div>

                        {/* Account Card */}
                        {account ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Account Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center"><FaUser className="mr-2 admin-table-text" /> Account Information</h2>
                                        <p className="mb-2"><strong className='uppercase'>Username:</strong> {account.username && decodePassword(account.username)}</p>
                                        <p className="mb-2"><strong className='uppercase'>Customer name:</strong> {customerName || 'Customer not found'}</p>
                                        <p className="mb-2"><strong className='uppercase'> Password:</strong> {decodePassword(account.password)}</p>
                                        <p className="mb-2"><strong className='uppercase'>Login Password:</strong> {decodePassword(account.loginpassword)}</p>

                                        <p className="mb-2"><strong className='uppercase'>First Name:</strong> {account.first_name}</p>
                                        <p className="mb-2"><strong className='uppercase'>Last Name:</strong> {account.last_name}</p>
                                        <p className="mb-2"><strong className='uppercase'>Email Status:</strong> {account.emailstatus || 'N/A'}</p>
                                        <p className="mb-2"><strong className='uppercase'>Status:</strong> {account.status}</p>
                                    </div>




  
                                    {/* Additional Info */}
                                    <div className="p-4 border  rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center"><BiBuildings className="mr-2 admin-table-text" /> Additional Details</h2>
                                        <p className="mb-2"><strong className='uppercase'>Currency Code :</strong> {account.currencycode}</p>
                                        <p className="mb-2"><strong className='uppercase'>dial_in_code :</strong> {account.dial_in_code}</p>
                                        <p className="mb-2"><strong className='uppercase'>errorcode_type :</strong> {account.errorcode_type}</p>

                                        
                                        <p className="mb-2"><strong className='uppercase'>smstype :</strong> {account.smstype}</p>
                                        <p className="mb-2"><strong className='uppercase'>senderidcheck :</strong> {account.senderidcheck}</p>
                                        <p className="mb-2"><strong className='uppercase'>routetype :</strong> {account.routetype}</p>
                                        <p className="mb-2"><strong className='uppercase'>routecheck :</strong> {account.routecheck}</p>
                                        <p className="mb-2"><strong className='uppercase'>pricecheck :</strong> {account.pricecheck}</p>
                                        <p className="mb-2"><strong className='uppercase'>mncmcccheck :</strong> {account.mncmcccheck}</p>

                                        <p className="mb-2"><strong className='uppercase'>ipcheck :</strong> {account.ipcheck}</p>

                                        
                                        
                                        <p className="mb-2"><strong className='uppercase'>protocol :</strong> {account.protocol}</p>

                                        <p className="mb-2"><strong className='uppercase'>Created Date:</strong> {new Date(account.created_date).toLocaleString()}</p>
                                        {account.update_date && (
                                            <p className="mb-2"><strong className='uppercase'>Update Date:</strong> {new Date(account.update_date).toLocaleString()}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No account data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AccountView;
