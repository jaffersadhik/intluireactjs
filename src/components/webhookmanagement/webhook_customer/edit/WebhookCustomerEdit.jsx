import React, { useState, useEffect } from 'react';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { connectAPIViaPost } from '../../../../services/Post';
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import { connectAPIViaGet } from '../../../../services/Get';
import { customerGetAll } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';
import { useLocation } from 'react-router-dom';
import { webhookCustomerEdit } from '../../../../constants/contextpath/admin/webhookmanagement/WebhookManagement';
function WebhookCustomerEdit() {
    const dispatch = useDispatch();
    const pagename = { pagename: 'Webhook Customer Edit' };
    dispatch(pagenamechange(pagename));
    const location = useLocation();

    const webhookCustomer = location.state?.WebhookCustomer; 

    const [Customer, setCustomer] = useState();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await connectAPIViaGet(`${customerGetAll}?all=true`);
                // console.log(response.data);
                setCustomer(response.data.data);
            } catch (error) {
                console.error('Error fetching customer list:', error);
            }
        };

        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        postdata: webhookCustomer?.postdata || '',
        weghookurl: webhookCustomer?.weghookurl || '',
        webhookcustomer_id: webhookCustomer?.webhookcustomer_id || '',
        customername: webhookCustomer?.customername || '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const missingFields = [];
        Object.keys(formData).forEach(key => {
            if (formData[key].trim() === '') {
                missingFields.push(key);
            }
        });

        if (missingFields.length > 0) {
            setError(`Please fill in the following fields: ${missingFields.join(', ')}`);
            setSuccess('');
            return;
        }

        connectAPIViaPost(formData,webhookCustomerEdit )
            .then((response) => {
                console.log('POST request successful:', response.data);
                setSuccess('Webhook Customer  Updated successfully');
                setError('');
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response from API:', error.response);
                    setSuccess('');
                    const errorMessage = error.response.data.error || 'An error occurred. Please try again.';
                    setError(errorMessage);
                } else {
                    setError('An error occurred. Please try again.');
                }
            });
    };

    return (
        <div className='w-[100%] h-auto min-h-screen admin-inner-body1 pb-10'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Webhook Management &gt; Webhook Customer Edit</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text text-table-text">Webhook Customer Edit</h1>
                        </div>

                        {error && (
                            <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                <IoIosWarning className="text-xl mr-2" />
                                <span className="flex-grow">{error}</span>
                                <button
                                    onClick={() => setError('')}
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
                                    onClick={() => setSuccess('')}
                                    className="text-green-700 hover:text-green-900"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="weghookurl">
                                        Webhook URL
                                    </label>
                                    <input
                                        name="weghookurl"
                                        value={formData.weghookurl}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="weghookurl"
                                        type="text"
                                        placeholder="Webhook URL"
                                    />
                                </div>


                                <div className="md:w-1/2 px-3 group relative">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="customer_id">
                                        Customer
                                    </label>
                                    <select
                                        id="customername"
                                        name="customername"
                                        value={formData.customername}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-gray-200 text-grey-darker border border-gray-400 rounded py-2 px-2 mb-3 cursor-not-allowed"
                                        disabled
                                    >
                                        <option value="" disabled defaultValue>
                                            Select Customer
                                        </option>
                                        {Customer &&
                                            Customer.map((customer) => (
                                                <option key={customer.customer_id} value={customer.customername}>
                                                    {customer.customername}
                                                </option>
                                            ))}
                                    </select>
                                    <p className="absolute left-4 top-16 mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Customer selection is not available for now.
                                    </p>
                                </div>

                            </div>
                            <div className="-mx-3 md:flex md:mb-4">
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="postdata">
                                        Post Data
                                    </label>
                                    <input
                                        name="postdata"
                                        value={formData.postdata}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="postdata"
                                        type="text"
                                        placeholder="Post Data"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <Button type="submit">Updated Webhook Customer</Button>
                            </div>
                        </form>





                    </main>
                </div>
            </div>
        </div>
    );
}

export default WebhookCustomerEdit;
