import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import AccountCreate from '../../../components/accountmanagement/account/create/AccountCreate';
import CostCarrierList from '../../../components/costmanagement/costcarrier/list/CostCarrierList';
import CostCarrierCreate from '../../../components/costmanagement/costcarrier/create/CostCarrierCreate';
import CostCarrierEdit from '../../../components/costmanagement/costcarrier/edit/CostCarrierEdit';
import CostCarrierView from '../../../components/costmanagement/costcarrier/view/CostCarrierView';
import CostCarrierMncmccList from '../../../components/costmanagement/costcarriermncmcc/list/CostCarrierMncmccList';
import CostCarrierMncmccCreate from '../../../components/costmanagement/costcarriermncmcc/create/CostCarrierMncmccCreate';
import CostCarrierMncmccEdit from '../../../components/costmanagement/costcarriermncmcc/edit/CostCarrierMncmccEdit';
import CostCarrierMncmccView from '../../../components/costmanagement/costcarriermncmcc/view/CostCarrierMncmccView';
import CostSmscList from '../../../components/costmanagement/cost_smsc/list/CostSmscList';
import CostSmscCreate from '../../../components/costmanagement/cost_smsc/create/CostSmscCreate';
import CostSmscEdit from '../../../components/costmanagement/cost_smsc/edit/CostSmscEdit';
import CostSmscView from '../../../components/costmanagement/cost_smsc/view/CostSmscView';
import CostSmscMncmccList from '../../../components/costmanagement/cost_smsc_mncmcc/list/CostSmscMncmccList';
import CostSmscMncmccCreate from '../../../components/costmanagement/cost_smsc_mncmcc/create/CostSmscMncmccCreate';
import CostSmscMncmccEdit from '../../../components/costmanagement/cost_smsc_mncmcc/edit/CostSmscMncmccEdit';
import CostSmscMncmccView from '../../../components/costmanagement/cost_smsc_mncmcc/view/CostSmscMncmccView';




function CostManagementRoute() {
    return (
            <Routes>

                <Route element={<PrivateAuth />}>
                    
                    

                <Route exact path="/costcarriergetall" element={<CostCarrierList />}></Route>
                <Route exact path="/costcarriercreate" element={<CostCarrierCreate />}></Route>
                <Route exact path="/costcarrieredit" element={<CostCarrierEdit />}></Route>
                <Route exact path="/costcarrierview" element={<CostCarrierView />}></Route>


                
                
                <Route exact path="/costcarriermncmccgetall" element={<CostCarrierMncmccList />}></Route>
                <Route exact path="/costcarriermncmcccreate" element={<CostCarrierMncmccCreate />}></Route>
                <Route exact path="/costcarriermncmccedit" element={<CostCarrierMncmccEdit />}></Route>
                <Route exact path="/costcarriermncmccview" element={<CostCarrierMncmccView />}></Route>

                
                <Route exact path="/costsmscgetall" element={<CostSmscList />}></Route>
                <Route exact path="/costsmsccreate" element={<CostSmscCreate />}></Route>
                <Route exact path="/costsmscedit" element={<CostSmscEdit/>}></Route>
                <Route exact path="/costsmscview" element={<CostSmscView/>}></Route>

                
                <Route exact path="/costsmscmncmccgetall" element={<CostSmscMncmccList />}></Route>
                <Route exact path="/costsmscmncmcccreate" element={<CostSmscMncmccCreate />}></Route>
                <Route exact path="/costsmscmncmccedit" element={<CostSmscMncmccEdit />}></Route>
                <Route exact path="/costsmscmncmccview" element={<CostSmscMncmccView />}></Route>

                
                
                </Route>


            </Routes>
    )
}

export default CostManagementRoute
