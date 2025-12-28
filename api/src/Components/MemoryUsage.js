import ReactEchartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts';
import {useEffect, useRef, useState} from "react";
import {HOST_URL} from "../define";

function MemoryUsage() {

    const [xAxis, setXAxis] = useState([]);

    const [useMemory, setUseMemory] = useState([]);
    const [totalMemory, setTotalMemory] = useState([]);
    const [freeMemory, setFreeMemory] = useState([]);

    const [count, setCount] = useState(0);

    const timerId = useRef(null);

    const getInfo = () => {

        fetch(HOST_URL + '/api/profile/memory', {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res)=> res.json())
            .then((data)=> {

                let _xAxis = [ ...xAxis ];
                let use_memory = [ ...useMemory ];
                let total_memory = [ ...totalMemory ];
                let free_memory = [ ...freeMemory ];

                if (count + 1 > 30) {
                    _xAxis.shift()
                    use_memory.shift()
                    total_memory.shift()
                    free_memory.shift()

                }

                setCount(count + 1)

                let now = new Date();
                let axisData = now.toLocaleTimeString().replace(/^\D*/, '');

                _xAxis.push(axisData);
                use_memory.push((100 - (100 * data.mem.free / data.mem.total)).toFixed(2));
                total_memory.push((data.mem.total).toFixed(2));
                free_memory.push((data.mem.free).toFixed(2));

                setXAxis(_xAxis)
                setUseMemory(use_memory)
                setTotalMemory(total_memory)
                setFreeMemory(free_memory)

            })
            .catch(e => {
                console.log(e)
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
                        text: 'Memory Usage'
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
                            max: 997769216,
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(128, 128, 128, 0.3)'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'Memory Usage',
                            type: 'line',

                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#F8C7C7'
                                    },
                                    {
                                        offset: 1,
                                        color: '#FFF4F0'
                                    }])
                            },

                            color: '#EC6161',
                            smooth: true,
                            data: useMemory
                        },
                        {
                            name: 'total Memory',
                            type: 'line',

                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#F8C7C7'
                                    },
                                    {
                                        offset: 1,
                                        color: '#FFF4F0'
                                    }])
                            },

                            color: '#EC6161',
                            smooth: true,
                            data: totalMemory
                        },
                        {
                            name: 'free Memory ',
                            type: 'line',

                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#F8C7C7'
                                    },
                                    {
                                        offset: 1,
                                        color: '#FFF4F0'
                                    }])
                            },

                            color: '#EC6161',
                            smooth: true,
                            data: freeMemory
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
                    backgroundColor: '#E9F6FF',
                }}
            />

        </>
    )
}

export default MemoryUsage;