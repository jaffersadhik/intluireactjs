import React, { useState, useEffect } from 'react';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { connectAPIViaPost } from '../../../../services/Post';
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import { useLocation } from 'react-router-dom';
import { webhookParameterEdit } from '../../../../constants/contextpath/admin/webhookmanagement/WebhookManagement';
function WebhookParameterIndexEdit() {
    const dispatch = useDispatch();
    const pagename = { pagename: 'Webhook Parameter Index Edit' };
    dispatch(pagenamechange(pagename));
    const location = useLocation();

    const WebhookParameterIndex = location.state?.WebhookParameterIndex; 

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const [formData, setFormData] = useState({
        indexnumber: WebhookParameterIndex?.indexnumber || '',
        parametername: WebhookParameterIndex?.parametername || '',
        webhookparameter_id: WebhookParameterIndex?.webhookparameter_id || '',

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const missingFields = [];
        Object.keys(formData).forEach(key => {
            if (typeof formData[key] === 'string' && formData[key].trim() === '') {
                // Only trim if the value is a string
                missingFields.push(key);
            } else if (formData[key] === '') {
                // For non-string values like numbers
                missingFields.push(key);
            }
        });
    
        if (missingFields.length > 0) {
            setError(`Please fill in the following fields: ${missingFields.join(', ')}`);
            setSuccess('');
            return;
        }
    
        connectAPIViaPost(formData, webhookParameterEdit)
            .then((response) => {
                console.log('POST request successful:', response.data);
                setSuccess('Webhook Parameter Index created successfully');
                setError('');
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response from API:', error.response);
                    const errorMessage = error.response.data.error || 'An error occurred. Please try again.';
                    setError(errorMessage);
                    setSuccess('');
                } else {
                    setError('An error occurred. Please try again.');
                }
            });
    };
    

    return (
        <div className='w-[100%] h-auto min-h-screen admin-inner-body1 pb-10'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Webhook Management &gt; Webhook Parameter Index Edit</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text text-table-text">Webhook Parameter Index Edit</h1>
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
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="indexnumber">
                                        Index Number
                                    </label>
                                    <input
                                        name="indexnumber"
                                        value={formData.indexnumber}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="indexnumber"
                                        type="number"  // Changed to number
                                        placeholder="Index Number"
                                    />

                                </div>

                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="parametername">
                                        Parameter Name
                                    </label>
                                    <input
                                        name="parametername"
                                        value={formData.parametername}
                                        onChange={handleChange}
                                        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                                        id="parametername"
                                        type="text"
                                        placeholder="Parameter Name"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <Button type="submit">Webhook Parameter Index Update</Button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default WebhookParameterIndexEdit;
