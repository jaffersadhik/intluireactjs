import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateAuth = () => {
    const authstate = useSelector((state)=> state.Auth)
    

    console.log(authstate,"authstate")
    const location = useLocation();
  return (
    // authstate != null

    authstate?.accessToken != null
        ? <Outlet state={{from: location}} />
        : <Navigate to="/" state={{ from: location.pathname }} replace />
    
)
}

export default PrivateAuth