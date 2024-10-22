import React, { useState, useEffect } from 'react';
import { connectAPIViaPost } from '../../../../services/Post';
import { useDispatch } from 'react-redux';
import { pagenamechange } from "../../../../store/AuthSlice";
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import { connectAPIViaGet } from '../../../../services/Get';
import { dataCenterGetAll } from '../../../../constants/contextpath/admin/vendormanagement/VendorManagement';
import { kannelHostEdit } from '../../../../constants/contextpath/admin/vendormanagement/VendorManagement';
import { useLocation } from 'react-router-dom';

function KannelHostEdit() {
    const dispatch = useDispatch();
    const location = useLocation();
    const KannelHost = location.state?.KannelHost;
    // Set the page name in the Redux store
    const pagename = { pagename: 'Kannel Host Edit' };
    dispatch(pagenamechange(pagename));

    const [error, Seterror] = useState("");
    const [success, Setsuccess] = useState("");
    const [DataCenter, SetDataCenter] = useState();




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await connectAPIViaGet(`${dataCenterGetAll}?all=true`);
                SetDataCenter(response.data.data);
            } catch (error) {
                console.error('Error fetching customer list:', error);
            }



        };

        fetchData();
    }, []);

    // const [formData, setFormData] = useState({
    //     kannelhostname: '',
    //     dcname: '',

    // });
    
  const [formData, setFormData] = useState({

    kannelhostname: KannelHost?.kannelhostname || '',
    dcname: KannelHost?.dcname || '',
  });

    // Handle input changes and validations
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
        connectAPIViaPost(formData,kannelHostEdit )
            .then((response) => {
                Setsuccess('Kannel Host created successfully');
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
                <p className="text-admin-color2">Vendor Management &gt; Kannel Host Edit</p>
            </div>
            <div className="md:px-[23px] px-[8px]">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <div>
                                <h1 className="text-xl font-semibold admin-table-text text-table-text">Kannel Host Edit</h1>
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
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="carrier_id">
                                    Data Center 
                                    </label>

                                    <div className="relative">
                                        <select
                                            name="dcname"
                                            value={formData.dcname}
                                            onChange={handleChange}
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                                        >
                                            <option value="" disabled defaultValue>
                                            Data Center 
                                            </option>
                                            {DataCenter &&
                                                DataCenter.map((DataCenter) => (
                                                    <option key={DataCenter.dcname} value={DataCenter.dcname}>
                                                        {DataCenter.dcname}
                                                    </option>
                                                ))}
                                        </select>
                                        {/* Down Arrow */}
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-1/2 px-3 mb-4 md:mb-0 group relative">
    <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="kannelhostname">
        kannelhostname
    </label>
    <input
        name="kannelhostname"
        value={formData.kannelhostname}
        onChange={handleChange}
        className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3 cursor-not-allowed"
        id="kannelhostname"
        type="text"
        placeholder="Enter kannelhostname"
        disabled
    />
    <p className="absolute left-4 top-16 mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        kannelhostname is not editable for now.
    </p>
</div>


                            </div>













                            <div className="">
                                <Button>Update KannelHost</Button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default KannelHostEdit;
