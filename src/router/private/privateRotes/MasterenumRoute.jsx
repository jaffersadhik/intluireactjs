import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import PrivateAuth from '../authorization/PrivateAuth';
import InvoiceTypeCreate from '../../../components/masterenum/invoicetype/create/InvoiceTypeCreate';
import InvoiceTypeList from '../../../components/masterenum/invoicetype/list/InvoiceTypeList';




function MasterenumRoute() {
    return (
            <Routes>

                <Route element={<PrivateAuth />}>
                    
                    

                <Route exact path="/invoicetypecreate" element={<InvoiceTypeCreate />}></Route>
                <Route exact path="/invoicetypelist" element={<InvoiceTypeList />}></Route>



                















                   
                </Route>


            </Routes>
    )
}

export default MasterenumRoute
