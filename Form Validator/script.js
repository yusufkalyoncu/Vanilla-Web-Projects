let submitButton = document.querySelector(".button");
submitButton.addEventListener("click", onClick);

function onClick(e){
    let USERNAME = document.querySelector("#username");
    let EMAIL = document.querySelector("#email");
    let PASSWORD = document.querySelector("#password");
    let PASSWORD2 = document.querySelector("#password2");
    let SUBMIT_TEXT = document.querySelector("#submit-message");
    
    let validateUsername = ValidateUsername(USERNAME);
    let validateEmail = ValidateEmail(EMAIL);
    let validatePasswords = ValidatePasswords(PASSWORD, PASSWORD2);

    if(validateUsername && validateEmail && validatePasswords){
        
        ResetBorder(USERNAME);
        ResetBorder(EMAIL);
        ResetBorder(PASSWORD);
        ResetBorder(PASSWORD2);
        CleanTextFields(USERNAME, EMAIL, PASSWORD, PASSWORD2); 
        ChangeVisibility(SUBMIT_TEXT, "visible");
    }
}

function ValidateUsername(usernameDOM){

    let username = usernameDOM.value;
    let errorDOM = document.querySelector("#username-error");
    if(username.length >= 3){
        ChangeVisibility(errorDOM, "hidden");
        MakeGreenBorder(usernameDOM);
        return true;
    }
    else{
        MakeRedBorder(usernameDOM);
        SendErrorMessage(errorDOM, "Username must be at least 3 characters");
        ChangeVisibility(errorDOM, "visible");
        return false;
    }
}

function ValidateEmail(emailDOM){

    let email = emailDOM.value;
    let errorDOM = document.querySelector("#email-error");
    let valid = email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      if(valid){
          MakeGreenBorder(emailDOM);
          ChangeVisibility(errorDOM, "hidden");
          return true;
      }
      else{
          MakeRedBorder(emailDOM);
          SendErrorMessage(errorDOM, "Email is not valid");
          ChangeVisibility(errorDOM, "visible");
          return false;
      }

}

function ValidatePasswords(pass1DOM,pass2DOM){
    let pass1 = pass1DOM.value;
    let pass2 = pass2DOM.value;
    let Error1DOM = document.querySelector("#password-error");
    let Error2DOM = document.querySelector("#password2-error");
    let pass1Check = false;
    let pass2Check = false;

    if(pass1.length >= 6){
        MakeGreenBorder(pass1DOM);
        ChangeVisibility(Error1DOM, "hidden");
        pass1Check = true;
    }
    else{
        MakeRedBorder(pass1DOM);
        SendErrorMessage(Error1DOM, "Password must be at least 6 characters");
        ChangeVisibility(Error1DOM, "visible");
        pass1Check = false;
    }


    if(pass2.length>0){
        if(pass1 === pass2){
            MakeGreenBorder(pass2DOM);
            ChangeVisibility(Error2DOM, "hidden");
            pass2Check = true;
        }
        else{
            MakeRedBorder(pass2DOM);
            SendErrorMessage(Error2DOM, "Passwords do not match");
            ChangeVisibility(Error2DOM, "visible");
            pass2Check = false;
        }
    }
    else{
        MakeRedBorder(pass2DOM);
        SendErrorMessage(Error2DOM, "Password2 is required");
        ChangeVisibility(Error2DOM, "visible");
        pass2Check = false;
    }

    //return
    if(pass1Check && pass2Check) return true;
    else return false;
}

function MakeRedBorder(DOM){
    DOM.style.border = "2px solid #fc2d2d";
}
function MakeGreenBorder(DOM){
    DOM.style.border = "2px solid #6aeb81";
}
function ResetBorder(DOM){
    DOM.style.border = "2px solid #f0f0f0";
}
function SendErrorMessage(DOM, message){
    DOM.innerHTML = message;
}
function ChangeVisibility(DOM, state){
    DOM.style.visibility = state;
}
function CleanTextFields(usernameDOM, emailDOM, pass1DOM, pass2DOM){
    usernameDOM.value = "";
    emailDOM.value = "";
    pass1DOM.value = "";
    pass2DOM.value = "";
}