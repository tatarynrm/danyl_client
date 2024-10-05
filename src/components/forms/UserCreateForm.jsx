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


const UserCreateForm = () => {
    const toast = useCustomToast();


  const [errorCode, setErrorCode] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [searchCompany, setSearchCompany] = useState('');
  const handleUserCreate = async (values,{resetForm}) => {
   
    try {
      const { data } = await $api.post("/auth/registration", values);
      console.log(values);
      if (data?.user?.id) {
        soundUserRegisterSuccess();
        setErrorCode("Користувача створено");
        toast('Користувача створено','success')
        resetForm()
      }
      if (data?.message === "User is already exist") {
        soundUserRegisterError();
        setErrorCode("Користувач з таким e-mail вже існує");
        toast('Користувач з таким e-mail вже існує','error')
        
     
      }
      if (data?.message === "INCORECT DATA") {
        soundUserRegisterError();
        setErrorCode("Заповніть усі поля");
   
        toast('Невірна інформація','warning')
      }
    } catch (error) {
      console.log(error);
    }
  };

    const fetchCompanies = async () => {
      try {
          const response = await $api.post('/company/companies-search',{searchValue:searchCompany}); // Replace with your API endpoint
         
          console.log('COMPANIES',response);
          
          setCompanies(response.data); // Adjust according to the structure of your response
      } catch (error) {
          console.error('Error fetching companies:', error);
      }
  };
  useEffect(() => {
 
      if (searchCompany.length > 2) {
        fetchCompanies(searchCompany);
      }
  }, [searchCompany]);
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        name: "",
        lastname: "",
        surname: "",
        phone_number: "",
        role_id: "",
        company_id: "",
      }}
      validationSchema={validateUserRegister}
      onSubmit={handleUserCreate}
    >
      {({ errors, touched,setFieldValue }) => (
        <Form>
          <TextField name="email" type="text" label={"Email"} />
          <TextField name="password" type="password" label={"Пароль"} />
          <TextField name="lastname" type="text" label={`Прізвище`} />
          <TextField name="name" type="text" label={`Ім'я`} />
          <TextField name="surname" type="text" label={`По-батькові`} />
          <PhoneNumberField
            name="phone_number"
            type="text"
            label={`Номер телефону`}
            placeholder={"Формат 0987776655"}
          />
          <SelectField
            width={["100%", "100%", "30%", "30%"]}
            name="role_id"
            label={"Оберіть тип користувача"}
           
          >
            <option value="">Оберіть опцію</option>
            <option  value="3">Користувач</option>
            <option value="2">Адміністратор</option>
            <option value="1">Супер Адмін</option>
          </SelectField>
           {/* Company Name Input */}
           <Input marginTop={'10px'}
                        name="company_name"
                        type="text"
                        placeholder="Назва компанії"
                        onChange={(e) => {
                          setFieldValue('company_name', e.target.value)
                          setSearchCompany(e.target.value)
                       
                        }}
                    />

                   {/* Company Selection Dropdown */}
                   <Select
                   marginTop={'10px'}
                        name="company_id"
                        placeholder="Оберіть компанію"
                        onChange={(e) => setFieldValue('company_id', e.target.value)}
                    >
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.company_name} {/* Adjust based on your data structure */}
                            </option>
                        ))}
                    </Select>

          <Button type="submit">Створити користувача</Button>
          {errorCode && (
            <Text color={errorCode.includes("створено") ? "green" : "red"}>
              {errorCode}
            </Text>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default UserCreateForm;
