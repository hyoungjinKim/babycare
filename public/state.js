const databody = document.getElementById('dataBody');
const state=document.getElementById('state');
const bar = document.querySelector('.progress');
const bar1 = document.querySelector('.progress1');
const bar2 = document.querySelector('.progress2');


fetch("/memberList")
  .then((response) => response.json())
  .then((data) => {
    if(data[data.length-1].Cry==1)
    {
      myAudio.play();
    }
    if(data[data.length-1].Cry==0)
    {
      myAudio.pause();
    }
      progress.innerHTML = `${data[data.length-1].ATempC}°C%`
      progress1.innerHTML = `${data[data.length-1].Humid}%`
      progress2.innerHTML = `${data[data.length-1].TempC}°C`
      bar.style.width = (data[data.length-1].ATempC)+'%';
      bar1.style.width = (data[data.length-1].Humid)+'%';
      bar2.style.width = (data[data.length-1].TempC)+'%';
      
  }).catch((error) => {
  console.error("Error fetching data:", error);
});

function autoRefresh_state_div()//div 2초마다 새로고침
{
  var currentLocation = window.location;
$("#state").fadeOut('slow').load(currentLocation + '#state').fadeIn("slow");
}
setInterval('autoRefresh_state_div()', 2000);


function autoRefresh_state_div(){
    fetch("http://203.232.193.208:8080/memberList", {
    method: "get",
  }).then((response) => response.json()).then((data) => {
      if(data[data.length-1].Cry==1)
      {
        myAudio.play();
      }
      if(data[data.length-1].Cry==0)
      {
        myAudio.pause();
      }
      progress.innerHTML = `${data[data.length-1].ATempC}°C`
      progress1.innerHTML = `${data[data.length-1].Humid}%`
      progress2.innerHTML = `${data[data.length-1].TempC}°C`
      bar.style.width = (data[data.length-1].ATempC)+'%';
      bar1.style.width = (data[data.length-1].Humid)+'%';
      bar2.style.width = (data[data.length-1].TempC)+'%';
  });
} 


