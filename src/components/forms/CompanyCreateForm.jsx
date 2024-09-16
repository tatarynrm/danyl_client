import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { validateUserRegister } from "../../validations/authValidation";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  Toast,

} from "@chakra-ui/react";
import TextField from "./TextField";
import PhoneNumberField from "./PhoneNumberField";
import SelectField from "./SelectField";
import $api from "../../http";
import { useEffect, useState } from "react";
import {
  soundUserRegisterError,
  soundUserRegisterSuccess,
} from "../../helpers/soundEffects";
import useCustomToast from "../../hooks/useCustomToast";
import { validateCompanyRegister } from './../../validations/companyValidation';

const CompanyCreateForm = () => {
  const [companyType,setCompanyType] = useState([])
  const [companyDesc,setCompanyDesc] = useState('')
    const toast = useCustomToast();
    const [errorCode, setErrorCode] = useState(null);
    const handleUserCreate = async (values,{resetForm}) => {
      try {
        const  {data}  = await $api.post("/company/register", values);


        if (data?.result?.command === 'INSERT') {
          soundUserRegisterSuccess();
          setErrorCode("Компанію створено");
          toast(`Компанію ${data?.result?.rows[0].company_name} створено`,'success')
          resetForm()
        }
        if (data?.message === "Company is already exist") {
          soundUserRegisterError();
          setErrorCode("Компанія з таким кодом ЄРДПОУ вже існує");
          toast('Компанія з таким кодом ЄРДПОУ вже існує','error')
          
       
        }

      } catch (error) {
        console.log(error);
      }
    };
    const getCompanyType = async ()=>{
      try {
          const {data} = await $api.get('/company/company-type');

     
          setCompanyType(data)
          
      } catch (error) {
          console.log(error);
          
      }
  }
    useEffect(()=>{
      getCompanyType()
  },[])

  const handleChange = (event, setFieldValue) => {
    const selectedId = event.target.value;
    setFieldValue('type', selectedId);
    
    const selectedType = companyType.find(type => type.id === selectedId);
    if (selectedType) {
      setCompanyDesc(selectedType.desc);
    }else {
      setCompanyDesc('')
    }
  };
  
    return (
      <Formik
        initialValues={{
          type: null,
          company_name: "",
          director_name: "",
          director_surname: "",
          director_last_name: "",
          company_code: "",
          legal_address: "",
          phone_number:""
        }}
        validationSchema={validateCompanyRegister}
        onSubmit={handleUserCreate}
      >
        {({ errors, touched ,setFieldValue}) => (
          <Form>
                        <SelectField
              width={["100%", "100%", "30%", "30%"]}
              name="type"
              label={"Оберіть тип компанії"}
              onChange={(event)=> handleChange(event,setFieldValue)}
           
            >
              <option value="">Виберіть зі списку</option>
             {companyType && companyType.map((item,idx)=>{
              return  <option onClick={()=> setCompanyDesc(item.desc)} key={idx} value={item.id}>{item.name}</option>
             
             })}
         
            </SelectField>
            <Text color={'green.200'}>{companyDesc}</Text>
            <TextField name="company_name" type="text" label={"Назва компанії"} />
            <TextField name="director_surname" type="text" label={"Прізвище директора"} />
            <TextField name="director_name" type="text" label={`Ім'я директора`} />
            <TextField name="director_last_name" type="text" label={`По-батькові`} />
            <TextField name="company_code" type="text" label={`ЄРДПОУ КОМПАНІЇ`} />
            <TextField name="legal_address" type="text" label={`Адреса`} />
            <PhoneNumberField
              name="phone_number"
              type="text"
              label={`Номер телефону`}
              placeholder={"Формат 0987776655"}
            />

  
            <Button type="submit">Створити компанію</Button>
            {errorCode && (
              <Text color={errorCode.includes("створено") ? "green" : "red"}>
                {errorCode}
              </Text>
    
            )}
         
          </Form>
        )}
      </Formik>
    );
}

export default CompanyCreateForm;