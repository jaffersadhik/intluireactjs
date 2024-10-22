import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import AccountCreate from '../../../components/accountmanagement/account/create/AccountCreate';
import AccountList from '../../../components/accountmanagement/account/list/AccountList';
import CustomerList from '../../../components/accountmanagement/customer/list/CustomerList';
import CustomerCreate from '../../../components/accountmanagement/customer/create/CustomerCreate';
import CustomerView from '../../../components/accountmanagement/customer/view/CustomerView';
import CustomerEdit from '../../../components/accountmanagement/customer/edit/CustomerEdit';
import AccountEdit from '../../../components/accountmanagement/account/edit/AccountEdit';
import AccountView from '../../../components/accountmanagement/account/view/AccountView';
import CompanyList from '../../../components/accountmanagement/company/list/CompanyList';
import CompanyCreate from '../../../components/accountmanagement/company/create/CompanyCreate';
import CompanyEdit from '../../../components/accountmanagement/company/edit/CompanyEdit';
import CompanyView from '../../../components/accountmanagement/company/view/CompanyView';
import SmsServiceProvideList from '../../../components/accountmanagement/smsserviceprovide/list/SmsServiceProvideList';




function AccountmanagementRoute() {
    return (
            <Routes>

                <Route element={<PrivateAuth />}>
                    
                    

                <Route exact path="/accountsgetall" element={<AccountList />}></Route>
                <Route exact path="/accountcreate" element={<AccountCreate />}></Route>
                <Route exact path="/accountedit" element={<AccountEdit />}></Route>
                <Route exact path="/accountview" element={<AccountView />}></Route>



                
                
                <Route exact path="/customersgetall" element={<CustomerList />}></Route>
                <Route exact path="/customercreate" element={<CustomerCreate />}></Route>
                <Route exact path="/customerview" element={<CustomerView />}></Route>
                <Route exact path="/customeredit" element={<CustomerEdit />}></Route>



                
                <Route exact path="/companygetall" element={<CompanyList />}></Route>
                <Route exact path="/companycreate" element={<CompanyCreate />}></Route>
                <Route exact path="/companyedit" element={<CompanyEdit />}></Route>
                <Route exact path="/companyview" element={<CompanyView />}></Route>

                
                
                <Route exact path="/smsserviceprovidegetall" element={<SmsServiceProvideList />}></Route>

                







                   
                </Route>


            </Routes>
    )
}

export default AccountmanagementRoute
