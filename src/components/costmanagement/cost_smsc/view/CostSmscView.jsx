import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa'; // Use an appropriate icon for cost
import { countryGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { connectAPIViaGet } from '../../../../services/Get';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
function CostSmscView() {
    const location = useLocation();
    const costSMSC = location.state?.costsmscview; 
    const [Country, setCountry] = useState([]);
    const dispatch = useDispatch();
    const pagename = { pagename: 'Cost Smsc View' };  // Update the page name if needed
    dispatch(pagenamechange(pagename));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await connectAPIViaGet(countryGetAll);
                console.log(response.data, "response.data cout");
                if (costSMSC?.dial_in_code) {
                    setCountry(response.data.find(country => country.dial_in_code === costSMSC.dial_in_code));
                }
            } catch (error) {
                console.error('Error fetching country list:', error);
            }
        };
    
        fetchData();
    }, [costSMSC?.dial_in_code]); // Re-fetch only when initialData.dial_in_code changes
    

    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Cost Management &gt; Cost SMSC View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Cost SMSC Details</h1>
                        </div>

                        {/* Cost SMSC Card */}
                        {costSMSC ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Cost SMSC Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center"><FaDollarSign className="mr-2 admin-table-text" /> Cost SMSC Information</h2>
                                        {/* <p className="mb-2"><strong>Cost ID:</strong> {costSMSC.cost_id || 'N/A'}</p> */}
                                        <p className="mb-2"><strong>Cost:</strong> {costSMSC.cost || 'N/A'}</p>
                                        <p className="mb-2"><strong>SMSC ID:</strong> {costSMSC.smscid || 'N/A'}</p>
                                        <p className="mb-2"><strong>Dial In Code:</strong> {Country.dial_in_code || 'N/A'} - {Country.country_short_name || 'N/A'} </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No cost SMSC data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default CostSmscView;
