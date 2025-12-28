import ReactEchartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts';
import {useEffect, useRef, useState} from "react";
import {HOST_URL} from "../define";

function CPUUsage() {

    const [xAxis, setXAxis] = useState([]);

    const [cpu, setCpu] = useState([]);

    const [count, setCount] = useState(0);

    const timerId = useRef(null);

    const getInfo = () => {

        fetch(HOST_URL + '/api/profile/cpu', {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res)=> res.json())
            .then((data)=> {

                let _xAxis = [ ...xAxis ];
                let _cpu = [ ...cpu ];
                if (count + 1 > 30) {
                    _xAxis.shift()
                    _cpu.shift()
                }

                setCount(count + 1)

                let now = new Date();
                let axisData = now.toLocaleTimeString().replace(/^\D*/, '');

                _xAxis.push(axisData);
                _cpu.push(data.cpu.load);

                setXAxis(_xAxis)
                setCpu(_cpu)

            })
            .catch(e => {
                //console.log(e)
            });

    }

    useEffect(() => {
        timerId.current = setInterval(() => {
            getInfo()
        }, 1000)
        return () => {
            clearInterval(timerId.current)
        }
    })

    return (
        <>
            <ReactEchartsCore
                echarts={echarts}
                option={{
                    title: {
                        text: 'CPU Usage'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '2%',
                        right: '4%',
                        bottom: '2%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: xAxis
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            max: 100,
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(128, 128, 128, 0.3)'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'CPU Usage',
                            type: 'line',
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#FEC8B1'
                                    },
                                    {
                                        offset: 1,
                                        color: '#FFF4F0'
                                    }])
                            },
                            color: '#FD9669',
                            smooth: true,
                            data: cpu
                        },
                    ]
                }}
                style={{ width: "400px",
                    maxWidth: '400px',
                    maxHeight: "250px",
                    height: "250px",
                    textAlign: "center",
                    margin: '0px',
                    padding: '5px',
                    border: "1px solid #E2E2E2",
                    borderRadius: '8px',
                    boxShadow: '8px 8px 5px -2px #FFF9F5',
                    backgroundColor: '#D0EDE6',
                }}
            />

        </>
    )
}

export default CPUUsage;