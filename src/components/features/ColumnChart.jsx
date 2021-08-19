import React from 'react';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

function ColumnChart(props) {
    const data = props.data;
    console.log(data);
    var over = new Array(12).fill(0), all = new Array(12).fill(0), after = new Array(12).fill(0), ontime = new Array(12).fill(0);
    data.forEach((ele)=>{
        if(ele.Status === "Overdue"){
            over[ele.Month-1] = ele.Total;
        }else if(ele.Status === "All due"){
            all[ele.Month-1] = ele.Total;
        }else if(ele.Status === "Completed on time"){
            ontime[ele.Month-1] = ele.Total;
        }else{
            after[ele.Month-1] = ele.Total;
        }
    })

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'Monthly performance'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'No. of Tasks'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Completed on Time',
            data: ontime,
            color: 'green'
    
        }, {
            name: 'Completed after deadline',
            data: after,
            color: "orange"
    
        }, {
            name: 'Overdue',
            data: over,
            color: 'red'    
        }, {
            name: 'All due',
            data: all,
            color: "lightgrey"
    
        }]
    
      };
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}

export default ColumnChart;