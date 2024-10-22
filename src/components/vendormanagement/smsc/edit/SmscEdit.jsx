import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { connectAPIViaPost } from '../../../../services/Post';
import { Base64 } from 'js-base64';
import { useDispatch } from 'react-redux';
import { pagenamechange } from "../../../../store/AuthSlice";
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import validatePassword from '../../../../utils/modules/PasswordValidator';
import { connectAPIViaGet } from '../../../../services/Get';
import { carrierGetAll } from '../../../../constants/contextpath/admin/vendormanagement/VendorManagement';
import { worldtimezoneGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { countryGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { validateInput } from '../../../../utils/modules/ValidateInput';
import { currencyGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { smscEdit } from '../../../../constants/contextpath/admin/vendormanagement/VendorManagement';
function SmscEdit() {
    const dispatch = useDispatch();
    const location = useLocation();

    // Set the page name in the Redux store
    const pagename = { pagename: 'SMSC Edit' };
    dispatch(pagenamechange(pagename));

    const [error, Seterror] = useState("");
    const [success, Setsuccess] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const [Carrier, SetCarrier] = useState();
    const [Worldtimezone, setWorldtimezone] = useState();
    const [Country, setCountry] = useState();
    const [ErrorMessage, setErrorMessage] = useState("");
    const [Currency, setCurrency] = useState();

    const smsc = location.state?.smsc;
    console.log(smsc, "account")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await connectAPIViaGet(`${carrierGetAll}?all=true`);
                SetCarrier(response.data.data);
            } catch (error) {
                console.error('Error fetching customer list:', error);
            }
            try {

                connectAPIViaGet(worldtimezoneGetAll)
                    .then((response) => {
                        console.log(response.data);
                        setWorldtimezone(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching customer list:', error);
                    });
            } catch
            (error) {
                console.error('Error fetching data:', error);
            }
            try {

                connectAPIViaGet(countryGetAll)
                    .then((response) => {
                        // console.log(response.data);
                        setCountry(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching customer list:', error);
                    });
            } catch
            (error) {
                console.error('Error fetching data:', error);
            }
            try {

                connectAPIViaGet(currencyGetAll)
                    .then((response) => {
                        console.log(response.data);
                        setCurrency(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching customer list:', error);
                    });
            } catch
            (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);




    const [formData, setFormData] = useState({
   
        mode: smsc?.mode || '',
        
        smscid: smsc?.smscid || '',
        
        carriername: smsc?.carriername || '',
        dial_in_code: smsc?.dial_in_code || '',
        currencycode: smsc?.currencycode || '',
        routetype: smsc?.routetype || '',
        smstype:smsc?.smstype || '',
        timezone_id: smsc?.timezone_id || '',
    });
    // Handle input changes and validations
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Validate the password fields


        // Set the field value
        const fieldValue = type === 'checkbox' ? checked : value;

        // Only validate if the field is 'smscid'
        if (name === 'smscid') {
            // Regex for lowercase alphanumeric without spaces
            const regex = /^[a-z0-9]*$/; // Use * to allow empty input
            const messages = {
                smscid: 'SMSC ID must contain only lowercase alphanumeric characters and no spaces.',
            };

            // Validate the input
            const errorMessage = validateInput(value, regex, messages.smscid); // Pass the correct message
            if (errorMessage) {
                setErrorMessage(errorMessage);
                return; // Stop further processing if validation fails
            } else {
                setErrorMessage(''); // Clear error if validation passes
            }
        }
        if (name === 'password') {
            const error = validatePassword(value);
            setPasswordError(error);
        }
        // Update form data regardless of whether validation was performed
        setFormData({ ...formData, [name]: fieldValue });
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

        // Encode password and username before sending
        const base64EncodedPassword = Base64.encode(formData.password);
        const base64EncodedUsername = Base64.encode(formData.username);

        const updatedFormData = {
            ...formData,
            password: base64EncodedPassword,
            username: base64EncodedUsername,
        };

        // Submit form data via API
        connectAPIViaPost(updatedFormData, smscEdit)
            .then((response) => {
                Setsuccess('SMSC Update successfully');
                Seterror('');
            })
            .catch((error) => {
                if (error.response) {
                    const errorMessage = error.response.data.error || 'An error occurred. Please try again.';
                    Seterror(errorMessage);
                }
            });
    };

    return (
        <div className='w-[100%] h-auto min-h-screen admin-inner-body1 pb-10'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">SMSC Management &gt; SMSC Edit</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <div>
                                <h1 className="text-xl font-semibold admin-table-text text-table-text">SMSC Edit</h1>
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
                                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="carrier_id">
                                        Carrier ID
                                    </label>

                                    <div className="relative">
                                        <select
                                            name="carriername"
                                            value={formData.carriername}
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                                        >
                                            <option value="" disabled defaultValue>
                                                Carrier
                                            </option>
                                            {Carrier &&
                                                Carrier.map((carrier) => (
                                                    <option key={carrier.carrier_id} value={carrier.carriername}>
                                                        {carrier.carriername}
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

                                <div className="md:w-1/2 px-3 mb-4 md:mb-0 relative">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="smstype">
                                        SMS Type
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="smstype"
                                            name="smstype"
                                            value={formData.smstype}
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3 pr-8"
                                        >
                                            <option value="" disabled defaultValue>
                                                SMS Type
                                            </option>
                                            <option value="OTP">OTP</option>
                                            <option value="TRANSACTIONAL">TRANSACTIONAL</option>
                                            <option value="PROMOTIONAL">PROMOTIONAL</option>
                                            <option value="ALERT">ALERT</option>
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
                            <div className="md:w-1/2 px-3 mb-4 md:mb-0 group relative">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="smscid">
                                        SMSC ID
                                    </label>
                                    <input
                                        type="text"
                                        name="smscid"
                                        value={formData.smscid}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-gray-200 text-grey-darker border border-gray-400 rounded py-2 px-2 mb-3 cursor-not-allowed"
                                        id="smscid"
                                        placeholder="SMSC ID"
                                        disabled
                                    />
                                    <p className="absolute left-4 top-16 mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        SMSC ID field is not editable for now.
                                    </p>
                                </div>
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="timezone_id">
                                        Timezone
                                    </label>

                                    <div className="relative">
                                        <select
                                            id="timezone_id"
                                            name="timezone_id"
                                            value={formData.timezone_id}
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                                        >
                                            <option value="" disabled defaultValue>
                                                Timezone ID
                                            </option>
                                            {Worldtimezone &&
                                                Worldtimezone.map((timezone) => (
                                                    <option key={timezone.timezone_id} value={timezone.timezone_id}>
                                                        {timezone.longname}
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
                            <div className="md:w-1/2 px-3 mb-4 md:mb-0 relative">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="smstype">
                                        mode                                    </label>
                                    <div className="relative">
                                        <select
                                            id="mode"
                                            name="mode"
                                            value={formData.mode}
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3 pr-8"
                                        >
                                            <option value="" disabled defaultValue>
                                                Mode
                                            </option>
                                            <option value="TEST">TEST</option>
                                            <option value="LIVE">LIVE</option>

                                        </select>
                                        {/* Down Arrow */}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 px-3">
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
                                                Country.map((country) => (
                                                    <option key={country.country_id} value={country.dial_in_code}>
                                                        {country.country} -- {country.dial_in_code}
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

                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="currencycode">
                                        Currency Code
                                    </label>

                                    <div className="relative">
                                        <select
                                            id="currencycode"
                                            name="currencycode"
                                            value={formData.currencycode}
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                                        >
                                            <option value="" disabled defaultValue>
                                                Currency Code
                                            </option>
                                            {Currency &&
                                                Currency.map((currency) => (
                                                    <option key={currency.currency_id} value={currency.currencycode}>
                                                        {currency.currencycode}
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

                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="routetype">
                                        Route Type
                                    </label>

                                    <div className="relative">
                                        <select
                                            name="routetype"
                                            value={formData.routetype}
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                                            id="routetype"
                                        >
                                            <option value="" disabled defaultValue>
                                                Route routetype
                                            </option>
                                            <option value="DOMESTIC">DOMESTIC</option>
                                            <option value="INTERNATIONAL">INTERNATIONAL</option>
                                        </select>
                                        {/* Down Arrow */}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="routetype">
                                        Route Type
                                    </label>
                                    <input
                                        type="text"
                                        name="routetype"
                                        value={formData.routetype}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="routetype"
                                        placeholder="Route Type"
                                    />
                                </div> */}
                            </div>

      

                        

                            <div className="">
                                <Button>Update smsc</Button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default SmscEdit;
