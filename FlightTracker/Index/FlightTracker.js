async function supabase_func() {
  const project_url = "https://hykprzibnddinifojcdf.supabase.co";
  const publishable_key = "sb_publishable_hHNM_rzYlsceHEgMTI-Dcg_-TydXGaE";
  const supabae = window.supabase.createClient(project_url, publishable_key);
  const user_result = await supabae.auth.getUser();
 if (!user_result.data.user) {
   window.location.href = "/SignUp/login.html";
 }
}
supabase_func()
let map;
let ar = [];
let counter1 = 0;
let marker = [];
let bounds;
let planeimg;
let sp;
let value;
let info;
let info_remove;
let input = document.getElementById("input");
let submit = document.getElementById("submit");
let id = 1;
let result;
let markerbyIATA = new Map();
let array_result = [];
let north_east
let south_west
let loading=false
document.querySelectorAll("input").forEach((item) => {
  item.addEventListener("input", function () {
    item.value = item.value.toUpperCase().replaceAll(" ", "");
  });
});
info = function (item) {
  div.innerHTML = "";
  iata = document.createElement("p");
  iata.innerText = `Flight Iata=${item.iata}`;
  div.append(iata);
  //destination
  des = document.createElement("p");
  des.innerText = `Destination: ${item.dep}--->${item.arr}`;
  div.append(des);
  //status
  stat = document.createElement("p");
  div.append(stat);
  //Flag
  flag = document.createElement("p");
  flag.innerText = `Flag: ${item.flag}`;
  div.style.zIndex = "2";
  div.style.position = "absolute";
  div.style.bottom = "160px";
  div.style.gap = "20px";
  div.append(flag);
  document.body.appendChild(div);
};
let reset=document.getElementById("reset")
reset.addEventListener("click",function(){
  array_removal()
})
function array_removal() {
  if (array_result.length !== 0) {
    array_result.forEach((item) => {
      if(item.planeimg!==sp){
        item.planeimg.src = "/Index/icon-removebg-preview.png";
      }
    });
    array_result = [];
  }
}
submit.addEventListener("click", function () {
  div.remove()
  if(sp!==undefined){
    sp.src = "/Index/icon-removebg-preview.png";
      sp = undefined;
  }
  counter1=0
  array_removal();
  value = input.value;
  input.value = "";
  array_result = marker.filter(({ item }) => {
    if (id === 1) {
      return value === item.dep;
    }
    if (id === 2) {
      return value === item.arr;
    }
  });
  if(id===1||id===2){
  if (array_result.length === 0) {
    alert("No such result found.");
  }
  array_result.forEach((item) => {
    item.planeimg.src = "selected_plane.jpg";
  });
}
  if (id === 3) {
    result = markerbyIATA.get(value);
    if (result === undefined) {
      alert("No such IATA found.");
    }
    if (result !== undefined) {
      result.planeimg.src =
        "https://cdn.vectorstock.com/i/1000v/09/41/plane-icon-flight-transport-sign-vector-10490941.jpg";
      sp = result.planeimg;
      info(result.item);
      counter1=1
    }
  }
});

info_remove = function () {
  iata.style.display = "none";
  des.style.display = "none";
  stat.style.display = "none";
  flag.style.display = "none";
  div.remove();
};
function placeholder(inp, identity) {
  let select = document.getElementById("select");
  select.addEventListener("change", function () {
    selectvalue = select.value;
    if (selectvalue === inp) {
      input.placeholder = `(Airport code, e.g. CCU)`;
      id = identity;
    }
    if (selectvalue === "IATA") {
      input.placeholder = `Airplane IATA e.g. SG133`;
      id = 3;
    }
  });
}
placeholder("destination", 1);
placeholder("arrival", 2);
div = document.createElement("div");
div.style.zIndex = "2";
div.style.position = "absolute";
div.style.bottom = "100px";
div.style.height = "auto";
div.style.width = "auto";
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 22.5726,
      lng: 88.3639,
    },
    zoom: 6,
    mapId: "AIzaSyCsrphKdfawg3qnMg5eTllVA_UvkEI744w",
  });
     google.maps.event.addListener(map, "idle", function () {
          bounds = map.getBounds();
          north_east = bounds.getNorthEast();
          south_west = bounds.getSouthWest();
});
}
initMap();
  window.addEventListener("resize", function () {
    google.maps.event.trigger(map, "resize");
  });
let load=document.getElementById("load")
load.addEventListener("click",function(){
  Flight_Data()
})
let Flight_Data = async function () {
  if(loading===true){
    return
  }
  loading=true
  if(div){
    div.remove()
  }
    markerbyIATA = new Map();
  marker.forEach((item) => {
    item.mark.map = null;
  });
  ar=[]
  marker=[]
  try {
    const api = await fetch(
      `https://airlabs.co/api/v9/flights?api_key=a9725fdc-d02a-4f63-af61-88d029389fe1&bbox=${south_west.lat()},${south_west.lng()},${north_east.lat()},${north_east.lng()}`,
    );
    const api2 = await fetch("/Index/majormodels.json");
    if (!api.ok) {
      throw new Error("Error in fetching the API.");
    }
    const data = await api.json();
    const data2 = await api2.json();
    const majormodels = new Set(data2.major_models);
    for (let a = 0; a < data.response.length; a++) {
      if (majormodels.has(data.response[a].aircraft_icao)) {
        ar.push({
          lat: data.response[a].lat,
          long: data.response[a].lng,
          dir: data.response[a].dir,
          iata: data.response[a].flight_iata,
          dep: data.response[a].dep_iata,
          arr: data.response[a].arr_iata,
          status: data.response[a].status,
          flag: data.response[a].flag,
        });
      }
    }
    ar.forEach((item) => {
      let locaion = {
        lat: item.lat,
        lng: item.long,
      };
      if (typeof item.lat === "number" && typeof item.long === "number") {
          let planeimg = document.createElement("img");
          planeimg.src = "/Index/icon-removebg-preview.png";
          planeimg.style.width = "25px";
          planeimg.style.transform = `rotate(${item.dir}deg)`;
          planeimg.addEventListener("click", function () {
            counter1++;
            if (counter1 % 2 !== 0) {
              planeimg.src =
                "https://cdn.vectorstock.com/i/1000v/09/41/plane-icon-flight-transport-sign-vector-10490941.jpg";
              sp = planeimg;
              if (
                planeimg.src ===
                "https://cdn.vectorstock.com/i/1000v/09/41/plane-icon-flight-transport-sign-vector-10490941.jpg"
              ) {
                info(item);
              }
            }
            if (counter1 % 2 === 0) {
              if (sp !== undefined) {
                sp.src = "/Index/icon-removebg-preview.png";
                info_remove();
                sp=undefined
              }
            }
          });
          mark = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: {
              lat: item.lat,
              lng: item.long,
            },
            content: planeimg,
          });
          marker.push({ mark, planeimg, item });
          markerbyIATA.set(item.iata, { planeimg, item });
        }
      }
    )} catch (error) {
    console.log(error);
    if (error.message.includes("bounds")) {
      location.reload();
    }
    if(error.message.includes("length")){
      alert("Sorry API limit reached. Please try again later.")
    }
  }
  finally{
    loading=false
  }
};
/*setInterval(()=>{
  marker.forEach((item)=>{
    item.mark.map=null
  })
 ar=[]
 Flight_Data()
},30000)*/