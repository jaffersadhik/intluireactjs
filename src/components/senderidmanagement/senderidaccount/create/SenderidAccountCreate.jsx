import React, { useState,useEffect } from 'react';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { connectAPIViaPost } from '../../../../services/Post';
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import { connectAPIViaGet } from '../../../../services/Get';
import { accountGetAll } from '../../../../constants/contextpath/admin/accountmanagement/Accountmanagement';
import { senderIdAccountCreate } from '../../../../constants/contextpath/admin/senderidmanagement/SenderidManagement';
function SenderidAccountCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pagename = { pagename: 'Senderid Account Create' };
  dispatch(pagenamechange(pagename));

  const [error, Seterror] = useState("");
  const [success, Setsuccess] = useState("");
  
  const [Account, setAccount] = useState();

  useEffect(() => {
    const fetchData = async () => {
  
     
    
        try {
            const response = await connectAPIViaGet(`${accountGetAll}?all=true`);
            console.log(response.data);
            setAccount(response.data.data);
          } catch (error) {
            console.error('Error fetching customer list:', error);
          }

    };

    fetchData();
  }, []);
  // Define state for the form fields matching the new Customer model
  const [formData, setFormData] = useState({
    accountname: '',
    senderid: '',

  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });


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


    connectAPIViaPost(formData, senderIdAccountCreate)
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
  const decodeaccount = (encodedPassword) => {
    try {
        return atob(encodedPassword);  
    } catch (error) {
        return "Invalid Decodeing";  
    }
};
  return (
    <div className='w-[100%] h-auto min-h-screen admin-inner-body1 pb-10'>
      <div className="md:pl-[33px] pl-[20px] md:pt-[10px] pt-[10px] mb-[10px] flex">
        <p className="text-admin-color2">Senderid Management &gt; Senderid Account Create</p>
      </div>
      <div className="md:px-[23px] px-[8px]">
        <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
          <main>
            <div className='flex justify-between items-center mb-4'>
              <h1 className="text-xl font-semibold admin-table-text text-table-text">Senderid Account Create</h1>


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
            <form onSubmit={handleSubmit} className="admin-inner-body2 rounded pt-2 pb-8 mb-4 flex flex-col my-2">

              {/* Company Name & Customer Name */}
              <div className="-mx-3 md:flex md:mb-4">
                <div className="md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="block uppercase tracking-wide text-table-text text-xs font-bold mb-2" htmlFor="companyname">
                  senderid
                  </label>
                  <input
                    name="senderid"
                    value={formData.senderid}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                    id="senderid"
                    type="text"
                    placeholder="Sender Id"
                  />
                </div>
                <div className="md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="customer_id">
                   Account
                  </label>
                  <select
                    id="accountname"
                    name="accountname"
                    value={formData.accountname}

                    // value={selectedcustomer}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3"
                  >
                    <option value="" disabled defaultValue>
                      Select  Account
                    </option>
                    {Account &&
                      Account.map((Account) => (
                        <option key={Account.username} value={Account.username}>
                          {decodeaccount(Account.username)}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

   

      


       

              <div className="">
                <Button>Senderid Account Create</Button>
               
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SenderidAccountCreate;
