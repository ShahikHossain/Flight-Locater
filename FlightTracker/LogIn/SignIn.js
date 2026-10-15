const publishable_key = "sb_publishable_hHNM_rzYlsceHEgMTI-Dcg_-TydXGaE";
const project_url = "https://hykprzibnddinifojcdf.supabase.co";
const supabae = window.supabase.createClient(project_url,publishable_key);
let button=document.getElementById("submit")
button.addEventListener("click",async function(){
    const email=document.getElementById("email").value
    const password = document.getElementById("password").value
    const{data,error}=await supabae.auth.signInWithPassword({
        email:email,
        password:password
    })
    if(error){
        alert("Login failed.")
    }
    else{
        window.location.href = "http://127.0.0.1:5500/Index/index.html";
    }
})