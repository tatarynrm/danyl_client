import { FiHome } from "react-icons/fi"
import { MdDevices, MdOutlineWaterDrop } from "react-icons/md"
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FcStatistics } from "react-icons/fc";
import { FaRegUser } from "react-icons/fa";
import { IoCardSharp } from "react-icons/io5";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { TbCurrencyDollarOff } from "react-icons/tb";
import { GrServices } from "react-icons/gr";
import { TbMessages } from "react-icons/tb";
import { GrDocumentPerformance } from "react-icons/gr";
import { FaCcApplePay } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md";
export  const sidebar_menu = [
    {id:1,title:"Головна",link:"/",description:'Домашня сторінка',icon:FiHome,role:'all'},
    {id:9,title:"Адмін",link:"/admin",description:'Адміністрування сервісами,користувачами,апаратами ...',icon:MdAdminPanelSettings,role:'admin'},
    {id:2,title:"Апарати",link:"/devices",description:'Апарати',icon:MdDevices,role:'all'},
    {id:3,title:`Точки`,link:"/places",description:'Торгові точки',icon:HiOutlineLocationMarker,role:'all'},
    {id:4,title:"Статистика",link:"/statistic",description:'Статистика',icon:FcStatistics,role:'all'},
    {id:5,title:"Покупці",link:"/buyers",description:'Список користувачів',icon:FaRegUser,role:'admin'},
    {id:6,title:"Картки",link:"/cards",description:'Осблуговування карток',icon:IoCardSharp,role:'admin'},
    {id:6,title:"Фінанси",link:"/finance",description:'Блок фінансів.Переглядайте свої витрати',icon:FaHandHoldingDollar,role:'all'},
    {id:7,title:"Витрати",link:"/costs",description:'Витрати',icon:TbCurrencyDollarOff,role:'all'},
    {id:10,title:"Обслговування",link:"/service",description:'Обслуговування',icon:GrServices,role:'all'},
    {id:11,title:"Повідомлення",link:"/messages",description:'Повідомлення',icon:TbMessages,role:'all'},
    {id:12,title:"Логи",link:"/logs",description:'Список операцій по усім параметрам',icon:GrDocumentPerformance,role:'all'},
    {id:13,title:"Рахунки",link:"/payment",description:'Розрахункові операції',icon:FaCcApplePay,role:'all'},
    {id:14,title:"Налаштування",link:"/settings",description:'Конфігурація системи.Налаштуйте під свої потреби',icon:CiSettings,role:'all'},
  
]

