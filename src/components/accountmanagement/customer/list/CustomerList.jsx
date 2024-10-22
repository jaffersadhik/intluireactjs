import React, { useState, useEffect } from 'react';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { connectAPIViaGet } from '../../../../services/Get';
import { useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaSearch } from 'react-icons/fa';
import { customerGetAll } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';

function CustomerList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pagename = { pagename: 'CustomerList' };
    dispatch(pagenamechange(pagename));
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [count, setcount] = useState("");

    const TABLE_HEADERS = [
        { label: "Action", key: "customer_id" },

        { label: "Customer Name", key: "customername" },
        { label: "Company Name", key: "companyname" },
        { label: "Email", key: "email" },
        { label: "Mobile", key: "mobile" },
        { label: "Created Date", key: "created_date" },
        // { label: "Login Password", key: "loginpassword" }, 
    ];

    const fetchData = async (currentPage) => {
        try {
            const response = await connectAPIViaGet(`${customerGetAll}?page=${currentPage}&page_size=${pageSize}&search=${searchTerm}`);
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

    // Helper function to decode Base64 encoded password
    const decodePassword = (encodedPassword) => {
        try {
            return atob(encodedPassword);  // atob decodes a Base64-encoded string
        } catch (error) {
            return "Invalid Password";  // Return an error message if decoding fails
        }
    };

    return (
        <div className='w-[100%] h-auto min-h-screen admin-inner-body1 pb-10'>
            <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
                <p className="text-admin-color2">Account Management &gt; CustomerList </p>
            </div>
            <div className="md:px-[23px] px-[8px] ">
                <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
                    <main>
                        <div className='flex justify-between items-center mb-4'>
                            <div className="">
                                <h1 className="text-xl font-semibold admin-table-text text-table-text">Customer List </h1>
                            </div>
                            <div className='flex'>
                                <button className="flex items-center gap-2 bg-admin-color2 p-2 rounded-md text-white" onClick={() => navigate('/account/customercreate')}>
                                    CUSTOMER <IoMdAddCircleOutline />
                                </button>
                            </div>
                        </div>

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

                                                <td className="px-6 py-4 md:mt-0 mt-4 gap-2 flex">
                                                    <button onClick={() => navigate('/account/customerview', { state: { customer: item } })} className="px-4 py-2 text-xs font-bold uppercase rounded-full shadow-sm text-indigo-800 bg-indigo-100 hover:bg-indigo-200">
                                                        View
                                                    </button>

                                                    <button onClick={() => navigate('/account/customeredit', { state: { customer: item } })}

                                                        className="px-4 py-2 text-xs font-bold uppercase rounded-full shadow-sm text-green-800 bg-green-100 hover:bg-green-200"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">{item.customername}</td>
                                                <td className="px-6 py-4">{item.companyname}</td>
                                                <td className="px-6 py-4">{item.email}</td>
                                                <td className="px-6 py-4">{item.mobile}</td>
                                                <td className="px-6 py-4"> {new Date(item.created_date).toLocaleString()}</td>
                                                {/* <td className="px-6 py-4">{decodePassword(item.loginpassword)}</td>  */}
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

                                {/* Page Indicator */}
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
        </div>
    );
}

export default CustomerList;
