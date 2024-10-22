import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import PriceAccountList from '../../../components/pricemanagement/price_account/list/PriceAccountList';
import PriceAccountCreate from '../../../components/pricemanagement/price_account/create/PriceAccountCreate';
import PriceAccountEdit from '../../../components/pricemanagement/price_account/edit/PriceAccountEdit';
import PriceAccountView from '../../../components/pricemanagement/price_account/view/PriceAccountView';
import PriceAccountMncMccCreate from '../../../components/pricemanagement/price_account_mnc_mcc/create/PriceAccountMncMccCreate';
import PriceAccountMncMccList from '../../../components/pricemanagement/price_account_mnc_mcc/list/PriceAccountMncMccList';
import PriceAccountMncMccEdit from '../../../components/pricemanagement/price_account_mnc_mcc/edit/PriceAccountMncMccEdit';
import PriceAccountMncMccView from '../../../components/pricemanagement/price_account_mnc_mcc/view/PriceAccountMncMccView';
import PriceCustomerList from '../../../components/pricemanagement/price_customer/list/PriceCustomerList';
import PriceCustomerCreate from '../../../components/pricemanagement/price_customer/create/PriceCustomerCreate';
import PriceCustomerEdit from '../../../components/pricemanagement/price_customer/edit/PriceCustomerEdit';
import PriceCustomerView from '../../../components/pricemanagement/price_customer/view/PriceCustomerView';
import PriceCustomerMncMccList from '../../../components/pricemanagement/price_customer_mnc_mcc/list/PriceCustomerMncMccList';
import PriceCustomerMncMccCreate from '../../../components/pricemanagement/price_customer_mnc_mcc/create/PriceCustomerMncMccCreate';
import PriceCustomerMncMccEdit from '../../../components/pricemanagement/price_customer_mnc_mcc/edit/PriceCustomerMncMccEdit';
import PriceCustomerMncMccView from '../../../components/pricemanagement/price_customer_mnc_mcc/view/PriceCustomerMncMccView';
import PriceSharedList from '../../../components/pricemanagement/price_shared/list/PriceSharedList';
import PriceSharedCreate from '../../../components/pricemanagement/price_shared/create/PriceSharedCreate';
import PriceSharedEdit from '../../../components/pricemanagement/price_shared/edit/PriceSharedEdit';
import PriceSharedView from '../../../components/pricemanagement/price_shared/view/PriceSharedView';
import PriceSharedMncMccList from '../../../components/pricemanagement/price_shared_mnc_mcc/list/PriceSharedMncMccList';
import PriceSharedMncMccCreate from '../../../components/pricemanagement/price_shared_mnc_mcc/create/PriceSharedMncMccCreate';
import PriceSharedMncMccEdit from '../../../components/pricemanagement/price_shared_mnc_mcc/edit/PriceSharedMncMccEdit';
import PriceSharedMncMccView from '../../../components/pricemanagement/price_shared_mnc_mcc/view/PriceSharedMncMccView';




function PriceManagementRoute() {
    return (
            <Routes>

                <Route element={<PrivateAuth />}>
                    
                    

                <Route exact path="/priceaccountgetall" element={<PriceAccountList />}></Route>
                <Route exact path="/priceaccountcreate" element={<PriceAccountCreate />}></Route>
                <Route exact path="/priceaccountedit" element={<PriceAccountEdit />}></Route>
                <Route exact path="/priceaccountview" element={<PriceAccountView />}></Route>

                <Route exact path="/priceaccountmncmccgetall" element={<PriceAccountMncMccList />}></Route>
                <Route exact path="/priceaccountmncmcccreate" element={<PriceAccountMncMccCreate />}></Route>
                <Route exact path="/priceaccountmncmccedit" element={<PriceAccountMncMccEdit />}></Route>
                <Route exact path="/priceaccountmncmccview" element={<PriceAccountMncMccView />}></Route>

                
                <Route exact path="/pricecustomergetall" element={<PriceCustomerList />}></Route>
                <Route exact path="/pricecustomercreate" element={<PriceCustomerCreate />}></Route>
                <Route exact path="/pricecustomeredit" element={<PriceCustomerEdit />}></Route>
                <Route exact path="/pricecustomerview" element={<PriceCustomerView />}></Route>

                
                
                <Route exact path="/pricecustomermncmccgetall" element={<PriceCustomerMncMccList />}></Route>
                <Route exact path="/pricecustomermncmcccreate" element={<PriceCustomerMncMccCreate />}></Route>
                <Route exact path="/pricecustomermncmccedit" element={<PriceCustomerMncMccEdit />}></Route>
                <Route exact path="/pricecustomermncmccview" element={<PriceCustomerMncMccView />}></Route>

                
                
                <Route exact path="/pricesharedgetall" element={<PriceSharedList />}></Route>
                <Route exact path="/pricesharedcreate" element={<PriceSharedCreate />}></Route>
                <Route exact path="/pricesharededit" element={<PriceSharedEdit />}></Route>
                <Route exact path="/pricesharedview" element={<PriceSharedView />}></Route>


                
                <Route exact path="/pricesharedmncmccgetall" element={<PriceSharedMncMccList />}></Route>

                <Route exact path="/pricesharedmncmcccreate" element={<PriceSharedMncMccCreate />}></Route>
                <Route exact path="/pricesharedmncmccedit" element={<PriceSharedMncMccEdit />}></Route>
                <Route exact path="/pricesharedmncmccview" element={<PriceSharedMncMccView />}></Route>

                
                







                   
                </Route>


            </Routes>
    )
}

export default PriceManagementRoute
