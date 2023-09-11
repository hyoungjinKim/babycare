const databody = document.getElementById('dataBody');
const state = document.getElementById('state');
var ctx = document.getElementById('myChart');

let config = {
  type: 'line',
  data: {
    labels: [ // Date Objects
      '20분전',
      '15분전',
      '10분전',
      '5분전',
      '현재'
    ],
    datasets: [{
      label: '습도',
      backgroundColor: 'rgba(000, 153, 255, 1)',
      borderColor: 'rgba(000, 153, 255, 1)',
      fill: false,
      data: [],
    }, {
      label: '온도',
      backgroundColor: 'rgba(153, 255, 102, 1)',
      borderColor: 'rgba(153, 255, 102, 1)',
      fill: false,
      data: [],
    },{
      label: '체온',
      backgroundColor: 'rgba(255, 051, 051, 1)',
      borderColor: 'rgba(255, 051, 051, 1)',
      fill: false,
      data: [],
    }]
  },
  options: {
    maintainAspectRatio: false,
    title: {
      text: 'Chart.js Time Scale'
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '차트'
        }
      }]
    },
  }
};

let myChart = new Chart(ctx, config);
fetch("/memberList", {
    method: "get",
  }).then((response) => response.json()).then((data) => {
    
    // 가져온 데이터를 차트에 적용
    config.data.datasets[0].data.push(data[data.length - 601].Humid);
    config.data.datasets[0].data.push(data[data.length - 451].Humid);
    config.data.datasets[0].data.push(data[data.length - 301].Humid);
    config.data.datasets[0].data.push(data[data.length - 151].Humid);
    config.data.datasets[0].data.push(data[data.length - 1].Humid);

    config.data.datasets[1].data.push(data[data.length - 601].ATempC);
    config.data.datasets[1].data.push(data[data.length - 451].ATempC);
    config.data.datasets[1].data.push(data[data.length - 301].ATempC);
    config.data.datasets[1].data.push(data[data.length - 151].ATempC);
    config.data.datasets[1].data.push(data[data.length - 1].ATempC);

    config.data.datasets[2].data.push(data[data.length - 601].TempC_MAX);
    config.data.datasets[2].data.push(data[data.length - 451].TempC_MAX);
    config.data.datasets[2].data.push(data[data.length - 301].TempC_MAX);
    config.data.datasets[2].data.push(data[data.length - 151].TempC_MAX);
    config.data.datasets[2].data.push(data[data.length - 1].TempC_MAX);

    // 차트 업데이트
    myChart.update();
});


function con() {
  fetch("http://203.232.193.208:8080/memberList", {
    method: "get",
  }).then((response) => response.json()).then((data) => {
   
    // 가져온 데이터를 차트에 적용
    config.data.datasets[0].data.push(data[data.length - 601].Humid);
    config.data.datasets[0].data.push(data[data.length - 451].Humid);
    config.data.datasets[0].data.push(data[data.length - 301].Humid);
    config.data.datasets[0].data.push(data[data.length - 151].Humid);
    config.data.datasets[0].data.push(data[data.length - 1].Humid);

    config.data.datasets[1].data.push(data[data.length - 601].ATempC);
    config.data.datasets[1].data.push(data[data.length - 451].ATempC);
    config.data.datasets[1].data.push(data[data.length - 301].ATempC);
    config.data.datasets[1].data.push(data[data.length - 151].ATempC);
    config.data.datasets[1].data.push(data[data.length - 1].ATempC);

    config.data.datasets[2].data.push(data[data.length - 601].TempC_MAX);
    config.data.datasets[2].data.push(data[data.length - 451].TempC_MAX);
    config.data.datasets[2].data.push(data[data.length - 301].TempC_MAX);
    config.data.datasets[2].data.push(data[data.length - 151].TempC_MAX);
    config.data.datasets[2].data.push(data[data.length - 1].TempC_MAX);

    // 차트 업데이트
    myChart.update();
  });
} 

// 데이터 업데이트를 주기적으로 수행
setInterval(con, 2000);
