import React, { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import { connectAPIViaGet } from '../../../../services/Get';
import { mncmccList } from '../../../../constants/contextpath/admin/numbering_plan/Numbering_plan';
import { FaDollarSign } from 'react-icons/fa';
import { countryGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
function CostCarrierMncmccView() {
    const location = useLocation();
    const dispatch = useDispatch();
    const pagename = { pagename: 'Cost Carrier Mnc mcc View' };  // Update the page name if needed
    dispatch(pagenamechange(pagename));

    const [matchingMnc, setmatchingMnc] = useState([]);
    const [Country, setCountry] = useState([]);

    const initialData = location.state?.costcarriermncmcc; // Assuming data is passed as state
    const [formData, setFormData] = useState({
        cost_id: initialData?.cost_id || '',
        cost: initialData?.cost || '',
        mcc: initialData?.mcc || '',
        mnc: initialData?.mnc || '',
        carriername: initialData?.carriername || '',
        dial_in_code: initialData?.dial_in_code || '',

    });

    useEffect(() => {
        const fetchData = async () => {
           
            try {
                const response = await connectAPIViaGet(`${mncmccList}?all=true`);
                setmatchingMnc(response.data.find(item =>
                    item.mnc == formData.mnc && item.mcc == formData.mcc
                ));
                console.log(matchingMnc, "matchingMnc")
            } catch (error) {
                console.error('Error fetching MNC/MCC list:', error);
            }
            try {
                const response = await connectAPIViaGet(countryGetAll);
                console.log(response.data,"response.data cout")
                if (initialData?.dial_in_code) {
                    setCountry(response.data.find(country => country.dial_in_code === initialData.dial_in_code));
                }
            } catch (error) {
                console.error('Error fetching country list:', error);
            }

        };

        fetchData();
    }, [formData.mnc, formData.mcc]); // Re-fetch if mnc or mcc changes

    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Cost Management &gt; Cost Carrier MCC & MNC View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Cost Carrier MCC & MNC View</h1>
                        </div>

                        {/* Error Message */}
               
                        {/* Success Message */}
                        

                        {/* Cost Carrier Details Card */}
                        {formData ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Cost Carrier Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center">
                                            <FaDollarSign className="mr-2 admin-table-text" /> Cost Carrier MCC & MNC Information
                                        </h2>
                                        <p className="mb-2"><strong>Cost:</strong> {initialData.cost || 'N/A'}</p>
                                        <p className="mb-2"><strong>Carrier Name:</strong> {initialData.carriername || 'N/A'}</p>
                                        <p className="mb-2"><strong>MCC:</strong> {initialData.mcc || 'N/A'}</p>
                                        <p className="mb-2"><strong>MNC:</strong> {matchingMnc ? `${matchingMnc.mnc} - ${matchingMnc.networkoperatorname}` : 'No MNC available'}</p>
                                        <p className="mb-2"><strong>Dial In Code:</strong> {Country.dial_in_code || 'N/A'} - {Country.country_short_name || 'N/A'} 
                                        </p>
                                        <p className="mb-2"><strong>Created date:</strong> {initialData.created_date || 'N/A'}</p>
                                        {initialData.update_date && (
    <p className="mb-2"><strong>Updated date:</strong> {initialData.update_date}</p>
)}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No cost carrier data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default CostCarrierMncmccView;
