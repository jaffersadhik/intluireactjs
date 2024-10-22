import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connectAPIViaPost } from '../../../../services/Post';
import { Base64 } from 'js-base64';
import { useDispatch } from 'react-redux';
import { pagenamechange } from "../../../../store/AuthSlice";
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import validatePassword from '../../../../utils/modules/PasswordValidator';
import { companyUpdate } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';
function CompanyEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Set the page name in the Redux store
    const pagename = { pagename: 'Company Edit' };
    dispatch(pagenamechange(pagename));

    const [error, Seterror] = useState("");
    const [success, Setsuccess] = useState("");
    const [passwordError, setPasswordError] = useState('');

    // State for form fields
    const [formData, setFormData] = useState({

        activestatus: false,
        address: '',
        blockcustomer: false,
        email: '',
        fullname: '',
        mobilenumber: '',
        password: '',
        username: '',
    });

    // Effect to set initial form data from location state
    useEffect(() => {
        if (location.state) {
            const { company } = location.state;
            setFormData({
                company_id :company.company_id,
                activestatus: company.activestatus,
                address: company.address,
                blockcustomer: company.blockcustomer,
                email: company.email,
                fullname: company.fullname,
                mobilenumber: company.mobilenumber,
                password: Base64.decode(company.password) || '',
                username: Base64.decode(company.username) || '',
            });
        }
    }, [location.state]);

    // Handle input changes and validations
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: fieldValue });

        if (name === 'password') {
            const error = validatePassword(value);
            setPasswordError(error);
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

        // Encode password before sending if it's set
        const updatedFormData = {
            ...formData,
            password: formData.password ? Base64.encode(formData.password) : undefined, // Encode only if provided
            username: Base64.encode(formData.username),
        };

        // Submit form data via API
        connectAPIViaPost(updatedFormData,companyUpdate)
            .then((response) => {
                Setsuccess('Company updated successfully');
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
                <p className="text-admin-color2">Account Management &gt; Company Edit</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <div>
                                <h1 className="text-xl font-semibold admin-table-text text-table-text">Company Edit</h1>
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
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="fullname">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="fullname"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="username">
                                        Username
                                    </label>
                                    <input
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        maxLength={16}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                    />
                                </div>
                            </div>

                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        maxLength={9}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="password"
                                        placeholder="Password"
                                    />
                                    {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
                                </div>
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                            </div>

                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="mobilenumber">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="text"
                                        name="mobilenumber"
                                        value={formData.mobilenumber}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="mobilenumber"
                                        placeholder="Mobile Number"
                                    />
                                </div>
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="address">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="address"
                                        placeholder="Address"
                                    />
                                </div>
                            </div>

                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="activestatus">
                                        Active Status:
                                    </label>
                                    <select
                                        name="activestatus"
                                        value={formData.activestatus ? '1' : '0'} // Use '1' for true and '0' for false
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="blockcustomer">
                                        Block Customer:
                                    </label>
                                    <select
                                        name="blockcustomer"
                                        value={formData.blockcustomer ? '1' : '0'} // Use '1' for true and '0' for false
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                    >
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>


                            <div className="">
                                <Button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default CompanyEdit;
