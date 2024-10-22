import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { countryGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { connectAPIViaGet } from '../../../../services/Get';
import { mncmccList } from '../../../../constants/contextpath/admin/numbering_plan/Numbering_plan';
function RouteAccountMncMccView() {
    const dispatch = useDispatch();

    const pagename = { pagename: 'Route Account Mnc Mcc View' };
    dispatch(pagenamechange(pagename));
    const location = useLocation();
    const RouteAccount = location.state?.RouteAccountMncMcc; // Get the RouteAccount data from the location state
    const decodeaccount = (encodedPassword) => {
        try {
            return atob(encodedPassword);  
        } catch (error) {
            return "Invalid Decodeing";  
        }
    };

    const [Country, setCountry] = useState({});
    const [matchingMnc, setMatchingMnc] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await connectAPIViaGet(countryGetAll);
                console.log(response.data, "response.data country");
                if (RouteAccount?.dial_in_code) {
                    const matchedCountry = response.data.find(country => country.dial_in_code === RouteAccount.dial_in_code);
                    setCountry(matchedCountry || {});
                }
            } catch (error) {
                console.error('Error fetching country list:', error);
            }
            try {
                const response = await connectAPIViaGet(`${mncmccList}?all=true`);
                setMatchingMnc(response.data.find(item =>
                    item.mnc == RouteAccount.mnc && item.mcc == RouteAccount.mcc
                ));
                console.log(matchingMnc, "matchingMnc");
            } catch (error) {
                console.error('Error fetching MNC/MCC list:', error);
            }

        };
    
        fetchData();
    }, [RouteAccount?.dial_in_code]); // Re-fetch only when dial_in_code changes
    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Route Management &gt; Route Account Mnc Mcc View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Route Account Mnc Mcc View</h1>
                        </div>

                        {/* Route Account Card */}
                        {RouteAccount ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Account Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center"><FaUser className="mr-2 admin-table-text" /> Route Account Information</h2>
                                        <p className="mb-2"><strong>Route Name:</strong> {RouteAccount.routename || 'N/A'}</p>
                                        <p className="mb-2"><strong>SMSC ID:</strong> {RouteAccount.smscid || 'N/A'}</p>
                                        <p className="mb-2">
                                            <strong>Dial In Code:</strong> {Country.dial_in_code || 'N/A'} - {Country.country_short_name || 'N/A'}
                                        </p>                                        <p className="mb-2"><strong>Account Name:</strong> {decodeaccount(RouteAccount.accountname)}</p> 
                                        <p className="mb-2"><strong>Weight:</strong> {RouteAccount.weight || 'N/A'}</p>
                                        <p className="mb-2"><strong>MCC:</strong> {RouteAccount.mcc || 'N/A'}</p>
                                        <p className="mb-2"><strong>MNC:</strong> {matchingMnc ? `${matchingMnc.mnc} - ${matchingMnc.networkoperatorname}` : 'No MNC available'}</p>
                                    </div>

                                    {/* Additional Info */}
                                    {/* <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4 flex items-center"><BiBuilding className="mr-2 admin-table-text" /> Additional Details</h2>
                                    </div> */}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No Route account data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default RouteAccountMncMccView;
