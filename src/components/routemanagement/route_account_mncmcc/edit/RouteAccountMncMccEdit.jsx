import React, { useState, useEffect } from 'react';
import { connectAPIViaPost } from '../../../../services/Post';
import { useDispatch } from 'react-redux';
import { pagenamechange } from "../../../../store/AuthSlice";
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import { connectAPIViaGet } from '../../../../services/Get';
import { countryGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { smscGetAll } from '../../../../constants/contextpath/admin/vendormanagement/VendorManagement';
import { routeGetAll } from '../../../../constants/contextpath/admin/routemanagement/RouteManagement';
import { accountGetAll } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';
import { mncmccList } from '../../../../constants/contextpath/admin/numbering_plan/Numbering_plan';
import { routeAccountMncmccEdit } from '../../../../constants/contextpath/admin/routemanagement/RouteManagement';
import { useLocation } from 'react-router-dom';


function RouteAccountMncMccEdit() {
    const dispatch = useDispatch();
    const location = useLocation();

    const RouteAccountMncMcc = location.state?.RouteAccountMncMcc;

    // Set the page name in the Redux store
    const pagename = { pagename: 'Route Account Mnc Mcc Edit' };
    dispatch(pagenamechange(pagename));

    const [error, Seterror] = useState("");
    const [success, Setsuccess] = useState("");
    const [Smsc, SetSmsc] = useState();
    const [Country, setCountry] = useState();
    const [route, setroute] = useState();
    const [Account, setAccount] = useState();
    const [Mcc, setMcc] = useState([]);
    const [MccMnc, setMccMnc] = useState([]);
    const [mncOptions, setMncOptions] = useState([]); // State for MNC options
    const [matchingMnc, setmatchingMnc] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await connectAPIViaGet(`${smscGetAll}?all=true`);
                SetSmsc(response.data.data);
            } catch (error) {
                console.error('Error fetching carrier list:', error);
            }
            try {
                const response = await connectAPIViaGet(`${mncmccList}?all=true`);
                console.log(response.data, "mnc acc all")
                setmatchingMnc(response.data.find(item =>
                    item.mcc == formData.mcc && item.mnc == formData.mnc
                ));
                console.log(matchingMnc, "matchingMnc")
            } catch (error) {
                console.error('Error fetching MNC/MCC list:', error);
            }
            try {
                const response = await connectAPIViaGet(`${routeGetAll}?all=true`);
                setroute(response.data.data);
            } catch (error) {
                console.error('Error fetching carrier list:', error);
            }
            try {
                const response = await connectAPIViaGet(`${accountGetAll}?all=true`);
                setAccount(response.data.data);
            } catch (error) {
                console.error('Error fetching country list:', error);
            }
            try {
                connectAPIViaGet(countryGetAll)
                    .then((response) => {
                        setCountry(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching country list:', error);
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [formData, setFormData] = useState({

        routename: RouteAccountMncMcc?.routename || '',
        smscid: RouteAccountMncMcc?.smscid || '',
        dial_in_code : RouteAccountMncMcc?.dial_in_code || '',
        accountname : RouteAccountMncMcc?.accountname || '',
        weight : RouteAccountMncMcc?.weight || '',
        routemapping_id : RouteAccountMncMcc?. routemapping_id || '',
        mcc : RouteAccountMncMcc?.mcc || '',
        mnc : RouteAccountMncMcc?.mnc || '',

      });
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'mcc') {
            const filteredMncOptions = MccMnc.filter(item => item.mcc === Number(value));
            setMncOptions(filteredMncOptions);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for missing fields
        const missingFields = Object.keys(formData).filter(key => {
            return formData[key] === '' || formData[key] === null;
        });

        if (missingFields.length > 0) {
            Seterror(`Please fill in the following fields: ${missingFields.join(', ')}`);
            Setsuccess('');
            return;
        }

        // Submit form data via API
        connectAPIViaPost(formData,routeAccountMncmccEdit )
            .then((response) => {
                Setsuccess('Route account Mnc Mcc Update successfully');
                Seterror('');
            })
            .catch((error) => {
                if (error.response) {
                    const errorMessage = error.response.data.error || 'An error occurred. Please try again.';
                    Seterror(errorMessage);
                }
            });
    };
    const decodeaccount = (encodedPassword) => {
        try {
            return atob(encodedPassword);
        } catch (error) {
            return "Invalid Decodeing";
        }
    };
    return (
        <div className='w-[100%] h-auto min-h-screen admin-inner-body1 pb-10'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Route Management &gt; Route Account Mnc Mcc Edit</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <div>
                                <h1 className="text-xl font-semibold admin-table-text text-table-text">Route Account Mnc Mcc Edit</h1>
                            </div>
                        </div>
                        {error && (
                            <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                <IoIosWarning className="text-xl mr-2" />
                                <span className="flex-grow">{error}</span>
                                <button
                                    onClick={() => Seterror('')}
                                    className="text-red-700 hover:text-red-900"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        )}
                        {success && (
                            <div className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                <IoCheckmarkCircleSharp className="text-xl mr-2" />
                                <span className="flex-grow">{success}</span>
                                <button
                                    onClick={() => Setsuccess('')}
                                    className="text-green-700 hover:text-green-900"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3 mb-4 md:mb-0 relative">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="routename">
                                        Route Name
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="routename"
                                            value={formData.routename}
                                            onChange={handleChange}
                                            id="routename"
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                                        >
                                            <option value="" disabled defaultValue>
                                                Route Name
                                            </option>
                                            {route &&
                                                route.map((route) => (
                                                    <option key={route.route_id} value={route.routename}>
                                                        {route.routename}
                                                    </option>
                                                ))}
                                        </select>

                                        {/* Down Arrow */}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-1/2 px-3 relative">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="smscid">
                                        SMSC ID
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="smscid"
                                            name="smscid"
                                            value={formData.smscid}
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                                        >
                                            <option value="" disabled defaultValue>
                                                SMSC ID
                                            </option>
                                            {Smsc &&
                                                Smsc.map((Smsc) => (
                                                    <option key={Smsc.smscid} value={Smsc.smscid}>
                                                        {Smsc.smscid}
                                                    </option>
                                                ))}
                                        </select>

                                        {/* Down Arrow */}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3 relative">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="dial_in_code">
                                        Account Name
                                    </label>
                                    <div className="relative">
                                        <select
                                            type="text"
                                            name="accountname"
                                            value={formData.accountname}
                                            id="accountname"
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                                        >
                                            <option value="" disabled defaultValue>
                                                Select Account Name
                                            </option>
                                            {Account &&
                                                Account.map((account) => (
                                                    <option key={account.account_id} value={account.username}>
                                                        {decodeaccount(account.username)}
                                                    </option>
                                                ))}
                                        </select>

                                        {/* Down Arrow */}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 px-3 relative">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="dial_in_code">
                                        Dial-In Code
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="dial_in_code"
                                            name="dial_in_code"
                                            value={formData.dial_in_code}
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                                        >
                                            <option value="" disabled defaultValue>
                                                Dial-In Code
                                            </option>
                                            {Country &&
                                                Country.map((Country) => (
                                                    <option key={Country.country_id} value={Country.dial_in_code}>
                                                        {Country.country} -- {Country.dial_in_code}
                                                    </option>
                                                ))}
                                        </select>

                                        {/* Down Arrow */}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
             

                        
                            </div>
                            <div className="-mx-3 md:flex md:mb-4 mb-6">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="mnc">
                                        MCC
                                    </label>
                                    <div className="relative block w-full bg-white border border-gray-400 rounded py-2 px-2 mb-3 group cursor-not-allowed">
                                        {formData && formData.mcc ? formData.mcc : 'No MCC available'}
                                        <p className="absolute left-0 top-full mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            MCC field is not editable for now.
                                        </p>
                                    </div>
                                </div>

                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="mnc">
                                        MNC
                                    </label>
                                    <div className="relative block w-full bg-white border border-gray-400 rounded py-2 px-2 mb-3 group cursor-not-allowed">
                                        {matchingMnc ? matchingMnc.mnc : 'No MNC available'} - {matchingMnc ? matchingMnc.networkoperatorname : 'No networkoperatorname'}
                                        <p className="absolute left-0 top-full mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            MNC field is not editable for now.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 md:flex md:mb-4">
                            <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="weight">
                                        Weight
                                    </label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="weight"
                                        placeholder="Weight"
                                    />
                                </div>

                            </div>



                            <div className="form-group">
                                <Button type="submit">Create Route Account</Button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default RouteAccountMncMccEdit;
