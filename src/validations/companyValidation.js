import * as Yup from 'yup'

export const validateCompanyRegister = Yup.object({
    company_name: Yup.string().required('Вкажіть назву компанії').max(60,'Забагато символів'),
    director_name: Yup.string().required(`Вкажіть ім'я директора`).max(60,'Забагато символів') ,
    director_surname:Yup.string().required(`Вкажіть прізвище`).max(20,'Забагато символів'),
    director_last_name:Yup.string().required(`Вкажіть по-батькові`).max(20,'Забагато символів'),
    company_code:Yup.number().required(`Вкажіть код ЄРДПОУ`).typeError('КОД ЄРДПОУ --- ЛИШЕ ЦИФРИ'),
    legal_address:Yup.string().required(`Вкажіть адресу компанії`).max(60,'Забагато символів'),
    phone_number: Yup.string().matches(/^[0-9]{10}$/, "Номер телефону повинен складатися з 10 цифр").required(`Обов'язкове поле`),
    type:Yup.number().required('Оберіть тип компанії')
})