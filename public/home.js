const myAudio=document.getElementById('myAudio');
const alrm=document.getElementById('alrm');

fetch("/memberList", {
  method: "get", 
})
  .then((response) => response.json()).then((data) => {
    setTimeout(()=>{
      if(data[data.length-1].Cry == 1)
      {
        alrm.classList.remove("hidden")
        myAudio.play();
      }
    },50);
    if(data[data.length-1].Cry == 0)
    {
      myAudio.pause();
      alrm.classList.add("hidden")
    }
    if(data[data.length-1].TempC_MAX>=38)
    {
      setTimeout(()=>{
        if(data[data.length-1].Cry == 1)
        {
          alrm.classList.remove("hidden")
          myAudio.play();
        }
      },50);
    }
    if(data[data.length-1].TempC_MAX<38)
    {
      myAudio.pause();
    }
  }).catch((error) => {
    console.error("Error fetching data:", error);
});

function connection(){
    fetch("/memberList", {
      method: "get", 
    })
      .then((response) => response.json()).then((data) => {
        setTimeout(()=>{
          if(data[data.length-1].Cry == 1)
          {
            alrm.classList.remove("hidden")
            myAudio.play();
          }
        },50);
        if(data[data.length-1].Cry == 0)
        {
          myAudio.pause();
          alrm.classList.add("hidden")
        }
        if(data[data.length-1].TempC_MAX>=38)
        {
          setTimeout(()=>{
            if(data[data.length-1].Cry == 1)
            {
              alrm.classList.remove("hidden")
              myAudio.play();
            }
          },50);
        }
        if(data[data.length-1].TempC_MAX<38)
        {
          myAudio.pause();
        }
      }).catch((error) => {
        console.error("Error fetching data:", error);
    });
};

setInterval(connection, 2000);
