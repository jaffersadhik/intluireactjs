import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Base64 } from 'js-base64';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";

function WebhookCustomerView() {
    const location = useLocation();
    const dispatch = useDispatch();
    const pagename = { pagename: 'Webhook Customer View' };  // Update the page name
    dispatch(pagenamechange(pagename));

    // Access the webhook account data from location
    const webhookCustomer = location.state?.WebhookCustomer    
    

    
    return (
        <div className='w-full h-auto min-h-screen admin-inner-body1 pb-10 bg-gray-100'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Webhook Management &gt; Webhook Customer     View</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl shadow-md">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-semibold admin-table-text">Webhook Customer     Details</h1>
                        </div>

                        {/* Webhook Account Card */}
                        {webhookCustomer ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 admin-table-text">
                                    {/* Webhook Account Info */}
                                    <div className="p-4 border rounded-lg shadow-sm">
                                        <h2 className="text-xl font-semibold admin-table-text mb-4">
                                            Webhook Customer     Information
                                        </h2>
                                        <p className="mb-2"><strong>Post Data:</strong> {webhookCustomer.postdata || 'N/A'}</p>
                                        <p className="mb-2"><strong>Webhook URL:</strong> {webhookCustomer.weghookurl || 'N/A'}</p>
                                        <p className="mb-2"><strong>Customer Name:</strong> {webhookCustomer.customername || 'N/A'}</p>
                                        
                                        <p className="mb-2"><strong>Created Date:</strong> {new Date(webhookCustomer.created_date).toLocaleString()}</p>
                                        {webhookCustomer.update_date && (
                                            <p className="mb-2"><strong>Update Date:</strong> {new Date(webhookCustomer.update_date).toLocaleString()}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg font-semibold admin-table-text">No Webhook Customer     data available</div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default WebhookCustomerView;
