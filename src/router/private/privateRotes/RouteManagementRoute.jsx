import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import RouteList from '../../../components/routemanagement/route/list/RouteList';
import RouteAccountList from '../../../components/routemanagement/route_account/list/RouteAccountList';
import RouteAccountCreate from '../../../components/routemanagement/route_account/create/RouteAccountCreate';
import RouteAccountEdit from '../../../components/routemanagement/route_account/edit/RouteAccountEdit';
import RouteAccountView from '../../../components/routemanagement/route_account/view/RouteAccountView';
import RouteAccountMncMccList from '../../../components/routemanagement/route_account_mncmcc/list/RouteAccountMncMccList';
import RouteAccountMncMccCreate from '../../../components/routemanagement/route_account_mncmcc/create/RouteAccountMncMccCreate';
import RouteAccountMncMccEdit from '../../../components/routemanagement/route_account_mncmcc/edit/RouteAccountMncMccEdit';
import RouteCustomerList from '../../../components/routemanagement/route_customer/list/RouteCustomerList';
import RouteCustomerCreate from '../../../components/routemanagement/route_customer/create/RouteCustomerCreate';
import RouteCustomerEdit from '../../../components/routemanagement/route_customer/edit/RouteCustomerEdit';
import RouteCustomerView from '../../../components/routemanagement/route_customer/view/RouteCustomerView';
import RouteCustomerMncMccCreate from '../../../components/routemanagement/route_customer_mncmcc/create/RouteCustomerMncMccCreate';
import RouteCustomerMncMccList from '../../../components/routemanagement/route_customer_mncmcc/list/RouteCustomerMncMccList';
import RouteCustomerMncMccEdit from '../../../components/routemanagement/route_customer_mncmcc/edit/RouteCustomerMncMccEdit';
import RouteCustomerMncMccView from '../../../components/routemanagement/route_customer_mncmcc/view/RouteCustomerMncMccView';
import RouteAccountMncMccView from '../../../components/routemanagement/route_account_mncmcc/view/RouteAccountMncMccView';
import RouteSharedList from '../../../components/routemanagement/route_shared/list/RouteSharedList';
import RouteSharedCreate from '../../../components/routemanagement/route_shared/create/RouteSharedCreate';
import RouteSharedEdit from '../../../components/routemanagement/route_shared/edit/RouteSharedEdit';
import RouteSharedView from '../../../components/routemanagement/route_shared/view/RouteSharedView';
import RouteSharedMncMccList from '../../../components/routemanagement/route_shared_mncmcc/list/RouteSharedMncMccList';
import RouteSharedMncMccCreate from '../../../components/routemanagement/route_shared_mncmcc/create/RouteSharedMncMccCreate';
import RouteSharedMncMccEdit from '../../../components/routemanagement/route_shared_mncmcc/edit/RouteSharedMncMccEdit';
import RouteSharedMncMccView from '../../../components/routemanagement/route_shared_mncmcc/view/RouteSharedMncMccView';




function RouteManagementRoute() {
    return (
            <Routes>

                <Route element={<PrivateAuth />}>
                    
                    

                <Route exact path="/routegetall" element={<RouteList />}></Route>


                <Route exact path="/routeaccountgetall" element={<RouteAccountList />}></Route>
                <Route exact path="/routeaccountcreate" element={<RouteAccountCreate />}></Route>
                <Route exact path="/routeaccountedit" element={<RouteAccountEdit />}></Route>
                <Route exact path="/routeaccountview" element={<RouteAccountView />}></Route>

                
                <Route exact path="/routeaccountmncmccgetall" element={<RouteAccountMncMccList />}></Route>
                <Route exact path="/routeaccountmncmcccreate" element={<RouteAccountMncMccCreate />}></Route>
                <Route exact path="/routeaccountmncmccedit" element={<RouteAccountMncMccEdit />}></Route>
                <Route exact path="/routeaccountmncmccview" element={<RouteAccountMncMccView />}></Route>

                
                
                <Route exact path="/routecustomergetall" element={<RouteCustomerList />}></Route>
                <Route exact path="/routecustomercreate" element={<RouteCustomerCreate />}></Route>
                <Route exact path="/routecustomeredit" element={<RouteCustomerEdit />}></Route>
                <Route exact path="/routecustomerview" element={<RouteCustomerView />}></Route>


                
                <Route exact path="/routecustomermncmccgetall" element={<RouteCustomerMncMccList />}></Route>
                <Route exact path="/routecustomermncmcccreate" element={<RouteCustomerMncMccCreate />}></Route>
                <Route exact path="/routecustomermncmccedit" element={<RouteCustomerMncMccEdit />}></Route>
                <Route exact path="/routecustomermncmccview" element={<RouteCustomerMncMccView />}></Route>

                

                
                <Route exact path="/routesharedgetall" element={<RouteSharedList />}></Route>
                <Route exact path="/routesharedcreate" element={<RouteSharedCreate />}></Route>
                <Route exact path="/routesharededit" element={<RouteSharedEdit />}></Route>
                <Route exact path="/routesharedview" element={<RouteSharedView />}></Route>

                
                
                <Route exact path="/routesharedmncmccgetall" element={<RouteSharedMncMccList />}></Route>
                <Route exact path="/routesharedmncmcccreate" element={<RouteSharedMncMccCreate />}></Route>
                <Route exact path="/routesharedmncmccedit" element={<RouteSharedMncMccEdit />}></Route>
                <Route exact path="/routesharedmncmccview" element={<RouteSharedMncMccView />}></Route>

                
                
                </Route>


            </Routes>
    )
}

export default RouteManagementRoute
