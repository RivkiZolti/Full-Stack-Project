const isString=(string)=>{
    var checkString = /^[a-zA-Z\s]+$/;
    return checkString.test(string)
}



const isRequired = (value)=>{
    return value == '' ? false: true;
}
const iscreditcard=(creditCard)=>{
  
    var cardno1= /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var cardno2 = /^(?:3[47][0-9]{13})$/;
    var cardno3 = /^(?:5[1-5][0-9]{14})$/;
    
    if (creditCard.match(cardno1) || creditCard.match(cardno2) || creditCard.match(cardno3)) {
        return true;
    }
    else {

        return false;
   
    
}
}
const isyear=(year)=>{
    var reg_exp='^[0-9]{2}$';
    if(year.match(reg_exp) && Number(year)>20) return true;
    else return false;
}

const ismonth=(month)=>{
    let reg_exp='^[0-9]{2}$';
    if(month.match(reg_exp) && Number(month)<13 && Number(month)>0) return true;
    else return false;
}

const isdigit=(digits)=>{
    let reg_exp='^[0-9]{3}$';
    if(digits.match(reg_exp)) return true;
    else return false;
}
const isIsraeliID = id => /\d{9}/.test(id) && Array.from(id, Number).reduce((counter, digit, i) => {
    const step = digit * ((i % 2) + 1);
    return counter + (step > 9 ? step - 9 : step);
}) % 10 === 0;

const validation =(value)=>{
    const errors ={};   
    const checkcredit = (creditValue) => {
        if (!isRequired(creditValue)){
            return "This field is required";
        }
        if (!iscreditcard(creditValue)){
            return "the credit is incorrect"
        }
    } 
    const errorsCredit = checkcredit(value.cerditcard);
    if (errorsCredit != null){
        errors.cerditcard=errorsCredit;
    }

    const checkyear = (yearValue) => {
        if (!isRequired(yearValue)){
            return "This field is required";
        }
        if (!isyear(yearValue)){
            return "the year is incorrect"
        }
    }
    const errorsyear = checkyear(value.year);
    if (errorsyear != null){
        errors.year=errorsyear;
    }
   
    const checkNmonth= (monthValue) => {
        if (!isRequired(monthValue)){
            return "This field is required";
        }
        if (!ismonth(monthValue)){
            return "The mounth is incorrect"
        }
    }
    const errorsmonth= checkNmonth(value.month); 
    if (errorsmonth!= null){
        errors.month=errorsmonth;
    }
    const checkId = (idValue) => {
        if (!isRequired(idValue)){
            return "This field is required";
        }
        if (!isIsraeliID(idValue)){
            return "the id is incorrect"
        }
    }
    const errorsId = checkId(value.id);
    if (errorsId != null){
        errors.id=errorsId;
    }
   
    const checkdigit = (digitValue) => {
        if (!isRequired(digitValue)){
            return "This field is required";
        }
        if (!isdigit(digitValue)){
            return "the digit is incorrect"
        }
    }
    const errorsdigit= checkdigit(value.digit);
    if (errorsdigit != null){
        errors.digit=errorsdigit;
    }
   
    const checkTypeOfComplaint = (stringValue) => {
        if (!isRequired(stringValue)){
            return "This field is required";
        }
        if (!isString(stringValue)){
            return "the string is incorrect"
        }
    }
    const errorsTypeOfComplaint = checkTypeOfComplaint(value.type_of_complaint);     
    if (errorsTypeOfComplaint != null){
        errors.type_of_complaint=errorsTypeOfComplaint;
    }
    return errors;
}
export{
    validation
}