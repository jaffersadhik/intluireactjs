import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

export const Userdecode =()=> {
    const authstate = useSelector((state)=> state.Auth)
    
    const token = authstate?.accessToken
    const user = jwtDecode(token); // Use jwt_decode.default to access the function


  return user.sub
}

