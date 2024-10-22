import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import CarrierList from '../../../components/vendormanagement/carrier/list/CarrierList';
import WebhookAccountList from '../../../components/webhookmanagement/webhook_account/list/WebhookAccountList';
import WebhookAccountCreate from '../../../components/webhookmanagement/webhook_account/create/WebhookAccountCreate';
import WebhookAccountEdit from '../../../components/webhookmanagement/webhook_account/edit/WebhookAccountEdit';
import WebhookAccountView from '../../../components/webhookmanagement/webhook_account/view/WebhookAccountView';
import WebhookCustomerList from '../../../components/webhookmanagement/webhook_customer/list/WebhookCustomerList';
import WebhookCustomerCreate from '../../../components/webhookmanagement/webhook_customer/create/WebhookCustomerCreate';
import WebhookCustomerEdit from '../../../components/webhookmanagement/webhook_customer/edit/WebhookCustomerEdit';
import WebhookCustomerView from '../../../components/webhookmanagement/webhook_customer/view/WebhookCustomerView';
import WebhookParameterIndexList from '../../../components/webhookmanagement/webhook_parameter_index/list/WebhookParameterIndexList';
import WebhookParameterIndexCreate from '../../../components/webhookmanagement/webhook_parameter_index/create/WebhookParameterIndexCreate';
import WebhookParameterIndexEdit from '../../../components/webhookmanagement/webhook_parameter_index/edit/WebhookParameterIndexEdit';
import WebhookParameterIndexView from '../../../components/webhookmanagement/webhook_parameter_index/view/WebhookParameterIndexView';




function WebhookManagementRoute() {
    return (
            <Routes>

                <Route element={<PrivateAuth />}>
                    
                    

                <Route exact path="/webhookaccountgetall" element={<WebhookAccountList />}></Route>
                <Route exact path="/webhookaccountcreate" element={<WebhookAccountCreate />}></Route>
                <Route exact path="/webhookaccountedit" element={<WebhookAccountEdit />}></Route>
                <Route exact path="/webhookaccountview" element={<WebhookAccountView />}></Route>

                
                
                
                <Route exact path="/webhookcustomergetall" element={<WebhookCustomerList />}></Route>
                <Route exact path="/webhookcustomercreate" element={<WebhookCustomerCreate />}></Route>
                <Route exact path="/webhookcustomeredit" element={<WebhookCustomerEdit />}></Route>
                <Route exact path="/webhookcustomerview" element={<WebhookCustomerView />}></Route>

                
                <Route exact path="/webhookparameterindexgetall" element={<WebhookParameterIndexList />}></Route>
                <Route exact path="/webhookparameterindexcreate" element={<WebhookParameterIndexCreate />}></Route>
                <Route exact path="/webhookparameterindexedit" element={<WebhookParameterIndexEdit />}></Route>
                <Route exact path="/webhookparameterindexview" element={<WebhookParameterIndexView />}></Route>

                
                
                </Route>


            </Routes>
    )
}

export default WebhookManagementRoute
