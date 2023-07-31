const express=require("express");
const app= express();
const axios = require('axios');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '192.168.0.6',
    user: 'root',
    password: '1234',
    database: 'CAP2',
});
  
connection.connect(function(err){  
    if(!err) {  
        console.log("Database is connected ... \n\n");    
    } 
    else {  
        console.log("Error connecting database ... \n\n");    
    }  
});
  
app.get('/',function(request,response){
    response.sendFile(__dirname + '/baby.html')
});

app.get('/baby.html',function(request,response){
    response.sendFile(__dirname + '/baby.html')
});

app.get('/camera.html',function(request,response){
    response.sendFile(__dirname + '/camera.html')
});

app.get('/state.html', function(request, response){
    response.sendFile(__dirname + '/state.html');
}); 

app.get('/iot.html', function(request, response){
    response.sendFile(__dirname+ '/iot.html');
});

app.get('/memberList', (request, response)=>{

    connection.query('SELECT * from han', function(err, rows, fields) {   
        if (!err){
            response.send(rows);
        }  
        else  {
            console.log('Error while performing Query.');
            response.status(500).send('서버 에러');
        }
    });  
})

//가습기
app.get('/relay/:status', async (request, response) => {
    const status = request.params.status;
    const relayUrl = 'http://192.168.0.26/relay';
    
    try {
      await axios.get(`${relayUrl}?status=${status}`);
      response.send(`Relay 상태가 ${status === 'on' ? '켜졌습니다' : '꺼졌습니다'}`);
      console.log(status)
    } catch (error) {
      console.error(error);
      response.status(500).send('서버 에러');
    }
});
//제습기
app.get('/relay1/:status', async (request, response) => {
    const status = request.params.status;
    const relayUrl = 'http://192.168.0.27/relay1';
    
    try {
      await axios.get(`${relayUrl}?status=${status}`);
      response.send(`Relay1 상태가 ${status === 'on' ? '켜졌습니다' : '꺼졌습니다'}`);
      console.log(status)
    } catch (error) {
      console.error(error);
      response.status(500).send('서버 에러');
    }
});


app.use(express.static(__dirname+'/public'));

app.listen(8080, function(){
    console.log('listening on 8080')
});