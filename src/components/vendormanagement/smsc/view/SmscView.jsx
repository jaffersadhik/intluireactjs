import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaMobileAlt } from 'react-icons/fa'; // You can choose any relevant icon
import { connectAPIViaGet } from '../../../../services/Get';
import { carrierGetAll } from '../../../../constants/contextpath/admin/vendormanagement/VendorManagement';

function SmscView() {
    const location = useLocation();
    const smsc = location.state?.smsc;
    const [CarrierName, setCarrierName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await connectAPIViaGet(`${carrierGetAll}?all=true`);
            const Carrier = response.data.data;
            console.log(Carrier)
    
            const foundcarrier = Carrier.find(c => c.carrier_id === smsc?.carrier_id);
            if (foundcarrier) {
                setCarrierName(foundcarrier.carriername);
            } else {
              console.error("Customer not found");
            }
          } catch (error) {
            console.error('Error fetching customer list:', error);
          }
        };
    
        fetchData();
      }, [smsc?.carrier_id]);
    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">SMSC Management &gt; SMSC View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">SMSC Details</h1>
                        </div>

                        {/* SMSC Card */}
                        {smsc ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* SMSC Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center">
                                            <FaMobileAlt className="mr-2 admin-table-text" /> SMSC Information
                                        </h2>
                                        <p className="mb-2"><strong>Carrier ID:</strong>{CarrierName || 'Carrier Name not found'} </p>
                                        <p className="mb-2"><strong>IP Address:</strong> {smsc.ip}</p>
                                        <p className="mb-2"><strong>Mode:</strong> {smsc.mode}</p>
                                        <p className="mb-2"><strong>Username:</strong> {smsc.username ? atob(smsc.username) : 'N/A'}</p>
                                        <p className="mb-2"><strong>Password:</strong> {smsc.password ? atob(smsc.password) : 'N/A'}</p>
                                        <p className="mb-2"><strong>Port:</strong> {smsc.port}</p>
                                        <p className="mb-2"><strong>Secure Level:</strong> {smsc.securelevel}</p>
                                        <p className="mb-2"><strong>SMSC ID:</strong> {smsc.smscid}</p>
                                        <p className="mb-2"><strong>TPS:</strong> {smsc.tps}</p>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center">
                                            <FaMobileAlt className="mr-2 admin-table-text" /> Additional Details
                                        </h2>
                                        <p className="mb-2"><strong>Carrier Name:</strong> {smsc.carriername}</p>
                                        <p className="mb-2"><strong>Dial In Code:</strong> {smsc.dial_in_code}</p>
                                        <p className="mb-2"><strong>Currency Code:</strong> {smsc.currencycode}</p>
                                        <p className="mb-2"><strong>Route Type:</strong> {smsc.routetype}</p>
                                        <p className="mb-2"><strong>SMS Type:</strong> {smsc.smstype}</p>
                                        <p className="mb-2"><strong>Timezone ID:</strong> {smsc.timezone_id}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No SMSC data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default SmscView;
