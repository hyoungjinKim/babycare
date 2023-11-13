const express=require("express");
const app= express();
const axios = require('axios');
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '192.168.43.206',//192.168.0.6
    user: 'root',
    password: '1234',
    database: 'CAP2',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.on('connection', (connection) => {
    console.log('Database connected');
});

pool.on('error', (err) => {
    console.error('Database error:', err);
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

app.get('/memberList', (request, response) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('Error connecting to database:', err);
            response.status(500).send('서버 에러');
            return;
        }

        connection.query('SELECT * from han', function (err, rows, fields) {
            connection.release(); // 연결 반환
            if (!err) {
                response.send(rows);
            } else {
                console.log('Error while performing Query.');
                response.status(500).send('서버 에러');
            }
        });
    });
});

//가습기
app.get('/relay/:status', async (request, response) => {
    const status = request.params.status;
    const relayUrl = 'http://192.168.43.5:80/relay';
    
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
    const relayUrl1 = 'http://192.168.43.189:83/relay1';
    
    try {
      await axios.get(`${relayUrl1}?status=${status}`);
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