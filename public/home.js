function connection(){
    fetch("/memberList", {
      method: "get", 
    })
      .then((response) => response.json()).then((data) => {
        if(data[data.length-1].Cry===1)
        {
          myAudio.play();
        }
        if(data[data.length-1].Cry===0)
        {
          myAudio.pause();
        }
      }).catch((error) => {
        console.error("Error fetching data:", error);
    });
}

setInterval(connection, 2000);