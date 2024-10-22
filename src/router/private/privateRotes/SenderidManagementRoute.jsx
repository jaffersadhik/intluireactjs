import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import SenderidAccountList from '../../../components/senderidmanagement/senderidaccount/list/SenderidAccountList';
import SenderidAccountCreate from '../../../components/senderidmanagement/senderidaccount/create/SenderidAccountCreate';
import SenderidAccountEdit from '../../../components/senderidmanagement/senderidaccount/edit/SenderidAccountEdit';
import SenderidAccountView from '../../../components/senderidmanagement/senderidaccount/view/SenderidAccountView';
import SenderidCustomerCreate from '../../../components/senderidmanagement/senderidcustomer/create/SenderidCustomerCreate';
import SenderidCustomerList from '../../../components/senderidmanagement/senderidcustomer/list/SenderidCustomerList';
import SenderidCustomerEdit from '../../../components/senderidmanagement/senderidcustomer/edit/SenderidCustomerEdit';
import SenderidCustomerView from '../../../components/senderidmanagement/senderidcustomer/view/SenderidCustomerView';
import SenderidSharedList from '../../../components/senderidmanagement/senderidshared/list/SenderidSharedList';
import SenderidsharedCreate from '../../../components/senderidmanagement/senderidshared/create/SenderidsharedCreate';
import SenderidsharedEdit from '../../../components/senderidmanagement/senderidshared/edit/SenderidsharedEdit';
import SenderidSharedView from '../../../components/senderidmanagement/senderidshared/view/SenderidSharedView';



function SenderidManagementRoute() {
    return (
            <Routes>

                <Route element={<PrivateAuth />}>
                    
                    

                <Route exact path="/senderidaccountgetall" element={<SenderidAccountList />}></Route>
                <Route exact path="/senderidaccountcreate" element={<SenderidAccountCreate />}></Route>
                <Route exact path="/senderidaccountedit" element={<SenderidAccountEdit />}></Route>
                <Route exact path="/senderidaccountview" element={<SenderidAccountView />}></Route>

                

                <Route exact path="/senderidcustomercreate" element={<SenderidCustomerCreate />}></Route>
                <Route exact path="/senderidcustomerlist" element={<SenderidCustomerList />}></Route>
                <Route exact path="/senderidcustomeredit" element={<SenderidCustomerEdit />}></Route>
                <Route exact path="/senderidcustomerview" element={<SenderidCustomerView />}></Route>

                
                
                <Route exact path="/senderidsharedlist" element={<SenderidSharedList />}></Route>
                <Route exact path="/senderidsharedcreate" element={<SenderidsharedCreate />}></Route>
                <Route exact path="/senderidsharededit" element={<SenderidsharedEdit/>}></Route>
                <Route exact path="/senderidsharedview" element={<SenderidSharedView/>}></Route>

                
                   
                </Route>


            </Routes>
    )
}

export default SenderidManagementRoute
