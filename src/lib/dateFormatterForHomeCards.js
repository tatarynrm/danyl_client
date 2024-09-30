const getMyFormat = (date)=>{
    let text = date
let partToUpper = text.substring(0, 2).toUpperCase(); // "НД"
let restOfText = text.substring(2); // ", 29 вер 2024 р., 21:24"
let result = partToUpper + restOfText;
return result;
}

export default getMyFormat