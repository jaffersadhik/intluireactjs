import React, { useState, useEffect } from 'react';
import { connectAPIViaPost } from '../../../../services/Post';
import { Base64 } from 'js-base64';
import { useDispatch } from 'react-redux';
import { pagenamechange } from "../../../../store/AuthSlice";
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import validatePassword from '../../../../utils/modules/PasswordValidator';
import { connectAPIViaGet } from '../../../../services/Get';

import { validateInput } from '../../../../utils/modules/ValidateInput';
import { smscSave } from '../../../../constants/contextpath/admin/vendormanagement/VendorManagement';
import { dataCenterGetAll } from '../../../../constants/contextpath/admin/vendormanagement/VendorManagement';
import { kannelHostGetAll } from '../../../../constants/contextpath/admin/vendormanagement/VendorManagement';
import { smscGetAll } from '../../../../constants/contextpath/admin/vendormanagement/VendorManagement';
import { dcSmscidSave } from '../../../../constants/contextpath/admin/vendormanagement/VendorManagement';
function DcSmscidCreate() {
    const dispatch = useDispatch();

    // Set the page name in the Redux store
    const pagename = { pagename: 'Dc Smscid Create' };
    dispatch(pagenamechange(pagename));

    const [error, Seterror] = useState("");
    const [success, Setsuccess] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const [ErrorMessage, setErrorMessage] = useState("");
    const [DataCenter, SetDataCenter] = useState();
    const [kannelhostname, Setkannelhostname] = useState();
    const [filterdkannelhostname, Setfilterdkannelhostname] = useState();

    const [Smsc, SetSmsc] = useState();



    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await connectAPIViaGet(`${smscGetAll}?all=true`);
                SetSmsc(response.data.data);
            } catch (error) {
                console.error('Error fetching customer list:', error);
            }
            try {
                const response = await connectAPIViaGet(`${dataCenterGetAll}?all=true`);
                SetDataCenter(response.data.data);
            } catch (error) {
                console.error('Error fetching customer list:', error);
            }
            try {
                const response = await connectAPIViaGet(`${kannelHostGetAll}?all=true`);
                Setkannelhostname(response.data.data);
            } catch (error) {
                console.error('Error fetching customer list:', error);
            }

        };

        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        ip: '',
        password: '',
        port: '',
        securelevel: '',
        smscid: '',
        tps: '',
        username: '',
        dcname: '',
        kannelhostname: ''

    });

    // Handle input changes and validations
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Validate the password fields


        // Set the field value
        if (name === 'dcname') {
            const filterdkannelhostoptions = kannelhostname.filter(item => item.dcname === (value));
            console.log(filterdkannelhostoptions, "test")
            Setfilterdkannelhostname(filterdkannelhostoptions)
        }

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
        connectAPIViaPost(updatedFormData, dcSmscidSave)
            .then((response) => {
                Setsuccess('Dc SMSCId created successfully');
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
                <p className="text-admin-color2">Vendor Management &gt; Dc Smscid Create</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <div>
                                <h1 className="text-xl font-semibold admin-table-text text-table-text">Dc Smscid Create</h1>
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
                                        Data Center
                                    </label>

                                    <div className="relative">
                                        <select
                                            name="dcname"
                                            value={formData.dcname}
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                                        >
                                            <option value="" disabled defaultValue>
                                                Data Center
                                            </option>
                                            {DataCenter &&
                                                DataCenter.map((DataCenter) => (
                                                    <option key={DataCenter.dcname} value={DataCenter.dcname}>
                                                        {DataCenter.dcname}
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


                                <div className="md:w-1/2 px-3 mb-4 md:mb-0 relative group">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="carrier_id">
                                        Kannel Host Name

                                    </label>

                                    <div className="relative">
                                        <select
                                            name="kannelhostname"
                                            value={formData.kannelhostname}
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                                        >
                                            <option value="" disabled defaultValue>
                                                Kannel Host Name
                                            </option>
                                            {filterdkannelhostname && filterdkannelhostname.length > 0 &&
                                                filterdkannelhostname.map((kannelhostname) => (
                                                    <option key={kannelhostname.kannelhostname} value={kannelhostname.kannelhostname}>
                                                        {kannelhostname.kannelhostname}
                                                    </option>
                                                ))}
                                        </select>
                                        {formData.dcname && filterdkannelhostname.length === 0 && (
                                            <p className="text-red-500 text-xs italic mt-1">
                                                No available kannelhostname options. Please choose an Another Data Center
                                                first.
                                            </p>
                                        )}

                                        {!formData.dcname && (
                                            <p className="absolute left-3 top-full mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Choose a Data Center first.
                                            </p>
                                        )}



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
                                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="username">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        maxLength={16}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="username"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="text"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        maxLength={9}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="password"
                                        placeholder="Password"
                                    />
                                    {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>} {/* Display error message */}
                                </div>
                            </div>

                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="port">
                                        Port
                                    </label>
                                    <input
                                        type="text"
                                        name="port"
                                        value={formData.port}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="port"
                                        placeholder="Port"
                                    />
                                </div>
                                <div className="md:w-1/2 px-3 relative">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="securelevel">
                                        Secure Level
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="securelevel"
                                            value={formData.securelevel}
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                            id="securelevel"
                                        >
                                            <option value="" disabled>Select Secure Level</option> {/* Disabled Default Option */}
                                            <option value="SSL">SSL</option>
                                            <option value="NON SSL">NON SSL</option>
                                        </select>
                                        {/* Dropdown Arrow */}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="-mx-3 md:flex md:mb-4">

                                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="carrier_id">
                                        Smsc
                                    </label>

                                    <div className="relative">
                                        <select
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
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>



                                {/* <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="smscid">
                                        SMSC ID
                                    </label>
                                    <input
                                        type="text"
                                        name="smscid"
                                        value={formData.smscid}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="smscid"
                                        placeholder="SMSC ID"
                                    />
                                    {ErrorMessage && <p className="text-red-500 text-xs italic">{ErrorMessage}</p>}

                                </div> */}
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="tps">
                                        TPS
                                    </label>
                                    <input
                                        type="text"
                                        name="tps"
                                        value={formData.tps}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="tps"
                                        placeholder="TPS"
                                    />
                                </div>
                            </div>






                            <div className="-mx-3 md:flex md:mb-4">


                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="ip">
                                        IP Address
                                    </label>
                                    <input
                                        type="text"
                                        name="ip"
                                        value={formData.ip}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="ip"
                                        placeholder="IP Address"
                                    />
                                </div>
                            </div>



                            <div className="">
                                <Button>Create Dc Smsc Id</Button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default DcSmscidCreate;