import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa'; // Icon for price
import { countryGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { connectAPIViaGet } from '../../../../services/Get';
import { Base64 } from 'js-base64';
import { mncmccList } from '../../../../constants/contextpath/admin/numbering_plan/Numbering_plan';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
function PriceAccountMncMccView() {
    const location = useLocation();
    const dispatch = useDispatch();
    const pagename = { pagename: 'Price Account Mnc Mcc View' };  // Update the page name if needed
    dispatch(pagenamechange(pagename));
    const PriceAccountMncMcc = location.state?.PriceAccountMncMcc;  // Get PriceAccount data from location
    const [Country, setCountry] = useState({});
    const [matchingMnc, setMatchingMnc] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await connectAPIViaGet(countryGetAll);
                console.log(response.data, "response.data country");
                if (PriceAccountMncMcc?.dial_in_code) {
                    const matchedCountry = response.data.find(country => country.dial_in_code === PriceAccountMncMcc.dial_in_code);
                    setCountry(matchedCountry || {});
                }
            } catch (error) {
                console.error('Error fetching country list:', error);
            }
            try {
                const response = await connectAPIViaGet(`${mncmccList}?all=true`);
                setMatchingMnc(response.data.find(item =>
                    item.mnc == PriceAccountMncMcc.mnc && item.mcc == PriceAccountMncMcc.mcc
                ));
                console.log(matchingMnc, "matchingMnc");
            } catch (error) {
                console.error('Error fetching MNC/MCC list:', error);
            }

        };
    
        fetchData();
    }, [PriceAccountMncMcc?.dial_in_code]); // Re-fetch only when dial_in_code changes
    
    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Price Management &gt; Price Account Mnc Mcc View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Price Account Mnc Mcc Details</h1>
                        </div>

                        {/* Price Account Card */}
                        {PriceAccountMncMcc ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Price Account Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center">
                                            <FaDollarSign className="mr-2 admin-table-text" /> Price Account Mnc Mcc Information
                                        </h2>
                                        <p className="mb-2"><strong>Price:</strong> {PriceAccountMncMcc.price || 'N/A'}</p>
                                        <p className="mb-2"><strong>Account Name:</strong> {Base64.decode(PriceAccountMncMcc.accountname) || 'N/A'}</p>
                                        <p className="mb-2"><strong>MCC:</strong> {PriceAccountMncMcc.mcc || 'N/A'}</p>
                                        <p className="mb-2"><strong>MNC:</strong> {matchingMnc ? `${matchingMnc.mnc} - ${matchingMnc.networkoperatorname}` : 'No MNC available'}</p>
                                        <p className="mb-2">
                                            <strong>Dial In Code:</strong> {Country.dial_in_code || 'N/A'} - {Country.country_short_name || 'N/A'}
                                        </p>
                                        <p className="mb-2"><strong>Created Date:</strong> {new Date(PriceAccountMncMcc.created_date).toLocaleString()}</p>
                                        {PriceAccountMncMcc.update_date && (
                                            <p className="mb-2"><strong>Update Date:</strong> {new Date(PriceAccountMncMcc.update_date).toLocaleString()}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No Price Account data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default PriceAccountMncMccView;
