import React, { useState, useEffect } from 'react';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { connectAPIViaGet } from '../../../../services/Get';
import { useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaSearch } from 'react-icons/fa';
import { smsServiceProvidermainGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { connectAPIViaPost } from '../../../../services/Post';
import { smsServiceProvidermainCreate } from '../../../../constants/contextpath/admin/utils/Utils';
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';

function SmsServiceProvideList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pagename = { pagename: 'Sms Service Provide List' };
    dispatch(pagenamechange(pagename));

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [count, setcount] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false); // For popup visibility
    const [providerName, setProviderName] = useState("");  // For input value

    const [success, Setsuccess] = useState("");  // For input value
    const [error, Seterror] = useState("");  // For input value


    const TABLE_HEADERS = [
        { label: "smsserviceprovidername", key: "smsserviceprovidername" },
        { label: "Created Date", key: "created_date" },
    ];

    const fetchData = async (currentPage) => {
        try {
            const response = await connectAPIViaGet(`${smsServiceProvidermainGetAll}?page=${currentPage}&page_size=${pageSize}&search=${searchTerm}`);
            setData(response.data.data);
            setTotalPages(response.data.total_pages);
            setcount(response.data.total_items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page, searchTerm]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
        setProviderName("")
        Seterror('');

    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const restrictedValues = ['account', 'carrier', 'platform', 'customer'];

        // Check if providerName is empty
        if (providerName.length === 0) {
            Seterror('Please fill in the provider name.');
            Setsuccess('');
            return;
        }

        // Check if providerName contains restricted values
        if (restrictedValues.includes(providerName.toLowerCase())) {
            Seterror(`"${providerName}" is not an acceptable provider name.`);
            Setsuccess('');
            return;
        }

        const data = {
            smsserviceprovidername: providerName,
        };

        connectAPIViaPost(data, smsServiceProvidermainCreate)
            .then((response) => {
                console.log('POST request successful:', response.data);
                Setsuccess('Sms Service Provider created successfully');
                Seterror('');
                setIsPopupOpen(false); // Close popup on success
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response from API:', error.response);
                    const errorMessage = error.response.data.error || 'An error occurred. Please try again.';
                    Seterror(errorMessage);
                    Setsuccess('');
                } else {
                    console.error('Error without response:', error);
                    Seterror('An error occurred. Please try again.');
                    Setsuccess('');
                }
            });
    };


    return (
        <div className='w-[100%] h-auto min-h-screen admin-inner-body1 pb-10'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Account Management &gt; Sms Service Provide List </p>
            </div>

            <div className="md:px-[23px] px-[8px] ">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <div className="">
                                <h1 className="text-xl font-semibold admin-table-text text-table-text">Sms Service Provide List </h1>
                            </div>
                            <div className='flex'>
                                <button
                                    className="flex items-center uppercase gap-2 bg-admin-color2 p-2 rounded-md text-white"
                                    onClick={handleOpenPopup} // Open popup on click
                                >
                                    Sms Service Provide List <IoMdAddCircleOutline />
                                </button>
                            </div>
                        </div>
                        {/* {error && (
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
                        )} */}
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
                        {/* Search input */}
                        <div className="relative w-80 mb-2">
                            <label className="flex gap-x-2 items-baseline">
                                <span className="font-medium text-table-text">Search:</span>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-10 pr-4 py-2"
                                    placeholder={`${count} records...`}
                                />
                                <FaSearch
                                    className="absolute left-64 top-1/2 transform -translate-y-1/2 admin-main-text"
                                    size={16}
                                />
                            </label>
                        </div>

                        {/* Table with data */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-table-text uppercase admin-inner-body1 dark:text-white">
                                    <tr>
                                        {TABLE_HEADERS.map(header => (
                                            <th key={header.key} scope="col" className="px-6 py-3">{header.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="text-table-text">
                                    {data.length > 0 ? (
                                        data.map((item) => (
                                            <tr key={item.customer_id} className="admin-inner-body2 border-b border-[#6b72808b]">
                                                <td className="px-6 py-4">{item.smsserviceprovidername}</td>
                                                <td className="px-6 py-4"> {new Date(item.created_date).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={TABLE_HEADERS.length} className="text-center py-4">
                                                <div className="text-lg font-semibold admin-table-text">No items found</div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex md:justify-end justify-center mt-4">
                            <div className="flex items-center space-x-4">
                                <button
                                    disabled={page === 1}
                                    onClick={() => handlePageChange(1)}
                                    className={`px-3 py-2 rounded-md flex items-center ${page === 1 ? 'text-gray-400' : 'admin-main-text'}`}
                                >
                                    <MdFirstPage size={20} />
                                </button>
                                <button
                                    disabled={page === 1}
                                    onClick={() => handlePageChange(page - 1)}
                                    className={`px-3 py-2 rounded-md flex items-center ${page === 1 ? 'text-gray-400' : 'admin-main-text'}`}
                                >
                                    <MdChevronLeft size={20} />
                                </button>
                                <span className="text-gray-700">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    disabled={page === totalPages}
                                    onClick={() => handlePageChange(page + 1)}
                                    className={`px-3 py-2 rounded-md flex items-center ${page === totalPages ? 'text-gray-400' : 'admin-main-text'}`}
                                >
                                    <MdChevronRight size={20} />
                                </button>
                                <button
                                    disabled={page === totalPages}
                                    onClick={() => handlePageChange(totalPages)}
                                    className={`px-3 py-2 rounded-md flex items-center ${page === totalPages ? 'text-gray-400' : 'admin-main-text'}`}
                                >
                                    <MdLastPage size={20} />
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Popup */}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center md:px-0 px-3 bg-gray-600 bg-opacity-50 ">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Add SMS Service Provider</h2>
                        {error && (
                            <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 ">
                                <IoIosWarning className="md:text-xl md:mr-2" />
                                <span className="flex-grow">{error}</span>
                                <button
                                    onClick={() => {
                                        Seterror('');
                                        setProviderName('');
                                    }}
                                    className="text-red-700 hover:text-red-900 flex gap-4"
                                >
                                    <IoClose />
                                </button>

                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={providerName}
                                onChange={(e) => setProviderName(e.target.value)}
                                className="appearance-none block bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3  w-72 md:w-[440px]"
                                placeholder="Enter provider name"
                                required
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="bg-gray-400 text-white px-4 py-2 rounded-md"
                                    onClick={handleClosePopup}
                                >
                                    Cancel
                                </button>
                                <Button> Create</Button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SmsServiceProvideList;
