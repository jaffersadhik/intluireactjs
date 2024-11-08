import React, { useState, useEffect } from 'react';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { connectAPIViaGet } from '../../../../services/Get';
import { customerGetAll } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';
import { Button } from '../../../../utils/modules/Button';
import { countryGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { worldtimezoneGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { currencyGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
import { connectAPIViaPost } from '../../../../services/Post';
import { Base64 } from 'js-base64';
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { accountUpdate } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';
import validatePassword from '../../../../utils/modules/PasswordValidator';
import { smsServiceProvidermainGetAll } from '../../../../constants/contextpath/admin/utils/Utils';
function AccountEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pagename = { pagename: 'Account Edit' };
  dispatch(pagenamechange(pagename));
  const account = location.state?.account;
  console.log(account, "account")

  const [Customer, setCustomer] = useState();
  const [Country, setCountry] = useState();
  const [Worldtimezone, setWorldtimezone] = useState();
  const [Currency, setCurrency] = useState();
  const [error, Seterror] = useState("");
  const [success, Setsuccess] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');
  const [SmsServiceProvidermain, setSmsServiceProvidermain] = useState();

  // State to manage form data with the fields you mentioned
  const [formData, setFormData] = useState({
    account_id: account?.account_id || '',

    first_name: account?.first_name || '',
    last_name: account?.last_name || '',
    loginpassword: Base64.decode(account.loginpassword) || '',
    password: Base64.decode(account.password) || '',
    username: Base64.decode(account.username) || '',
    dial_in_code: account?.dial_in_code || '',
    currencycode: account?.currencycode || '',
    customer_id: account?.customer_id || '',
    ipcheck: account?.ipcheck || '',
    mncmcccheck: account?.mncmcccheck || '',
    pricecheck: account?.pricecheck || '',
    protocol: account?.protocol || '',
    routecheck: account?.routecheck || '',
    routetype: account?.routetype || '',
    senderidcheck: account?.senderidcheck || '',
    smstype: account?.smstype || '',
    status: account?.status || '',
    timezone_id: account?.timezone_id || '',
    errorcode_type: account?.errorcode_type || '',
    cluster:account?.cluster || '',

    
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
  }, [])
  // Handle input changes

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
    const missingFields = Object.keys(formData).filter(key => {
      // Check if the value is a string and trim it
      const value = formData[key];
      return typeof value === 'string' && value.trim() === '';
    });

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

    connectAPIViaPost(updatedFormData, accountUpdate)
      .then((response) => {
        Setsuccess('Records Updated successfully');
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
        <p className="text-admin-color2">Account Management &gt; Account Edit</p>
      </div>
      <div className="md:px-[23px] px-[8px]">
        <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
          <main>
            <div className='flex justify-between items-center mb-4'>
              <div>
                <h1 className="text-xl font-semibold admin-table-text text-table-text">Account Edit</h1>
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
                <div className="md:w-1/2 px-3 mb-6 md:mb-0 group relative">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-gray-200 text-grey-darker border border-gray-400 rounded py-2 px-2 mb-3 cursor-not-allowed"
                    id="username"
                    type="text"
                    placeholder="Username"
                    disabled
                  />
                  <p className="absolute left-4 top-16 mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Username field is not editable for now.
                  </p>
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
                <div className="md:w-1/2 px-3">

                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="dial_in_code">
                    Dial-In Code
                  </label>

                  <select
                    id="dial_in_code"
                    name="dial_in_code"
                    value={formData.dial_in_code}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                  >
                    <option value="" disabled defaultValue>
                      Dial-In Code

                    </option>
                    {Country &&
                      Country.map((Country) => (
                        <option key={Country.country_id} value={Country.
                          dial_in_code
                        }>
                          {Country.country}--{Country.dial_in_code}
                        </option>
                      ))}
                  </select>
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
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="currencycode">
                    Currency Code
                  </label>


                  <select
                    id="currencycode"
                    name="currencycode"
                    value={formData.currencycode}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
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


                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="customer_id">
                    Customer
                  </label>
                  <select
                    id="customer_id"
                    name="customer_id"
                    value={formData.customer_id}

                    // value={selectedcustomer}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
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
                </div>
              </div>

              {/* IP Check & MNC MCC Check */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">

                  <label
                    className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2"
                    htmlFor="customer_id"
                  >
                    IP Check
                  </label>
                  <select
                    id="ipcheck"
                    name="ipcheck"
                    value={formData.ipcheck}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                  >
                    <option value="" disabled defaultValue>
                      IP Check
                    </option>
                    <option value="ACCOUNTS">ACCOUNTS</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="SHARED">SHARED</option>
                    <option value="DISABLED">DISABLED</option>

                  </select>
                </div>

                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="mncmcccheck">
                    MNC MCC Check
                  </label>

                  <select
                    id="mncmcccheck"
                    name="mncmcccheck"
                    value={formData.mncmcccheck}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                  >
                    <option value="" disabled defaultValue>
                      MNC MCC Check
                    </option>
                    <option value="ENABLED">ENABLED</option>
                    <option value="DISABLED">DISABLED</option>
                  </select>
                </div>
              </div>

              {/* Price Check & Protocol */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="pricecheck">
                    Price Check
                  </label>

                  <select
                    id="pricecheck"
                    name="pricecheck"
                    value={formData.pricecheck}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                  >
                    <option value="" disabled defaultValue>
                      Price Check
                    </option>
                    <option value="ACCOUNTS">ACCOUNTS</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="SHARED">SHARED</option>
                  </select>
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="protocol">
                    Protocol
                  </label>

                  <select
                    name="protocol"
                    value={formData.protocol}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                    id="protocol"
                    type="text"
                    placeholder="Protocol">
                    <option value="" disabled defaultValue>
                      Protocol                    </option>
                    <option value="HTTP">HTTP</option>
                    <option value="SMPP">SMPP</option>
                    <option value="GUI">GUI</option>
                  </select>
                </div>
              </div>

              {/* Route Check & Route Type */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="routecheck">
                    Route Check
                  </label>

                  <select
                    name="routecheck"
                    value={formData.routecheck}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                    id="routecheck"
                    type="text"
                    placeholder="routecheck">
                    <option value="" disabled defaultValue>
                      Route Check              </option>
                      <option value="ACCOUNT-CUSTOMER-SHARED">ACCOUNT-CUSTOMER-SHARED</option>
                    <option value="CUSTOMER-SHARED">CUSTOMER-SHARED</option>
                    <option value="SHARED">SHARED</option>
                    <option value="LCR">LCR</option>


                  </select>
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="routetype">
                    Route Type
                  </label>

                  <select
                    name="routetype"
                    value={formData.routetype}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                    id="routetype"
                    type="text"
                    placeholder="routetype">
                    <option value="" disabled defaultValue>
                      Route Type              </option>
                      <option value="DOMESTIC">DOMESTIC</option>
                      <option value="INTERNATIONAL">INTERNATIONAL</option>


                  </select>

                </div>
              </div>

              {/* Sender ID Check & SMS Type */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="senderidcheck">
                    Sender ID Check
                  </label>

                  <select
                    id="senderidcheck"
                    name="senderidcheck"
                    value={formData.senderidcheck}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                  >
                    <option value="" disabled defaultValue>
                      Sender ID Check

                    </option>
                    <option value="ACCOUNTS">ACCOUNTS</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="SHARED">SHARED</option>
                    <option value="DISABLED">DISABLED</option>

                  </select>
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="smstype">
                    SMS Type
                  </label>
                  <select
                    id="smstype"
                    name="smstype"
                    value={formData.smstype}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                  >
                    <option value="" disabled defaultValue>
                      SMS Type

                    </option>
                    <option value="OTP">OTP</option>
                      <option value="TRANSACTIONAL">TRANSACTIONAL</option>
                      <option value="PROMOTIONAL">PROMOTIONAL</option>
                      <option value="ALERT">ALERT</option>

                  </select>


                </div>
              </div>

              {/* Status & Timezone ID */}
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                  >
                    <option value="" disabled defaultValue>
                      Status

                    </option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>

                  </select>

                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="timezone_id">
                    Timezone ID
                  </label>




                  <select
                    id="timezone_id"
                    name="timezone_id"
                    value={formData.timezone_id}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                  >
                    <option value="" disabled defaultValue>
                      Timezone ID
                    </option>
                    {Worldtimezone &&
                      Worldtimezone.map((Worldtimezone) => (
                        <option key={Worldtimezone.timezone_id} value={Worldtimezone.timezone_id}>
                          {Worldtimezone.longname
                          }
                        </option>
                      ))}
                  </select>
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
                <Button>Save chanages Account</Button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AccountEdit
