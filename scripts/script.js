const submitButton = document.getElementById("submitButton");
let publicUrl;
submitButton.addEventListener('click', ()=>{
    let url = document.getElementById("inputBox").value;
    if(validateUrl(url)){
        generateCode(publicUrl);
    }
});
function download(){

    let url = document.getElementById("qrcode").src;
    fetch(url)
        .then(response => response.blob())
        .then(blob =>{
        let objectURL = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = objectURL;
        a.download = 'qrcode.jpg';
        a.dispatchEvent(new MouseEvent('click'));
        URL.revokeObjectURL(objectUrl);
    })
    .catch(console.error);
   
}
function share(){

}
function validateUrl(url){
    url = url.toLowerCase();
    let regex = /^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\-\.\~\=\?\/]*)$/;
    let regexNoHttps =/^([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\-\.\~\=\?\/]*)$/;;
    if(regex.test(url)){
        publicUrl = url;
        return true;
    }else if(regexNoHttps.test(url)){
        publicUrl = "https://" + url;
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
function generateCode(url){
    const generator = new Promise((resolve, reject)=>{
        let output;
        document.getElementById("centerContent").style.display = "none";
        document.getElementById("qrcodeStuffWrapper").style.display = 'flex';
        document.getElementById("largeCircle").style.display = 'inline';
        document.getElementById("buttonWrapper").style.display = 'flex';
        document.getElementById("topNav").style.display = "flex";
        document.getElementById("qrcode").src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`;
    });
    generator.then(
        addListeners(url),
    );
    
}    
let addListeners = (url)=>{
    publicUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`;
    document.getElementById("download").addEventListener('click', download);
    document.getElementById("share").addEventListener('click', share);
    document.getElementById("logoTwo").addEventListener('click',()=> window.location.reload());
}