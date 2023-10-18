const submitButton = document.getElementById("submitButton");
let url;
submitButton.addEventListener('click', ()=>{
    url = document.getElementById("inputBox").value;
    validateUrl(url);
});

function validateUrl(url){
    console.log(url);
    let regex = /^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\-\.\~\=\?\/]*)$/;
    let regexNoHttps =/^([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\-\.\~\=\?\/]*)$/;;
    if(regex.test(url)){
        return true;
    }else if(regexNoHttps.test(url)){
        return true;
    }
    return false;
}

async function checkExistence(url){
    console.log(url);
    let checkThis = url;
    let validity = false;
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const actualUrl = `https://isitup.org/${checkThis}.json`
    const check = await fetch(proxyUrl+actualUrl)
    .then(function(response){
        if(response.status_code===1){
            validity = true;
            console.log("YOOO");
        } 
        return validity;
    });
    
}