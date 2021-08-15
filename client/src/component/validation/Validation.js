
const isEmail = (email)=>{
    var checkEmail = /^\(?([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})$/;
    return checkEmail.test(email);
}

const isPhoneNumber = (phoneNumber)=>{
    var checkPhonenNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return  checkPhonenNumber.test(phoneNumber);
}
const isPassword=(password)=>{
    var checkpassword = /^\(?([a-z0-9A-Z_.-]{8})\)?/;
    return  checkpassword.test(password);
}

const isString=(string)=>{
    var checkString = /^[a-zA-Z\s]+$/;
    return checkString.test(string)
}


const isIsraeliID = id => /\d{9}/.test(id) && Array.from(id, Number).reduce((counter, digit, i) => {
    const step = digit * ((i % 2) + 1);
    return counter + (step > 9 ? step - 9 : step);
}) % 10 === 0;

const isRequired = (value)=>{
    return value == '' ? false: true;
}

const validation =(value)=>{
    const errors ={};   
    const checkEmail = (emailValue) => {
        if (!isRequired(emailValue)){
            return "This field is required";
        }
        if (!isEmail(emailValue)){
            return "the mail is incorrect"
        }
    } 
    const errorsMail = checkEmail(value.email);
    if (errorsMail != null){
        errors.email=errorsMail;
    }
     
 
  
    const checkPhoneNumber = (PhoneNumberValue) => {
        if (!isRequired(PhoneNumberValue)){
            return "This field is required";
        }
        if (!isPhoneNumber(PhoneNumberValue)){
            return "the PhoneNumber is incorrect"
        }
    }
  
    const errorsPhoneNumber = checkPhoneNumber(value.phoneNumber);
    if (errorsPhoneNumber != null){
        errors.phoneNumber=errorsPhoneNumber;
    }
    const checkPassword = (passwordValue,) => {
        if (!isRequired(passwordValue)){
            return "This field is required";
        }
        if (!isPassword(passwordValue)){
            return "need at least 8 charachters"
        }
    }
    const errorspassword = checkPassword(value.password);
    if (errorspassword != null){
        errors.password=errorspassword;
    }
    const checkName = (nameValue) => {
        if (!isRequired(nameValue)){
            return "This field is required";
        }
        if (!isString(nameValue)){
            return "The name is incorrect"
        }
    }

    const errorsName = checkName(value.userName); 
    if (errorsName != null){
        errors.userName=errorsName;
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