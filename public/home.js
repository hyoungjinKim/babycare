function connection(){
    fetch("/memberList", {
      method: "get", 
    })
      .then((response) => response.json()).then((data) => {
        if(data[data.length-1].Cry===1)
        {
          myAudio.play();
          alert("아기 상태를 확인해주세요");
        }
        if(data[data.length-1].Cry===0)
        {
          myAudio.pause();
        }
        if(data[data.length-1].TempC_MAX>=38)
        {
          myAudio.play();
          alert("아기 상태를 확인해주세요");
        }
        if(data[data.length-1].TempC_MAX<38)
        {
          myAudio.pause();
        }
      }).catch((error) => {
        console.error("Error fetching data:", error);
    });
}

setInterval(connection, 2000);