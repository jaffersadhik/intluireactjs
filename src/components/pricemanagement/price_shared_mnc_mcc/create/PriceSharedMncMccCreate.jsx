import React, { useState, useEffect } from 'react';
import { connectAPIViaPost } from '../../../../services/Post';
import { useDispatch } from 'react-redux';
import { pagenamechange } from "../../../../store/AuthSlice";
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import { connectAPIViaGet } from '../../../../services/Get';
import { countryGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { priceSharedMncmccCreate } from '../../../../constants/contextpath/admin/pricemanagement/PriceManagement';
import { mncmccList } from '../../../../constants/contextpath/admin/numbering_plan/Numbering_plan';
function PriceSharedMncMccCreate() {
    const dispatch = useDispatch();

    const pagename = { pagename: 'Price Shared Mnc Mcc Create' };
    dispatch(pagenamechange(pagename));

    const [error, Seterror] = useState("");
    const [success, Setsuccess] = useState("");
    const [Country, setCountry] = useState();
    const [Mcc, setMcc] = useState([]);
    const [MccMnc, setMccMnc] = useState([]);
    const [mncOptions, setMncOptions] = useState([]); // State for MNC options
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await connectAPIViaGet(countryGetAll);
                setCountry(response.data);
            } catch (error) {
                console.error('Error fetching country list:', error);
            }
            try {
                const response = await connectAPIViaGet(`${mncmccList}?all=true`);
                setMccMnc(response.data);
                // Set unique MCCs
                setMcc([...new Map(response.data.map(item => [item.mcc, item])).values()]);
            } catch (error) {
                console.error('Error fetching MNC/MCC list:', error);
            }
           
        };

        fetchData();
    }, []);

    // State for form fields
    const [formData, setFormData] = useState({
        price: '',
        dial_in_code: '',
        mcc: '',
        mnc: '',
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

        // Submit form data via API (update the API endpoint accordingly)
        connectAPIViaPost(formData,priceSharedMncmccCreate ) // Replace with the actual endpoint
            .then((response) => {
                Setsuccess('Price Shared Mnc Mcc created successfully');
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
                <p className="text-admin-color2">Price Management &gt; Price Shared Mnc Mcc Create</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <div>
                                <h1 className="text-xl font-semibold admin-table-text text-table-text">Price Shared Mnc Mcc Create</h1>
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

                  
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="dial_in_code">
                                        Dial-In Code
                                    </label>
                                    <select
                                        id="dial_in_code"
                                        name="dial_in_code"
                                        value={formData.dial_in_code}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
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
                                </div>
                            </div>
                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="mcc">
                                        MCC
                                    </label>
                                    <select
                                        id="mcc"
                                        name="mcc"
                                        value={formData.mcc}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                                    >
                                        <option value="" disabled defaultValue>
                                            Select MCC
                                        </option>
                                        {Mcc &&
                                            Mcc.map((mccItem) => (
                                                <option key={mccItem.mncmcc_id} value={mccItem.mcc}>
                                                    {mccItem.mcc}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="md:w-1/2 px-3 relative group">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="mnc">
                                        MNC
                                    </label>
                                    <select
                                        id="mnc"
                                        name="mnc"
                                        value={formData.mnc}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                                    >
                                        <option value="" disabled defaultValue>
                                            Select MNC
                                        </option>
                                        {mncOptions &&
                                            mncOptions.map((mncItem) => (
                                                <option key={mncItem.mncmcc_id} value={mncItem.mnc}>
                                                    {mncItem.mnc} - {mncItem.networkoperatorname}
                                                </option>
                                            ))}
                                    </select>
                                    {formData.mcc && mncOptions.length === 0 && (
                                        <p className="text-red-500 text-xs italic mt-1">
                                            No available MNC options. Please choose an MCC first.
                                        </p>
                                    )}
                                    {formData.mcc === '' && mncOptions.length === 0 && (
                                        <p className="absolute left-3 top-full mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            Choose an MCC first.
                                        </p>
                                    )}
                                </div>
                            </div>
                         
                            <div className="form-group">
                                <Button type="submit">Create Price Shared Mnc Mcc</Button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default PriceSharedMncMccCreate;