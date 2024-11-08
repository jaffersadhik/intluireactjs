import React, { useState, useEffect } from 'react';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { connectAPIViaGet } from '../../../../services/Get';
import { customerGetAll } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';
import { Button } from '../../../../utils/modules/Button';
import { countryGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { worldtimezoneGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { currencyGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { connectAPIViaPost } from '../../../../services/Post';
import { Base64 } from 'js-base64';
import { accountCreate } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import validatePassword from '../../../../utils/modules/PasswordValidator';
import { smsServiceProvidermainGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
function AccountCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pagename = { pagename: 'Account Create' };
  dispatch(pagenamechange(pagename));

  const [Customer, setCustomer] = useState();
  const [Country, setCountry] = useState();
  const [Worldtimezone, setWorldtimezone] = useState();
  const [Currency, setCurrency] = useState();
  const [error, Seterror] = useState("");
  const [success, Setsuccess] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');


  const [SmsServiceProvidermain, setSmsServiceProvidermain] = useState();

  // Define state for the form fields
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    loginpassword: '',
    password: '',
    username: '',
    dial_in_code: '',
    currencycode: '',
    customer_id: '',
    ipcheck: '',
    mncmcccheck: '',
    pricecheck: '',
    protocol: '',
    routecheck: '',
    routetype: '',
    senderidcheck: '',
    smstype: '',
    status: '',
    timezone_id: '',
    errorcode_type: '',
    cluster: '',

  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await connectAPIViaGet(`${customerGetAll}?all=true`);
        // console.log(response.data);
        setCustomer(response.data.data);
      } catch (error) {
        console.error('Error fetching customer list:', error);
      }
      try {
        const response = await connectAPIViaGet(`${smsServiceProvidermainGetAll}?all=true`);
        let providers = response.data.data;

        // Additional options
        const additionalOptions = ['account', 'carrier', 'platform', 'customer'];

        // Combine both and remove duplicates
        const uniqueProviders = [
          ...new Set([
            ...providers.map(provider => provider.smsserviceprovidername),
            ...additionalOptions,
          ]),
        ];

        console.log(uniqueProviders, "test data")

        setSmsServiceProvidermain(uniqueProviders);
      } catch (error) {
        console.error('Error fetching customer list:', error);
      }

      try {

        connectAPIViaGet(countryGetAll)
          .then((response) => {
            // console.log(response.data);
            setCountry(response.data);
          })
          .catch((error) => {
            console.error('Error fetching customer list:', error);
          });
      } catch
      (error) {
        console.error('Error fetching data:', error);
      }
      try {

        connectAPIViaGet(worldtimezoneGetAll)
          .then((response) => {
            console.log(response.data);
            setWorldtimezone(response.data);
          })
          .catch((error) => {
            console.error('Error fetching customer list:', error);
          });
      } catch
      (error) {
        console.error('Error fetching data:', error);
      }
      try {

        connectAPIViaGet(currencyGetAll)
          .then((response) => {
            console.log(response.data);
            setCurrency(response.data);
          })
          .catch((error) => {
            console.error('Error fetching customer list:', error);
          });
      } catch
      (error) {
        console.error('Error fetching data:', error);
      }

    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the password fields
    if (name === 'password') {
      const error = validatePassword(value);
      setPasswordError(error);
    } else if (name === 'loginpassword') {
      const error = validatePassword(value);
      setLoginPasswordError(error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const missingFields = Object.keys(formData).filter(key => formData[key].trim() === '');

    if (missingFields.length > 0) {
      Seterror(`Please fill in the following fields: ${missingFields.join(', ')}`);
      Setsuccess('');
      return;
    }

    // Hash the values
    const base64EncodedLoginPassword = Base64.encode(formData.loginpassword);
    const base64EncodedUsername = Base64.encode(formData.username);
    const base64EncodedPassword = Base64.encode(formData.password);

    // Update formData with the base64-encoded values
    const updatedFormData = {
      ...formData,
      loginpassword: base64EncodedLoginPassword,
      username: base64EncodedUsername,
      password: base64EncodedPassword
    };

    connectAPIViaPost(updatedFormData, accountCreate)
      .then((response) => {
        console.log('POST request successful:', response.data);
        Setsuccess('Records created successfully');
        Seterror('');
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error response from API:', error.response);
          Setsuccess('');
          const errorMessage = error.response.data.error || 'An error occurred. Please try again.';
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
        <p className="text-admin-color2">Account Management &gt; Account Create</p>
      </div>
      <div className="md:px-[23px] px-[8px]">
        <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
          <main>
            <div className='flex justify-between items-center mb-4'>
              <div>
                <h1 className="text-xl font-semibold admin-table-text text-table-text">Account Create</h1>
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
            <form onSubmit={handleSubmit} className="admin-inner-body2  rounded pt-6 pb-8 mb-4 flex flex-col my-2">

              {/* Email Status & First Name */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full bg-grey-lighter text-grey-darker border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded py-2 px-2 mb-3`}
                    id="password"
                    type="password"
                    placeholder="Password"
                  />
                  {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>} {/* Display error message */}
                </div>

              </div>

              {/* Last Name & Login Password */}
              <div className="-mx-3 md:flex mb-6">
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
                <div className="md:w-1/2 px-3 relative">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="dial_in_code">
                    Dial-In Code
                  </label>
                  <div className="relative">
                    <select
                      id="dial_in_code"
                      name="dial_in_code"
                      value={formData.dial_in_code}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                    >
                      <option value="" disabled defaultValue>
                        Dial-In Code
                      </option>
                      {Country &&
                        Country.map((Country) => (
                          <option key={Country.country_id} value={Country.dial_in_code}>
                            {Country.country} -- {Country.dial_in_code}
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




              </div>

              {/* Mobile Status & Password */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                    id="first_name"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                    id="last_name"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>



              {/* Currency Code & Customer ID */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0 relative">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="currencycode">
                    Currency Code
                  </label>
                  <div className="relative">
                    <select
                      id="currencycode"
                      name="currencycode"
                      value={formData.currencycode}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                    >
                      <option value="" disabled defaultValue>
                        Currency Code
                      </option>
                      {Currency &&
                        Currency.map((Currency) => (
                          <option key={Currency.currency_id} value={Currency.currencycode}>
                            {Currency.currencycode}
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

                <div className="md:w-1/2 px-3  md:mb-0 relative">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="customer_id">
                    Customer
                  </label>
                  <div className="relative">
                    <select
                      id="customer_id"
                      name="customer_id"
                      value={formData.customer_id}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                    >
                      <option value="" disabled defaultValue>
                        Select Customer
                      </option>
                      {Customer &&
                        Customer.map((customer) => (
                          <option key={customer.customer_id} value={customer.customer_id}>
                            {customer.customername}
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

              </div>

              {/* IP Check & MNC MCC Check */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0 relative">
                  <label
                    className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2"
                    htmlFor="ipcheck"
                  >
                    IP Check
                  </label>
                  <div className="relative">
                    <select
                      id="ipcheck"
                      name="ipcheck"
                      value={formData.ipcheck}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3 pr-8"
                    >
                      <option value="" disabled defaultValue>
                        IP Check
                      </option>
                      <option value="accounts">ACCOUNTS</option>
                      <option value="customer">CUSTOMER</option>
                      <option value="shared">SHARED</option>
                      <option value="disabled">DISABLED</option>

                    </select>

                    {/* Down Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                      </svg>
                    </div>
                  </div>
                </div>


                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="mncmcccheck">
                    MNC MCC Check
                  </label>

                  <div className="relative">
                    <select
                      id="mncmcccheck"
                      name="mncmcccheck"
                      value={formData.mncmcccheck}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3 pr-8"
                    >
                      <option value="" disabled defaultValue>
                        MNC MCC Check
                      </option>
                      <option value="enabled">ENABLED</option>
                      <option value="disabled">DISABLED</option>

                    </select>

                    {/* Down Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              {/* Price Check & Protocol */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="pricecheck">
                    Price Check
                  </label>

                  <div className="relative">
                    <select
                      id="pricecheck"
                      name="pricecheck"
                      value={formData.pricecheck}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3 pr-8"
                    >
                      <option value="" disabled defaultValue>
                        Price Check
                      </option>
                      <option value="accounts">ACCOUNTS</option>
                      <option value="customer">CUSTOMER</option>
                      <option value="shared">SHARED</option>

                    </select>

                    {/* Down Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="protocol">
                    Protocol
                  </label>

                  <div className="relative">
                    <select
                      name="protocol"
                      value={formData.protocol}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                      id="protocol"
                    >
                      <option value="" disabled defaultValue>
                        Protocol
                      </option>
                      <option value="http">HTTP</option>
                      <option value="smpp">SMPP</option>
                      <option value="gui">GUI</option>

                    </select>

                    {/* Down Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              {/* Route Check & Route Type */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="routecheck">
                    Route Check
                  </label>

                  <div className="relative">
                    <select
                      name="routecheck"
                      value={formData.routecheck}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                      id="routecheck"
                    >
                      <option value="" disabled defaultValue>
                        Route Check
                      </option>
                      <option value="account-customer-shared">ACCOUNT-CUSTOMER-SHARED</option>
                      <option value="customer-shared">CUSTOMER-SHARED</option>
                      <option value="shared">SHARED</option>
                      <option value="lcr">LCR</option>

                    </select>

                    {/* Down Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="routetype">
                    Route Type
                  </label>

                  <div className="relative">
                    <select
                      name="routetype"
                      value={formData.routetype}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                      id="routetype"
                    >
                      <option value="" disabled defaultValue>
                        Route Type
                      </option>
                      <option value="domestic">DOMESTIC</option>
                      <option value="international">INTERNATIONAL</option>

                    </select>

                    {/* Down Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sender ID Check & SMS Type */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0 relative">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="senderidcheck">
                    Sender ID Check
                  </label>
                  <div className="relative">
                    <select
                      id="senderidcheck"
                      name="senderidcheck"
                      value={formData.senderidcheck}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3 pr-8"
                    >
                      <option value="" disabled defaultValue>
                        Sender ID Check
                      </option>
                      <option value="accounts">ACCOUNTS</option>
                      <option value="customer">CUSTOMER</option>
                      <option value="shared">SHARED</option>
                      <option value="disabled">DISABLED</option>

                    </select>
                    {/* Down Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="smstype">
                    SMS Type
                  </label>
                  <div className="relative">
                    <select
                      id="smstype"
                      name="smstype"
                      value={formData.smstype}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3 pr-8"
                    >
                      <option value="" disabled defaultValue>
                        SMS Type
                      </option>
                      <option value="otp">OTP</option>
                      <option value="transactional">TRANSACTIONAL</option>
                      <option value="promotional">PROMOTIONAL</option>
                      <option value="alert">ALERT</option>

                    </select>
                    {/* Down Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              {/* Status & Timezone ID */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3 pr-8"
                    >
                      <option value="" disabled defaultValue>
                        Status
                      </option>
                      <option value="active">ACTIVE</option>
                      <option value="inactive">INACTIVE</option>

                    </select>

                    {/* Down Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="timezone_id">
                    Timezone ID
                  </label>
                  <div className="relative">
                    <select
                      id="timezone_id"
                      name="timezone_id"
                      value={formData.timezone_id}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3 pr-8"
                    >
                      <option value="" disabled defaultValue>
                        Timezone ID
                      </option>
                      {Worldtimezone &&
                        Worldtimezone.map((timezone) => (
                          <option key={timezone.timezone_id} value={timezone.timezone_id}>
                            {timezone.longname}
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

              </div>


              {/* test */}

              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0 relative">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="errorcode_type">
                    errorcode_type
                  </label>
                  <div className="relative">
                    <select
                      id="errorcode_type"
                      name="errorcode_type"
                      value={formData.errorcode_type}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3 pr-8"
                    >
                      <option value="" disabled defaultValue>
                        Errorcode type
                      </option>
                      {SmsServiceProvidermain &&
                        SmsServiceProvidermain.map((provider) => (
                          <option key={provider} value={provider}>
                            {provider}
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


                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="smstype">
                    CLUSTER
                  </label>
                  <div className="relative">
                    <select
                      id="cluster"
                      name="cluster"
                      value={formData.cluster}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3 pr-8"
                    >
                      <option value="" disabled defaultValue>
                        CLUSTER
                      </option>
                      <option value="otp">OTP</option>
                      <option value="trans">TRANS</option>
                      <option value="bulk">BULK</option>

                    </select>
                    {/* Down Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.29289 7.29289a1 1 0 011.41421 0L10 10.5858l3.2929-3.2929a1 1 0 111.4142 1.4142l-4 4a1 1 0 01-1.4142 0l-4-4a1 1 0 010-1.4142z" />
                      </svg>
                    </div>
                  </div>
                </div>

              </div>


              {/* test end */}

              <div className="flex items-center justify-between">
                <Button>Create Account</Button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AccountCreate;
