import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connectAPIViaPost } from '../../../../services/Post';
import { useDispatch } from 'react-redux';
import { pagenamechange } from "../../../../store/AuthSlice";
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import { connectAPIViaGet } from '../../../../services/Get';
import { countryGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { priceCustomerUpdate } from '../../../../constants/contextpath/admin/pricemanagement/PriceManagement';
function PriceCustomerEdit() {  // Updated component name
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const PriceCustomer = location.state.PriceCustomer;  // Changed costsmscview to PriceAccount

    const pagename = { pagename: 'Price Customer Edit' };  // Updated page name
    dispatch(pagenamechange(pagename));

    const [error, Seterror] = useState("");
    const [success, Setsuccess] = useState("");
    const [Country, setCountry] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await connectAPIViaGet(countryGetAll);
                setCountry(response.data);
            } catch (error) {
                console.error('Error fetching country list:', error);
            }
        };

        fetchData();
    }, []);

    // Updated formData fields to match PriceAccount
    const [formData, setFormData] = useState({
        price_id: PriceCustomer.price_id || '',
        price: PriceCustomer.price || '',
        customername: PriceCustomer.customername || '',
        dial_in_code: PriceCustomer.dial_in_code || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
      
        const missingFields = Object.keys(formData).filter(key => {
            return formData[key] === '' || formData[key] === null;
        });

        if (missingFields.length > 0) {
            Seterror(`Please fill in the following fields: ${missingFields.join(', ')}`);
            Setsuccess('');
            return;
        }

     
        connectAPIViaPost(formData,priceCustomerUpdate)  // Updated the API URL
            .then((response) => {
                Setsuccess('Price Customer updated successfully');
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
                <p className="text-admin-color2">Price Management &gt; Price Customer Edit</p> {/* Updated breadcrumb */}
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <div>
                                <h1 className="text-xl font-semibold admin-table-text text-table-text">Price Customer Edit</h1>  {/* Updated title */}
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
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="price">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="price"
                                        placeholder="Price"
                                    />
                                </div>

                                <div className="md:w-1/2 px-3 mb-6 md:mb-0 group relative">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="accountname">
                                    customer Name
                                    </label>
                                    <input
                                        type="text"
                                        name="customername"
                                        value={formData.customername}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-gray-200 text-grey-darker border border-gray-400 rounded py-2 px-2 mb-3 cursor-not-allowed"
                                        id="customername"
                                        placeholder="customername Name"
                                        disabled
                                    />
                                    <p className="absolute left-4 top-16 mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    customername Name is not editable for now.
                                    </p>
                                </div>

                            </div>

                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0 group relative">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="dial_in_code">
                                        Dial-In Code
                                    </label>
                                    <select
                                        id="dial_in_code"
                                        name="dial_in_code"
                                        value={formData.dial_in_code}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-gray-200 text-grey-darker border border-gray-400 rounded py-2 px-2 mb-3 cursor-not-allowed"
                                        disabled
                                    >
                                        <option value="" disabled>
                                            Select Dial-In Code
                                        </option>
                                        {Country &&
                                            Country.map((country) => (
                                                <option key={country.country_id} value={country.dial_in_code}>
                                                    {country.country} -- {country.dial_in_code}
                                                </option>
                                            ))}
                                    </select>
                                    <p className="absolute left-4 top-16 mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Dial-In Code is not editable for now.
                                    </p>
                                </div>
                            </div>

                            <div className="form-group">
                                <Button >Update Price Customer</Button>  {/* Updated button label */}
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default PriceCustomerEdit;  // Exporting the updated component
