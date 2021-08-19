import React from 'react';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

function PieChart(props) {
    var data1 = [];
    const piedata = props.data;
    if(!(piedata.length === 0)){
        piedata.forEach((ele) => {
          if(ele.Status === 'OVERDUE'){
            data1.push({name : "Overdue" , y : ele.Total, color: "red"});
          }else if(ele.Status === 'ASSIGNED'){
            data1.push({name : "No Activity" , y : ele.Total, color: "lightgrey"});        
          }else if(ele.Status === "IN PROGRESS"){
            data1.push({name : "In progress" , y : ele.Total, color:"blue"});
          }else if(ele.Status === "COMPLETED AFTER DEADLINE"){
            data1.push({name : "Completed after deadline" , y : ele.Total, color: "orange"});
          }else{
            data1.push({name : "Completed on time" , y : ele.Total, color: "green"});
          }
        })
      }
    const options = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          height:"170px"
      },
      title: {
          text: '',
          floating : true,
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.y:1f}</b>',
          outside: true
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false,
                  format: '<b>{point.name}</b>: {point.percentage:1f} '
              },
              showInLegend: true
          }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        alignColumns: true,
        verticalAlign: 'top',
        backgroundColor: '#FFFFFF',
        width : "50%",      
    },
      series: [{
          name: 'Tasks',
          colorByPoint: true,
          data: data1
        //   data: [{
        //       name: 'Chrome',
        //       y: 61.41,
        //   }, {
        //       name: 'Internet Explorer',
        //       y: 11.84
        //   }, {
        //       name: 'Firefox',
        //       y: 10.85
        //   }, {
        //       name: 'Edge',
        //       y: 4.67
        //   }, {
        //       name: 'Safari',
        //       y: 4.18
        //   }, {
        //       name: 'Sogou Explorer',
        //       y: 1.64
        //   }, {
        //       name: 'Opera',
        //       y: 1.6
        //   }, {
        //       name: 'QQ',
        //       y: 1.2
        //   }, {
        //       name: 'Other',
        //       y: 2.61
        //   }]
      }]
    
      };
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}

export default PieChart;