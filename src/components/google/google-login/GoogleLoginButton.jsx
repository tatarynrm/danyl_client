import { GoogleLogin } from '@react-oauth/google';
import $api from '../../../http';
import { Button } from '@chakra-ui/react';
import { FcGoogle } from "react-icons/fc";
const GoogleLoginButton = () => {
const google  = ()=>{
    // window.open('https://api.vendwater.tech/auth/google','_self')
    window.open('https://api.vendwater.tech/auth/google','_blank', 'width=600,height=400')
}
    return (
<Button marginTop={'20px'} width={'100%'} rightIcon={<FcGoogle/>} onClick={google}>Увійти з Google  </Button>
   
      
     
  
    )
}

export default GoogleLoginButton