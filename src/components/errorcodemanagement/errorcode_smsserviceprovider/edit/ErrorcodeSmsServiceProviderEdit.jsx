import React, { useState, useEffect } from 'react';
import { connectAPIViaPost } from '../../../../services/Post';
import { useDispatch } from 'react-redux';
import { pagenamechange } from "../../../../store/AuthSlice";
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import { connectAPIViaGet } from '../../../../services/Get';
import { errorcodePlatformGetAll } from '../../../../constants/contextpath/admin/errorcodemanagement/Errorcodemanagement';
import { errorcodeSmsServiceProviderSave } from '../../../../constants/contextpath/admin/errorcodemanagement/Errorcodemanagement';
import { useLocation } from 'react-router-dom';

function ErrorcodeSmsServiceProviderEdit() {
    const dispatch = useDispatch();
    const location = useLocation();
    const data = location.state.ErrorcodeSmsServiceProviderEdit;  // Changed costsmscview to PriceAccount

    // Set the page name in the Redux store
    const pagename = { pagename: 'Errorcode Sms Service Provider Edit' };
    dispatch(pagenamechange(pagename));

    const [error, Seterror] = useState("");
    const [success, Setsuccess] = useState("");
    const [PlatformErrorCode, setPlatformErrorCode] = useState();

    // Retrieve the existing form data from location state
    const [formData, setFormData] = useState({
        description: data?.description || '',
        errorcode: data?.errorcode || '',
        platformerrorcode: data?.platformerrorcode || '',
        status: data?.status || '',
        errorcode_id: data?.errorcode_id || '',
        smsserviceprovider: data?.smsserviceprovider || '',



    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await connectAPIViaGet(`${errorcodePlatformGetAll}?all=true`);
                setPlatformErrorCode(response.data.data);
            } catch (error) {
                console.error('Error fetching account list:', error);
            }
        };

        fetchData();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
        connectAPIViaPost(formData, errorcodeSmsServiceProviderSave)
            .then((response) => {
                Setsuccess('Errorcode Sms Service Provider updated successfully');
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
                <p className="text-admin-color2">Errorcode Management &gt; Errorcode Sms Service Provider Edit</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <div>
                                <h1 className="text-xl font-semibold admin-table-text text-table-text">Errorcode Sms Service Provider Edit</h1>
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
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="description"
                                        placeholder="Description"
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="errorcode">
                                        Error Code
                                    </label>
                                    <input
                                        type="text"
                                        name="errorcode"
                                        value={formData.errorcode}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="errorcode"
                                        placeholder="Error Code"
                                    />
                                </div>
                            </div>

                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3 group relative">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="platformerrorcode">
                                        Platform Error Code
                                    </label>
                                    <select
                                        name="platformerrorcode"
                                        value={formData.platformerrorcode}
                                        onChange={handleChange}
                                        id="platformerrorcode"
                                        disabled
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                                    >
                                        <option value="" disabled>
                                            Select Platform Error Code
                                        </option>
                                        {PlatformErrorCode &&
                                            PlatformErrorCode.map((PlatformErrorCode) => (
                                                <option key={PlatformErrorCode.account_id} value={PlatformErrorCode.errorcode}>
                                                    {PlatformErrorCode.errorcode}
                                                </option>
                                            ))}
                                    </select>
                                    <p className="absolute left-4 top-16 mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Platform Error Code  is not editable for now.
                                    </p>
                                </div>

                                <div className="md:w-1/2 px-3 mb-4 md:mb-0 group relative">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="status">
                                        Status
                                    </label>
                                    <input
                                        type="text"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3 cursor-not-allowed"
                                        id="status"
                                        placeholder="Status"
                                        disabled // Disable the input field
                                    />
                                    <p className="absolute left-4 top-16 mt-1 text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {"Status field is not editable for now."}
                                    </p>
                                </div>

                            </div>

                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3 mb-4 md:mb-0 group relative">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="smsserviceprovider">
                                        SMS Service Provider
                                    </label>
                                    <input
                                        type="text"
                                        name="smsserviceprovider"
                                        value={formData.smsserviceprovider}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="smsserviceprovider"
                                        placeholder="SMS Service Provider"
                                        disabled
                                    />

                                    <p className="absolute left-4 top-16 mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Sms Service Provider is not editable for now.
                                    </p>
                                </div>
                            </div>

                            <div className="form-group">
                                <Button type="submit">Update Errorcode Account</Button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ErrorcodeSmsServiceProviderEdit;
