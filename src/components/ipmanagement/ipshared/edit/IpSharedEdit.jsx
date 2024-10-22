import React, { useState } from 'react';
import { pagenamechange } from "../../../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { connectAPIViaPost } from '../../../../services/Post';
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp, IoClose } from "react-icons/io5";
import { Button } from '../../../../utils/modules/Button';
import { ipSharedUpdate } from '../../../../constants/contextpath/admin/ipmanagement/IpManagement';
function IpSharedEdit() {
  const location = useLocation();
  const ip = location.state?.ipdshared;

  const dispatch = useDispatch();
  const pagename = { pagename: 'Ip shared Edit' };
  dispatch(pagenamechange(pagename));

  const [error, Seterror] = useState("");
  const [success, Setsuccess] = useState("");

  const [formData, setFormData] = useState({
    ip_id : ip?.ip_id || '',
    ip: ip?.ip || '',
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


    connectAPIViaPost(formData, ipSharedUpdate)
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
        <p className="text-admin-color2">Ip Management &gt; Ip Shared Edit</p>
      </div>
      <div className="md:px-[23px] px-[8px]">
        <div className="admin-inner-body2 md:px-[30px] px-[10px] py-[20px] rounded-xl">
          <main>
            <div className='flex justify-between items-center mb-4'>
              <h1 className="text-xl font-semibold admin-table-text text-table-text">Ip Senderid  Edit</h1>


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
                  ip
                  </label>
                  <input
                    name="ip"
                    value={formData.ip}
                    onChange={handleChange}
                    className="appearance-none block w-full bg-grey-lighter text-table-text border border-red rounded py-2 px-2 mb-3"
                    id="ip"
                    type="text"
                    placeholder="ip Address "
                  />
                </div>
           
              </div>

   

      


       

              <div className="">
                <Button>Ip Shared Update</Button>
               
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default IpSharedEdit;