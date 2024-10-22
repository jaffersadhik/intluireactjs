import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import CarrierList from '../../../components/vendormanagement/carrier/list/CarrierList';
import CarrierCreate from '../../../components/vendormanagement/carrier/create/CarrierCreate';
import CarrierEdit from '../../../components/vendormanagement/carrier/edit/CarrierEdit';
import CarrierView from '../../../components/vendormanagement/carrier/view/CarrierView';
import SmscList from '../../../components/vendormanagement/smsc/list/SmscList';
import SmscCreate from '../../../components/vendormanagement/smsc/create/SmscCreate';
import SmscEdit from '../../../components/vendormanagement/smsc/edit/SmscEdit';
import SmscView from '../../../components/vendormanagement/smsc/view/SmscView';
import DatacenterList from '../../../components/vendormanagement/datacenter/list/DatacenterList';
import KannelHostList from '../../../components/vendormanagement/kannelhost/list/KannelHostList';
import KannelHostCreate from '../../../components/vendormanagement/kannelhost/create/KannelHostCreate';
import KannelHostEdit from '../../../components/vendormanagement/kannelhost/edit/KannelHostEdit';
import DcSmscidList from '../../../components/vendormanagement/dc_smscid/list/DcSmscidList';
import DcSmscidCreate from '../../../components/vendormanagement/dc_smscid/create/DcSmscidCreate';
import DcSmscidView from '../../../components/vendormanagement/dc_smscid/view/DcSmscidView';
import DcSmscidEdit from '../../../components/vendormanagement/dc_smscid/edit/DcSmscidEdit';



function VendorManagementRoute() {
    return (
            <Routes>

                <Route element={<PrivateAuth />}>
                    
                    

                <Route exact path="/carriergetall" element={<CarrierList />}></Route>
                <Route exact path="/carriercreate" element={<CarrierCreate />}></Route>
                <Route exact path="/carrieredit" element={<CarrierEdit />}></Route>
                <Route exact path="/carrierview" element={<CarrierView />}></Route>

                
                
                
                <Route exact path="/smscgetall" element={<SmscList />}></Route>
                <Route exact path="/smsccreate" element={<SmscCreate />}></Route>
                <Route exact path="/smscedit" element={<SmscEdit />}></Route>
                <Route exact path="/smscview" element={<SmscView />}></Route>

                
                <Route exact path="/datacentergetall" element={<DatacenterList />}></Route>


                <Route exact path="/kannelhostgetall" element={<KannelHostList />}></Route>
                <Route exact path="/kannelhostcreate" element={<KannelHostCreate />}></Route>
                <Route exact path="/kannelhostedit" element={<KannelHostEdit />}></Route>

                <Route exact path="/dcsmscidgetall" element={<DcSmscidList />}></Route>
                <Route exact path="/dcsmscidcreate" element={<DcSmscidCreate />}></Route>
                <Route exact path="/dcsmscidview" element={<DcSmscidView />}></Route>
                <Route exact path="/dcsmscidedit" element={<DcSmscidEdit />}></Route>

                
                
                
                
                </Route>


            </Routes>
    )
}

export default VendorManagementRoute
