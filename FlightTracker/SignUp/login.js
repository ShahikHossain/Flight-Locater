const publishablekey = "sb_publishable_hHNM_rzYlsceHEgMTI-Dcg_-TydXGaE";
const projecturl ='https://hykprzibnddinifojcdf.supabase.co';
const supabae = window.supabase.createClient(projecturl, publishablekey);
let button=document.getElementById('submit')
button.addEventListener("click",async function () {
     let arr = document.querySelectorAll("input");
     value=1
  for (let a = 0; a < arr.length; a++) {
    if (arr[a].value !== '') {
      value+=1
    }
  }
  if ((value === arr.length + 1)) {
    //alert("Sended");
const email=document.getElementById('email').value
const password=document.getElementById('password').value
const date = document.getElementById("date").value;
const name = document.getElementById("name").value;
const { data, error } = await supabae.auth.signUp({
  email: email,
  password: password,
  options: {
    data: {
      name: name,
      dob: date,
    },
    emailRedirectTo: "https://flightlocater.netlify.app/index/index.html",
  },
});
if(error){
  alert(error)
  console.log(error)
}
else{
  console.log(data);
  alert("Please confirm your email form. A link has been sent to your G-mail address(Check spam).")
}
  } 
  if(value !== arr.length + 1) {
    alert("All the fields are required to be filled.");
  }
});