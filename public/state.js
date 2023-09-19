const databody = document.getElementById('dataBody');
const state = document.getElementById('state');
const ctx = document.getElementById('myChart');

const humid=document.getElementById('humid');
const Temp_Max=document.getElementById('Temp_MAX');
const Temp_Amb=document.getElementById('TEMP_Amb');

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


function con() {
  fetch("/memberList", {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      humid.innerHTML = `${data[data.length - 1].Humid} %`;
      Temp_Max.innerHTML = `${data[data.length - 1].TempC_MAX}°C`;
      Temp_Amb.innerHTML = `${data[data.length - 1].ATempC}°C`;

      // 가져온 데이터를 차트에 적용
      config.data.datasets[0].data[0]=data[data.length-601].Humid;
      config.data.datasets[0].data[1]=data[data.length - 451].Humid;
      config.data.datasets[0].data[2]=data[data.length - 301].Humid;
      config.data.datasets[0].data[3]=data[data.length - 151].Humid;
      config.data.datasets[0].data[4]=data[data.length - 1].Humid;

      config.data.datasets[1].data[0]=data[data.length-601].ATempC;
      config.data.datasets[1].data[1]=data[data.length - 451].ATempC;
      config.data.datasets[1].data[2]=data[data.length - 301].ATempC;
      config.data.datasets[1].data[3]=data[data.length - 151].ATempC;
      config.data.datasets[1].data[4]=data[data.length - 1].ATempC;

      config.data.datasets[2].data[0]=data[data.length-601].TempC_MAX;
      config.data.datasets[2].data[1]=data[data.length - 451].TempC_MAX;
      config.data.datasets[2].data[2]=data[data.length - 301].TempC_MAX;
      config.data.datasets[2].data[3]=data[data.length - 151].TempC_MAX;
      config.data.datasets[2].data[4]=data[data.length - 1].TempC_MAX;

      // 차트 업데이트
      myChart.update();
    });
}

// 초기 데이터 가져오기와 주기적인 데이터 업데이트 시작
con();

const myChart = new Chart(ctx, config);

// 주기적인 데이터 업데이트를 주기적으로 수행
setInterval(con, 2000);

