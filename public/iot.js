const toggleCheckbox = document.getElementById("toggle");
const toggleCheckbox1 = document.getElementById("toggle1");
const auto=document.getElementById("use");

var chswtich=toggleCheckbox.checked;
var chswtich1=toggleCheckbox1.checked;

//가습기 체크 기억
if(localStorage.getItem("state") =="on")
{
  toggleCheckbox.checked = true;
}
//제습기 체크 기억
if(localStorage.getItem("state1") =="on")
{
  toggleCheckbox1.checked = true;
}
//자동화 체크 기억
if(localStorage.getItem("check") == "true")
{
  auto.checked=true;
}
//input 데이터 기억
if(auto)
{
  document.getElementById("humidMinValue").value = JSON.parse(localStorage.getItem("HumMin"));
  document.getElementById("humidMaxValue").value = JSON.parse(localStorage.getItem("HumMax"));
}

//가습기
async function toggleRelay() {
  try{
    var chswtich=toggleCheckbox.checked;
    if(typeof(Storage) !== "undefined")
    {
      if(chswtich == true)
      {
       localStorage.setItem("state","on");
      }
    
      if(chswtich == false)
      {
        localStorage.setItem("state","off");
      }
    }
    let newStatus = localStorage.getItem("state");
    let response = await fetch(`/relay/${newStatus}`);
    const data = await response.text();
    console.log(data);
  } 
  catch (error) {
    console.error(error);
  }
}

//제습기
async function toggleRelay1() {
  try{
    var chswtich1=toggleCheckbox1.checked;
    if(typeof(Storage) !== "undefined")
    {
      if(chswtich1 == true)
      {
       localStorage.setItem("state1","on");
      }
    
      if(chswtich1 == false)
      {
        localStorage.setItem("state1","off");
      }
    }
    let newStatus1 = localStorage.getItem("state1");
    let response1 = await fetch(`/relay1/${newStatus1}`);
    const data = await response1.text();
    console.log(data);
  } 
  catch(error) {
    console.error(error);
  }
}

function connection(){
  fetch("/memberList")
    .then((response) => response.json()).then((data) => {
      if(data[data.length-1].Cry==1)
      {
        myAudio.play();
      }
      if(data[data.length-1].Cry==0)
      {
        myAudio.pause();
      }

      const HumidMin = parseInt(document.getElementById("humidMinValue").value);
      const HumidMax = parseInt(document.getElementById("humidMaxValue").value);
      
      const autocheck=auto.checked;
      if(typeof(Storage) !== "undefined")
      {

       if (autocheck)
       {
        localStorage.setItem("check","true");
        localStorage.setItem("HumMax",JSON.stringify(HumidMax));
        localStorage.setItem("HumMin",JSON.stringify(HumidMin));
       }
       else
       {
        localStorage.setItem("check","false");
        localStorage.removeItem("HumMax");
        localStorage.removeItem("HumMin");
       }
      }
   
      var newStatus;
      if(autocheck)
      { //가습기
        if((HumidMin+HumidMax)/2 <= data[data.length-1].Humid)
        {
          try{
            localStorage.setItem("state","off");
            fetch(`/relay/off`);
          } catch(error) {
            console.error(error);
          }
          toggleCheckbox.checked = false;
        }
      
        if(HumidMin>=data[data.length-1].Humid)
        {
          try{
            localStorage.setItem("state","on");
            fetch(`/relay/on`);
          }catch (error) {
            console.error(error);
          }
          toggleCheckbox.checked = true;
        }
        //제습기
        if((HumidMin+HumidMax)/2 >= data[data.length-1].Humid)
        {
          try{
            localStorage.setItem("state1","off");
            fetch(`/relay1/off`);
          }catch (error) {
            console.error(error);
          }
          toggleCheckbox1.checked = false;
        }
      
        if(HumidMax<=data[data.length-1].Humid)
        {
          try{
            localStorage.setItem("state1","on");
            fetch(`/relay1/on`);
          }catch (error) {
            console.error(error);
          }
          toggleCheckbox1.checked = true;
        }
      }
    }).catch((error) => {
      console.error("Error fetching data:", error);
  });
}
setInterval(connection, 2000);