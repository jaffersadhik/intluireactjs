import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PublicRoutes from './router/public/PublicRoutes';

import Sidebarmain from './Sidebarmain';
import MasterenumRoute from './router/private/privateRotes/MasterenumRoute';
import { ColorProvider } from './utils/modules/ColorContext';
import AccountmanagementRoute from './router/private/privateRotes/AccountmanagementRoute';
import SenderidManagementRoute from './router/private/privateRotes/SenderidManagementRoute';
import IpManagementRoute from './router/private/privateRotes/IpManagementRoute';
import VendorManagementRoute from './router/private/privateRotes/VendorManagementRoute';
import CostManagementRoute from './router/private/privateRotes/CostManagementRoute';
import PriceManagementRoute from './router/private/privateRotes/PriceManagementRoute';
import ErrorcodeManagementRoute from './router/private/privateRotes/ErrorcodeManagementRoute';
import RouteManagementRoute from './router/private/privateRotes/RouteManagementRoute';
import WebhookManagementRoute from './router/private/privateRotes/WebhookManagementRoute';

function App() {
  return (
    <>
    <ColorProvider>
  
    <Router>
      <Routes>
        {/* No sidebar for public routes */}
        <Route exact path="/*" element={<PublicRoutes />} />

   
        <Route exact path='/masterenum*' element={<Sidebarmain><MasterenumRoute/></Sidebarmain>} />
        <Route exact path='/account*' element={<Sidebarmain><AccountmanagementRoute/></Sidebarmain>} />
        <Route exact path='/senderid*' element={<Sidebarmain><SenderidManagementRoute/></Sidebarmain>} />
        <Route exact path='/ip*' element={<Sidebarmain><IpManagementRoute/></Sidebarmain>} />
        <Route exact path='/vendor*' element={<Sidebarmain><VendorManagementRoute/></Sidebarmain>} />
        <Route exact path='/cost*' element={<Sidebarmain><CostManagementRoute/></Sidebarmain>} />
        <Route exact path='/price*' element={<Sidebarmain><PriceManagementRoute/></Sidebarmain>} />
        <Route exact path='/errorcode*' element={<Sidebarmain><ErrorcodeManagementRoute/></Sidebarmain>} />
        <Route exact path='/route*' element={<Sidebarmain><RouteManagementRoute/></Sidebarmain>} />
        <Route exact path='/webhook*' element={<Sidebarmain><WebhookManagementRoute/></Sidebarmain>} />

        

      </Routes>
    </Router>

    </ColorProvider>
    
    </>
  );
}

export default App;
