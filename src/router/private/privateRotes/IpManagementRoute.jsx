import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import SenderidAccountList from '../../../components/senderidmanagement/senderidaccount/list/SenderidAccountList';
import IpAccountList from '../../../components/ipmanagement/ipaccount/list/IpAccountList';
import IpAccountCreate from '../../../components/ipmanagement/ipaccount/create/IpAccountCreate';
import IpAccountEdit from '../../../components/ipmanagement/ipaccount/edit/IpAccountEdit';
import IpAccountView from '../../../components/ipmanagement/ipaccount/view/IpAccountView';
import IpCustomerList from '../../../components/ipmanagement/ipcustomer/list/IpCustomerList';
import IpCustomerCreate from '../../../components/ipmanagement/ipcustomer/create/IpCustomerCreate';
import IpCustomerEdit from '../../../components/ipmanagement/ipcustomer/edit/IpCustomerEdit';
import IpCustomerView from '../../../components/ipmanagement/ipcustomer/view/IpCustomerView';
import IpSharedList from '../../../components/ipmanagement/ipshared/list/IpSharedList';
import IpSharedCreate from '../../../components/ipmanagement/ipshared/create/IpSharedCreate';
import IpSharedEdit from '../../../components/ipmanagement/ipshared/edit/IpSharedEdit';
import IpSharedView from '../../../components/ipmanagement/ipshared/view/IpSharedView';



function IpManagementRoute() {
    return (
            <Routes>

                <Route element={<PrivateAuth />}>
                    
                    

                <Route exact path="/ipaccountgetall" element={<IpAccountList />}></Route>
                <Route exact path="/ipaccountcreate" element={<IpAccountCreate />}></Route>
                <Route exact path="/ipaccountedit" element={<IpAccountEdit />}></Route>
                <Route exact path="/ipaccountview" element={<IpAccountView />}></Route>

                <Route exact path="/ipcustomergetall" element={<IpCustomerList />}></Route>
                <Route exact path="/ipcustomercreate" element={<IpCustomerCreate />}></Route>
                <Route exact path="/ipcustomeredit" element={<IpCustomerEdit />}></Route>
                <Route exact path="/ipcustomerview" element={<IpCustomerView />}></Route>

                <Route exact path="/ipsharedgetall" element={<IpSharedList />}></Route>
                <Route exact path="/ipsharedcreate" element={<IpSharedCreate />}></Route>
                <Route exact path="/ipsharededit" element={<IpSharedEdit />}></Route>
                <Route exact path="/ipsharedview" element={<IpSharedView />}></Route>

                
                
                
                
                </Route>


            </Routes>
    )
}

export default IpManagementRoute
