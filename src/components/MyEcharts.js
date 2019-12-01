import React from 'react';
import Axios from 'axios'
import ReactEcharts from 'echarts-for-react'
import {connect} from "react-redux";
import {updateList} from "../action/action";


class MyEcharts extends React.Component {


    constructor() {
        super();
        this.echart=React.createRef();

    }

    componentDidMount() {
    }

    getBarChartOption(dataIndex) {
        let dataList = this.props.list.map(item => item[dataIndex]);
        let xAxis = Array.from(new Set(dataList)).sort((a,b)=>a-b);
        let map = {};
        dataList.forEach(item => {
            if (!map[item]) map[item] = 1;
            else map[item]++;
        });
        let yAxis = xAxis.map(item => map[item]);
        let config = {
            title:{
              text:dataIndex
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter:(param)=>{
                    return `${dataIndex} ${param[0].dataIndex}:${param[0].data}`
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxis,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: dataIndex,
                    type: 'bar',
                    barWidth: '60%',
                    data: yAxis
                }
            ]
        }
        return config;
    }

    getPieChartOption(dataIndex) {
        let dataList = this.props.list.map(item => item[dataIndex]);
        let legends = Array.from(new Set(dataList));
        legends = legends.sort((a, b) => a - b);
        let dataByLegends = legends.map(distincValue => {
            return {
                name: distincValue,
                value: dataList.filter(item => item === distincValue).reduce((a, b) => a + 1, 0)
            }
        })
        console.log(dataByLegends);

        let option = {
            title: {text: dataIndex},
            tooltip: {
                trigger: 'item',
                formatter: `${dataIndex} {b}: {c} ({d}%)`
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                top:"30",
                data: legends,
            },
            series: [
                {
                    name: '1',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    center:["75%",'50%'],
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            },
                            formatter:(item)=>`${dataIndex}\n${item.data.name} `
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: dataByLegends
                }
            ]
        };
        return option;
    }

    getLineChartOptionForDate(dataIndex) {

        let dataList = this.props.list.map(item => item[dataIndex]);
        let xAxis = Array.from(new Set(dataList));
        let map = {};
        xAxis = xAxis.sort((a, b) => a.localeCompare(b));

        dataList.forEach(item => {
            if (!map[item]) map[item] = 1;
            else map[item]++;
        });

        let existData = xAxis.map(item => {
            let now = new Date(item);
            return {
                name: now.toString(),
                value: [
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                    map[item]
                ]
            }
        });
        if (existData.length === 0) return {};
        let allData = [];
        let curDate = new Date(existData[0].name);
        let nextExistDataIndex = 0;
        while (nextExistDataIndex < existData.length) {
            if (existData[nextExistDataIndex].name.localeCompare(curDate.toString()) === 0) {
                allData.push(existData[nextExistDataIndex++]);
            } else {
                allData.push({
                    name: curDate.toString(),
                    value: [
                        [curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()].join('/'), 0
                    ]
                })
            }
            curDate.setDate(curDate.getDate() + 1);
        }
        let inputData = [];
        for (let i = 0; i < allData.length; i += 30) {
            let sum = 0;
            let curDate = new Date(allData[i].name);
            for (let j = i; j < Math.min(i + 30,allData.length); j++) {
                sum += allData[j].value[1];
            }
            inputData.push({
                name: curDate.toString(),
                value: [
                    [curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()].join('/'),
                    sum
                ]
            })
        }


        let option = {
            title: {text: dataIndex},
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    var date = new Date(params.name);
                    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' : ' + params.value[1];
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }

            },
            yAxis: {
                type: 'value',
                boundaryGap: ["0%", "80%"],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: 'dailyFrequent',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: inputData,
                areaStyle: {},
                smooth: true
            }]
        };
        return option;

    }
    getLineChartOption=(dataIndex)=>{
        let dataList = this.props.list.map(item => item[dataIndex]);
        if(dataIndex==="Time Occurred"){
            dataList=dataList.map(item=>{
                let s="000"+item;
                return s.substr(s.length-4).substr(0,2);
            })
        }
        let xAxis = Array.from(new Set(dataList)).sort((a,b)=>a-b);
        let map = {};
        dataList.forEach(item => {
            if (!map[item]) map[item] = 1;
            else map[item]++;
        });
        let yAxis = xAxis.map(item => map[item]);
        let option = {
            title: {text: dataIndex},
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    console.log(params);
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'category',
                splitLine: {
                    show: false
                },
                data:xAxis

            },
            yAxis: {
                type: 'value',
                boundaryGap: ["0%", "80%"],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: 'dailyFrequent',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: yAxis,
                areaStyle: {},
                smooth: true
            }]
        };
        return option;
    }
    getChartOption(dataIndex, chartType) {
        switch (chartType) {
            case("barChart") : {
                return this.getBarChartOption(dataIndex);
            }
            case("pieChart"): {
                return this.getPieChartOption(dataIndex);
            }
            case("lineChart"): {
                return this.getLineChartOption((dataIndex));
            }
            case("lineChartForDate"): {
                return this.getLineChartOptionForDate((dataIndex));
            }
        }
    }

    getEchart=(dataIndex,chartType)=> {
        if(this.echart.current){
            this.echart.current.getEchartsInstance().setOption({},true);
        }
        return (
            <ReactEcharts
                option={this.getChartOption(dataIndex, chartType)}
                style={{height: '50%', width: '100%', borderRadius: "10px"}}
                theme={"dark"}
                ref={this.echart}
            />
        )
    }

    render() {
        return (
                this.getEchart(this.props.dataIndex,this.props.chartType)
        )
            ;
    }
}

function

mapStateToProps(state) {
    return {
        list: state.list
    }
}

export default connect(mapStateToProps)
(
    MyEcharts
)
;