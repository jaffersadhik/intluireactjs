import React, { useState } from 'react';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { connectAPIViaPost } from '../../../../services/Post';
import { customerCreate } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';
import { Base64 } from 'js-base64';
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
// import { IoClose } from "react-icons/io5";
import validatePassword from '../../../../utils/modules/PasswordValidator';
function CustomerCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pagename = { pagename: 'Customer Create' };
  dispatch(pagenamechange(pagename));

  const [error, Seterror] = useState("");
  const [success, Setsuccess] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState('');



  // Define state for the form fields matching the new Customer model
  const [formData, setFormData] = useState({
    companyname: '',
    customername: '',
    email: '',
    first_name: '',
    last_name: '',
    loginpassword: '',
    mobile: '',
    invoicetype: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the password fields
    if (name === 'loginpassword') {
      const error = validatePassword(value);
      setLoginPasswordError(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    const missingFields = [];
    Object.keys(formData).forEach(key => {
      if (formData[key].trim() === '') {
        missingFields.push(key);
      }
    });

    if (missingFields.length > 0) {
      Seterror(`Please fill in the following fields: ${missingFields.join(', ')}`);
      Setsuccess('');
      return;
    }

    const base64EncodedPassword = Base64.encode(formData.loginpassword);
    console.log("Base64 Encoded Password (from js-base64): ", base64EncodedPassword);

    // Update formData with the base64-encoded password
    const updatedFormData = {
      ...formData,
      loginpassword: base64EncodedPassword
    };

    connectAPIViaPost(updatedFormData, customerCreate)
      .then((response) => {
        console.log('POST request successful:', response.data);
        Setsuccess('Records created successfully');
        Seterror('');
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error response from API:', error.response);
          Setsuccess('');
          // Adjust to get error message from your backend's error key
          const errorMessage = error.response.data.error || 'An error occurred. Please try again.';
          console.log(error.response.data.error, "errorMessage");
          Seterror(errorMessage);
        } else {
          console.error('Error without response:', error);
          Setsuccess('');
          Seterror('An error occurred. Please try again.');
        }
      });
  };

  return (
    <div className='w-[100%] h-auto min-h-screen admin-inner-body1 pb-10'>
      <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
        <p className="text-admin-color2">Account Management &gt; Customer Create</p>
      </div>
      <div className="md:px-[23px] px-[8px]">
        <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
          <main>
            <div className='flex justify-between items-center mb-4'>
              <h1 className="text-xl font-semibold admin-table-text text-table-text">Customer Create</h1>


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
            <form onSubmit={handleSubmit} className="admin-inner-body2 rounded pt-6 pb-8 mb-4 flex flex-col my-2">

              {/* Company Name & Customer Name */}
              <div className="-mx-3 md:flex md:mb-4">
                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="companyname">
                    Company Name
                  </label>
                  <input
                    name="companyname"
                    value={formData.companyname}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                    id="companyname"
                    type="text"
                    placeholder="Company Name"
                  />
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="customername">
                    Customer Name
                  </label>
                  <input
                    name="customername"
                    value={formData.customername}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                    id="customername"
                    type="text"
                    placeholder="Customer Name"
                  />
                </div>
              </div>

              {/* Email & Mobile */}
              <div className="-mx-3 md:flex md:mb-4">
                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
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
                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="mobile">
                    Mobile
                  </label>
                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                    id="mobile"
                    type="text"
                    placeholder="Mobile"
                  />
                </div>
              </div>

              {/* First Name & Last Name */}
              <div className="-mx-3 md:flex md:mb-4">
                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                    id="first_name"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                    id="last_name"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>



              {/* Invoice Type */}
              <div className="-mx-3 md:flex md:mb-4">


                <div className="md:w-1/2 px-3 mb-4 md:mb-0">

                  <label
                    className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2"
                    htmlFor="customer_id"
                  >
                    Invoice Type
                  </label>
                  <select
                    id="invoicetype"
                    name="invoicetype"
                    value={formData.invoicetype}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                  >
                    <option value="" disabled defaultValue>
                      Invoice Type
                    </option>
                    <option value="MONTHLY">MONTHLY</option>
                    <option value="5DAYS">5DAYS</option>
                    <option value="10DAYS">10DAYS</option>
                    <option value="15DAYS">15DAYS</option>

                  </select>
                </div>

                {/* <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="mobilestatus">
                    Login Password
                  </label>
                  <input
                    name="loginpassword"
                    value={formData.loginpassword}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                    id="loginpassword"
                    type="text"
                    placeholder="login password"
                  />
                </div> */}
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">

                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="loginpassword">
                    Login Password
                  </label>
                  <input
                    name="loginpassword"
                    value={formData.loginpassword}
                    onChange={handleChange}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${loginPasswordError ? 'border-red-500' : 'border-gray-300'} rounded py-2 px-2 mb-3`}
                    id="loginpassword"
                    type="password"
                    placeholder="Login Password"
                  />
                  {loginPasswordError && <p className="text-red-500 text-xs italic">{loginPasswordError}</p>} {/* Display error message */}
                </div>


              </div>

              <div className="">
                <Button> Create Customer</Button>
                {/* <button
                  className="bg-admin-color2    text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Create Customer
                </button> */}
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CustomerCreate;
