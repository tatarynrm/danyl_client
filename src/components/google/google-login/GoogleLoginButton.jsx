import { GoogleLogin } from '@react-oauth/google';
import $api from '../../../http';
import { Button } from '@chakra-ui/react';
import { FcGoogle } from "react-icons/fc";
const GoogleLoginButton = () => {
const google  = ()=>{
    window.open('http://localhost:8800/auth/google','_self')
}
    return (
<Button marginTop={'20px'} width={'100%'} rightIcon={<FcGoogle/>} onClick={google}>Увійти з Google  </Button>
   
      
     
  
    )
}

export default GoogleLoginButton