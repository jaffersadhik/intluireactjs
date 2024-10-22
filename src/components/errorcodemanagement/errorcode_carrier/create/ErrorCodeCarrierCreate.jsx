import React, { useState, useEffect } from 'react';
import { connectAPIViaPost } from '../../../../services/Post';
import { useDispatch } from 'react-redux';
import { pagenamechange } from "../../../../store/AuthSlice";
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import { connectAPIViaGet } from '../../../../services/Get';
import { carrierGetAll } from '../../../../constants/contextpath/admin/vendormanagement/VendorManagement';
import { errorcodeCarrierCreate } from '../../../../constants/contextpath/admin/errorcodemanagement/Errorcodemanagement';
function ErrorCodeCarrierCreate() {
    const dispatch = useDispatch();

    // Set the page name in the Redux store
    const pagename = { pagename: 'ErrorCode Carrier Create' };
    dispatch(pagenamechange(pagename));

    const [error, Seterror] = useState("");
    const [success, Setsuccess] = useState("");
    const [errorcode, Seterrorcode] = useState("");
    const [Platformerrorcode, SetPlatformerrorcode] = useState("");
    const [statuserrorcode, Setstatuserrorcode] = useState("");
    const [Carrier, SetCarrier] = useState();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await connectAPIViaGet(`${carrierGetAll}?all=true`);
                // console.log(response.data);
                SetCarrier(response.data.data);
            } catch (error) {
                console.error('Error fetching customer list:', error);
            }
        };

        fetchData();
    }, []);

    // Updated state for form fields
    const [formData, setFormData] = useState({
        description: '',
        errorcode: '',
        platformerrorcode: '',
        status: '',
        carriername: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation to prevent spaces for 'errorcode'
        if (name === 'errorcode' && /\s/.test(value)) {
            Seterrorcode('Error code cannot contain spaces.');
            return;
        } else {
            Seterrorcode(''); // Clear error message if input is valid
        }
        if (name === 'platformerrorcode' && /\s/.test(value)) {
            SetPlatformerrorcode('Platform Errorcode cannot contain spaces.');
            return;
        } else {
            SetPlatformerrorcode(''); // Clear error message if input is valid
        }
        if (name === 'status' && /\s/.test(value)) {
            Setstatuserrorcode('Status cannot contain spaces.');
            return;
        } else {
            Setstatuserrorcode(''); // Clear error message if input is valid
        }


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
        connectAPIViaPost(formData, errorcodeCarrierCreate)
            .then((response) => {
                Setsuccess('ErrorCode Carrier Created successfully');
                Seterror('');
            })
            .catch((error) => {
                if (error.response) {
                    const errorMessage = error.response.data.error || 'An error occurred. Please try again.';
                    Seterror(errorMessage);
                }
            });
    };

    // Function to decode account names
    const decodeaccount = (encodedPassword) => {
        try {
            return atob(encodedPassword);
        } catch (error) {
            return "Invalid Decoding";
        }
    };

    return (
        <div className='w-[100%] h-auto min-h-screen admin-inner-body1 pb-10'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Errorcode Management &gt; ErrorCode Carrier Create</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text text-table-text">ErrorCode Carrier Create</h1>
                        </div>
                        {error && (
                            <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                <IoIosWarning className="text-xl mr-2" />
                                <span className="flex-grow">{error}</span>
                                <button onClick={() => Seterror('')} className="text-red-700 hover:text-red-900">
                                    <IoClose />
                                </button>
                            </div>
                        )}
                        {success && (
                            <div className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                <IoCheckmarkCircleSharp className="text-xl mr-2" />
                                <span className="flex-grow">{success}</span>
                                <button onClick={() => Setsuccess('')} className="text-green-700 hover:text-green-900">
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

                                <div className="md:w-1/2 px-3 mb-4 md:mb-0 group relative">
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
                                    <p className="absolute left-4 top-16 mt-1 text-xs text-red-500  transition-opacity duration-300">
                                        {errorcode}
                                    </p>
                                </div>

                            </div>

                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3 mb-4 md:mb-0 group relative">
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
                                    <p className="absolute left-4 top-16 mt-1 text-xs text-red-500  transition-opacity duration-300">
                                        {Platformerrorcode}
                                    </p>
                                </div>

                                <div className="md:w-1/2 px-3 group relative">
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
                                    <p className="absolute left-4 top-16 mt-1 text-xs text-red-500  transition-opacity duration-300">
                                        {statuserrorcode}
                                    </p>
                                </div>
                            </div>

                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3">

                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="dial_in_code">
                                        carriername
                                    </label>

                                    <select
                                        id="carriername"
                                        name="carriername"
                                        value={formData.carriername}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                                    >
                                        <option value="" disabled defaultValue>
                                            carriername


                                        </option>
                                        {Carrier &&
                                            Carrier.map((Carrier) => (
                                                <option key={Carrier.carrier_id} value={Carrier.carriername
                                                }>
                                                    {Carrier.carriername}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <Button>Error Code Account Create</Button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ErrorCodeCarrierCreate;