import React, { useState, useEffect } from 'react';
import { connectAPIViaPost } from '../../../../services/Post';
import { useDispatch } from 'react-redux';
import { pagenamechange } from "../../../../store/AuthSlice";
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import { connectAPIViaGet } from '../../../../services/Get';
import { customerGetAll } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';
import { errorcodeCustomerSave } from '../../../../constants/contextpath/admin/errorcodemanagement/Errorcodemanagement';
import { errorcodePlatformGetAll } from '../../../../constants/contextpath/admin/errorcodemanagement/Errorcodemanagement';
function ErrorcodeCustomerCreate() {
    const dispatch = useDispatch();

    // Set the page name in the Redux store
    const pagename = { pagename: 'Errorcode Customer Create' };
    dispatch(pagenamechange(pagename));

    const [error, Seterror] = useState("");
    const [success, Setsuccess] = useState("");
    const [Customer, setCustomer] = useState();
    const [PlatformErrorCode, setPlatformErrorCode] = useState();

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await connectAPIViaGet(`${customerGetAll}?all=true`);
                setCustomer(response.data.data);
            } catch (error) {
                console.error('Error fetching account list:', error);
            }
            try {
                const response = await connectAPIViaGet(`${errorcodePlatformGetAll}?all=true`);
                setPlatformErrorCode(response.data.data);
            } catch (error) {
                console.error('Error fetching account list:', error);
            }
        };

        fetchData();
    }, []);

    // State for form fields
    const [formData, setFormData] = useState({
        description: '',
        errorcode: '',
        platformerrorcode: '',
        status: '',
        customername: '',
    });

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
        connectAPIViaPost(formData, errorcodeCustomerSave)
            .then((response) => {
                Setsuccess('Errorcode Customer Created successfully');
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
                <p className="text-admin-color2">Errorcode Management &gt; Errorcode Customer Create</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <div>
                                <h1 className="text-xl font-semibold admin-table-text text-table-text">Errorcode Customer Create</h1>
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


                            <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="accountname">
                                    Platform Error Code
                                    </label>
                                    <select
                                        name="platformerrorcode"
                                        value={formData.platformerrorcode}
                                        onChange={handleChange}
                                        id="platformerrorcode"

                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                                    >
                                        <option value="" disabled>
                                            Select  Platform Error Code
                                        </option>
                                        {PlatformErrorCode &&
                                            PlatformErrorCode.map((PlatformErrorCode) => (
                                                <option key={PlatformErrorCode.account_id} value={PlatformErrorCode.errorcode}>
                                                    {PlatformErrorCode.errorcode}
                                                </option>
                                            ))}
                                    </select>
                                </div>


                                {/* <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="platformerrorcode">
                                        Platform Error Code
                                    </label>
                                    <input
                                        type="text"
                                        name="platformerrorcode"
                                        value={formData.platformerrorcode}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="platformerrorcode"
                                        placeholder="Platform Error Code"
                                    />
                                </div> */}

                                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="status">
                                        Status
                                    </label>
                                    <input
                                        type="text"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="status"
                                        placeholder="Status"
                                    />
                                </div>
                            </div>

                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="accountname">
                                    Customer Name
                                    </label>
                                    <select
                                        name="customername"
                                        value={formData.customername}
                                        id="customername"
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                                    >
                                        <option value="" disabled>
                                            Select Customer Name
                                        </option>
                                        {Customer &&
                                            Customer.map((Customer) => (
                                                <option key={Customer.account_id} value={Customer.customername}>
                                                    {Customer.customername}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <Button type="submit">Create Errorcode Account</Button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ErrorcodeCustomerCreate;
