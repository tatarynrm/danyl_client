import * as Yup from 'yup'

export const validateDeviceCreate = Yup.object({
    device_model: Yup.number().required('Вкажіть модель'),
    device_cupure_model: Yup.number().required(`Вкажіть модель купюрника`),
    device_coin_model:Yup.number().required(`Вкажіть модель монетоприймача`),
    device_paypass_model:Yup.number().required(`Вкажіть модель Paypass`),
    comunication_type:Yup.number().required(`Вкажіть тип зв'язку`),
    device_display_model:Yup.number().required(`Вкажіть тип дисплея`),
    
    phone_number: Yup.string().matches(/^[0-9]{10}$/, "Номер телефону повинен складатися з 10 цифр").required(`Обов'язкове поле`),
    service_phone_number: Yup.string().matches(/^[0-9]{10}$/, "Номер телефону повинен складатися з 10 цифр").required(`Обов'язкове поле`),


})