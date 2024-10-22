import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { pagenamechange } from '../../../../store/AuthSlice';
import { connectAPIViaPost } from '../../../../services/Post';
import { IoIosWarning } from 'react-icons/io';
import { IoCheckmarkCircleSharp, IoClose } from 'react-icons/io5';
import { Button } from '../../../../utils/modules/Button';
import { accountGetAll } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';
import { connectAPIViaGet } from '../../../../services/Get';
import { Base64 } from 'js-base64';
import { webhookAccountEdit } from '../../../../constants/contextpath/admin/webhookmanagement/WebhookManagement';
function WebhookAccountEdit() {
    const dispatch = useDispatch();
    const location = useLocation();
    const webhookAccount = location.state?.WebhookAccount; // Accessing the webhook account data

    const pagename = { pagename: 'Webhook Account Edit' };
    dispatch(pagenamechange(pagename));

    const [Account, setAccount] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await connectAPIViaGet(`${accountGetAll}?all=true`);
                setAccount(response.data.data); 
            } catch (error) {
                console.error('Error fetching account list:', error);
            }
        };

        fetchData();
    }, []);

    // Define state for the form fields matching the Webhook Account model
    const [formData, setFormData] = useState({
        postdata: webhookAccount?.postdata || '',
        weghookurl: webhookAccount?.weghookurl || '',
        accountname: Base64.decode(webhookAccount.accountname) || '',
        webhookaccount_id : webhookAccount?.webhookaccount_id || '',
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
        const base64Encodedaccountname = Base64.encode(formData.accountname);
        const updatedFormData = {
            ...formData,
            accountname: base64Encodedaccountname,
           
          };
        connectAPIViaPost(updatedFormData,webhookAccountEdit)
            .then((response) => {
                console.log('POST request successful:', response.data);
                setSuccess('Webhook Account updated successfully');
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
                <p className="text-admin-color2">Webhook Management &gt; Webhook Account Edit</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text text-table-text">Webhook Account Edit</h1>
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

                                <div className="md:w-1/2 px-3 mb-6 md:mb-0 group relative">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="accountname">
                                        Account Name
                                    </label>
                                    <input
                                        type="text"
                                        name="accountname"
                                        value={formData.accountname}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-gray-200 text-grey-darker border border-gray-400 rounded py-2 px-2 mb-3 cursor-not-allowed"
                                        id="accountname"
                                        placeholder="Account Name"
                                        disabled
                                    />
                                    <p className="absolute left-4 top-16 mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Account Name is not editable for now.
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
                                <Button type="submit">Update Webhook Account</Button>
                            </div>
                        </form>

                    </main>
                </div>
            </div>
        </div>
    );
}

export default WebhookAccountEdit;