import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import ErrorcodeAccountList from '../../../components/errorcodemanagement/errorcode_account/list/ErrorcodeAccountList';
import ErrorcodeAccountCreate from '../../../components/errorcodemanagement/errorcode_account/create/ErrorcodeAccountCreate';
import ErrorcodeAccountEdit from '../../../components/errorcodemanagement/errorcode_account/edit/ErrorcodeAccountEdit';
import ErrorcodeAccountView from '../../../components/errorcodemanagement/errorcode_account/view/ErrorcodeAccountView';
import ErrorCodeCarrierList from '../../../components/errorcodemanagement/errorcode_carrier/list/ErrorCodeCarrierList';
import ErrorCodeCarrierCreate from '../../../components/errorcodemanagement/errorcode_carrier/create/ErrorCodeCarrierCreate';
import ErrorCodeCarrierEdit from '../../../components/errorcodemanagement/errorcode_carrier/edit/ErrorCodeCarrierEdit';
import ErrorCodeCarrierView from '../../../components/errorcodemanagement/errorcode_carrier/view/ErrorCodeCarrierView';
import ErrorCodePlatformList from '../../../components/errorcodemanagement/errorcode_platform/list/ErrorCodePlatformList';
import ErrorCodePlatformCreate from '../../../components/errorcodemanagement/errorcode_platform/create/ErrorCodePlatformCreate';
import ErrorCodePlatformEdit from '../../../components/errorcodemanagement/errorcode_platform/edit/ErrorCodePlatformEdit';
import ErrorCodePlatformView from '../../../components/errorcodemanagement/errorcode_platform/view/ErrorCodePlatformView';
import ErrorcodeCustomerList from '../../../components/errorcodemanagement/errorcode_customer/list/ErrorcodeCustomerList';
import ErrorcodeCustomerCreate from '../../../components/errorcodemanagement/errorcode_customer/create/ErrorcodeCustomerCreate';
import ErrorcodeCustomerEdit from '../../../components/errorcodemanagement/errorcode_customer/edit/ErrorcodeCustomerEdit';
import ErrorcodeCustomerView from '../../../components/errorcodemanagement/errorcode_customer/view/ErrorcodeCustomerView';
import ErrorcodeSmsServiceProviderList from '../../../components/errorcodemanagement/errorcode_smsserviceprovider/list/ErrorcodeSmsServiceProviderList';
import ErrorcodeSmsServiceProviderCreate from '../../../components/errorcodemanagement/errorcode_smsserviceprovider/create/ErrorcodeSmsServiceProviderCreate';
import ErrorcodeSmsServiceProviderView from '../../../components/errorcodemanagement/errorcode_smsserviceprovider/view/ErrorcodeSmsServiceProviderView';
import ErrorcodeSmsServiceProviderEdit from '../../../components/errorcodemanagement/errorcode_smsserviceprovider/edit/ErrorcodeSmsServiceProviderEdit';



function ErrorcodeManagementRoute() {
    return (
            <Routes>

                <Route element={<PrivateAuth />}>
                    
                    

                <Route exact path="/errorcodeaccountgetall" element={<ErrorcodeAccountList />}></Route>
                <Route exact path="/errorcodeaccountcreate" element={<ErrorcodeAccountCreate />}></Route>
                <Route exact path="/errorcodeaccountedit" element={<ErrorcodeAccountEdit />}></Route>
                <Route exact path="/errorcodeaccountview" element={<ErrorcodeAccountView />}></Route>

                <Route exact path="/errorcodecarriergetall" element={<ErrorCodeCarrierList />}></Route>
                <Route exact path="/errorcodecarriercreate" element={<ErrorCodeCarrierCreate />}></Route>
                <Route exact path="/errorcodecarrieredit" element={<ErrorCodeCarrierEdit />}></Route>
                <Route exact path="/errorcodecarrierview" element={<ErrorCodeCarrierView />}></Route>

                
                <Route exact path="/errorcodeplatformgetall" element={<ErrorCodePlatformList />}></Route>
                <Route exact path="/errorcodeplatformcreate" element={<ErrorCodePlatformCreate />}></Route>
                <Route exact path="/errorcodeplatformedit" element={<ErrorCodePlatformEdit />}></Route>
                <Route exact path="/errorcodeplatformview" element={<ErrorCodePlatformView />}></Route>

                
                <Route exact path="/errorcodecustomergetall" element={<ErrorcodeCustomerList />}></Route>
                <Route exact path="/errorcodecustomercreate" element={<ErrorcodeCustomerCreate />}></Route>
                <Route exact path="/errorcodecustomeredit" element={<ErrorcodeCustomerEdit />}></Route>
                <Route exact path="/errorcodecustomerview" element={<ErrorcodeCustomerView />}></Route>

                
                <Route exact path="/errorcodesmsserviceprovidergetall" element={<ErrorcodeSmsServiceProviderList />}></Route>
                <Route exact path="/errorcodesmsserviceprovidercreate" element={<ErrorcodeSmsServiceProviderCreate />}></Route>
                <Route exact path="/errorcodesmsserviceproviderview" element={<ErrorcodeSmsServiceProviderView />}></Route>
                <Route exact path="/errorcodesmsserviceprovideredit" element={<ErrorcodeSmsServiceProviderEdit />}></Route>

                
                
                </Route>


            </Routes>
    )
}

export default ErrorcodeManagementRoute
