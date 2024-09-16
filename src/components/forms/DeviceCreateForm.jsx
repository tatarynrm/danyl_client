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
  Stack,
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
import LocationAutocomplete from "../google-maps/LocationAutocomplete";
import { validateDeviceCreate } from "../../validations/deviceValidation";

const DeviceCreateForm = () => {
  const [createProperties, setCreateProperties] = useState([])
  const [connectType,setConnectType] = useState(null)
  const toast = useCustomToast();
  const [errorCode, setErrorCode] = useState(null);

  const getDeviceCreateParams = async () => {
    try {
      const { data } = await $api.get('/devices/params');

      setCreateProperties(data)

    } catch (error) {
      console.log(error);

    }
  }
  const handleDeviceCreate = async (values, { resetForm }) => {
    try {

      console.log(values);
      
      const {data}  = await $api.post("/devices/create", values);



      if (data?.device?.code) {
        soundUserRegisterSuccess();
        setErrorCode("Апарат створено");
        toast(`Апарат ${data?.device?.code} створено`, 'success')
        // resetForm()
      }


    } catch (error) {
      console.log(error);
    }
  };


  const handleChangeConnectionType = (event, setFieldValue) => {
    const selectedId = event.target.value;
    setFieldValue('comunication_type', selectedId);

    setConnectType(selectedId)

// console.log(selectedId);

  };


  
  useEffect(() => {
    getDeviceCreateParams()
  }, [])
  return (
    <Formik
      initialValues={{
  
        device_model: null,
        device_cupure_model: null,
        device_coin_model: null,
        device_paypass_model: null,
        device_display_model: null,
        comunication_type: null,
        phone_number: null,
        service_phone_number:null
      }}
      validationSchema={validateDeviceCreate}
    onSubmit={handleDeviceCreate}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form  >
     
        
          <SelectField
            width={["100%", "100%", "30%", "30%"]}
            name="device_model"
            label={"Модель апарату"}


          >
            <option value="">Виберіть зі списку</option>
            {createProperties?.device_model && createProperties?.device_model.map((item, idx) => {
              return <option key={idx} value={item.id}>{item.title}</option>

            })}

          </SelectField>
          <SelectField
            width={["100%", "100%", "30%", "30%"]}
            name="device_cupure_model"
            label={"Модель купюрника"}


          >
            <option value="">Виберіть зі списку</option>
            {createProperties?.device_cupure_model && createProperties?.device_cupure_model.map((item, idx) => {
              return <option key={idx} value={item.id}>{item.type}</option>

            })}

          </SelectField>
          <SelectField
            width={["100%", "100%", "30%", "30%"]}
            name="device_coin_model"
            label={"Модель монетоприймача"}


          >
            <option value="">Виберіть зі списку</option>
            {createProperties?.device_cupure_model && createProperties?.device_cupure_model.map((item, idx) => {
              return <option key={idx} value={item.id}>{item.type}</option>

            })}

          </SelectField>
          <SelectField
            width={["100%", "100%", "30%", "30%"]}
            name="device_paypass_model"
            label={"Модель PAYPASS"}


          >
            <option value="">Виберіть зі списку</option>
            {createProperties?.device_paypass_model && createProperties?.device_paypass_model.map((item, idx) => {
              return <option key={idx} value={item.id}>{item.type}</option>

            })}

          </SelectField>

          <SelectField
            width={["100%", "100%", "30%", "30%"]}
            name="comunication_type"
            label={"Тип зв'язку"}
            onChange={(event)=> handleChangeConnectionType(event,setFieldValue)}
          >
            <option value="">Виберіть зі списку</option>
            {createProperties?.device_comunication_type && createProperties?.device_comunication_type.map((item, idx) => {
              return <option key={idx} value={item.id}>{item.type}</option>

            })}



          </SelectField>

          {/* {connectType == 1 &&  <TextField width={"30%"} name="phone_number" type="text" label={"Номер телефону"} />  } */}
          <SelectField
             width={["100%", "100%", "30%", "30%"]}
            name="device_display_model"
            label={"Тип дисплея"}

          >
            <option value="">Виберіть зі списку</option>
            {createProperties?.device_display_model && createProperties?.device_display_model.map((item, idx) => {
              return <option key={idx} value={item.id}>{item.screen}</option>

            })}


          </SelectField>



          {/* <LocationAutocomplete/> */}


          <PhoneNumberField
            name="phone_number"
            type="text"
            label={`Номер телефону апарату`}
            placeholder={"Формат 0980000000"}
            width={["100%", "100%", "30%", "30%"]}
          />
          <PhoneNumberField
            name="service_phone_number"
            type="text"
            label={`Сервісний номер телефону`}
            placeholder={"Формат 098000000"}
            width={["100%", "100%", "30%", "30%"]}
          />


          <Button marginTop={'20px'} type="submit">Створити апарат</Button>
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

export default DeviceCreateForm