import React, {useEffect,useRef, useState} from 'react';

import {Row, Col} from "antd";

import "../App.css"

import imgOs from '../images/os.png';
import imgCpu from '../images/CPU.png';
import imgMem from '../images/Mem.png';
import imgNode from '../images/node.js.png';
import imgUptime from '../images/uptime.png';
import imgVersion from '../images/version.png';
import {HOST_URL} from "../define";

import CPUUsage from "./CPUUsage";
import MemoryUsage from "./MemoryUsage";

function bytesToSize(bytes) {
    if (bytes === 0) return '0 Byte';
    bytes = Number(bytes);
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    let d = Math.floor(seconds / (3600 * 24));
    let h = Math.floor(seconds % (3600 * 24) / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);

    let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

function Profile() {
    const timerId = useRef(null);
    const [loading, setLoading] = useState(false)

    const [osInfo, setOsInfo] = useState('')
    const [cpuInfo, setCpuInfo] = useState('')
    const [memInfo, setMemInfo] = useState('')
    const [nodeInfo, setNodeInfo] = useState('')
    const [uptimeInfo, setPptimeInfo] = useState('')
    const [versionInfo, setVersionInfo] = useState('')


    const getInfo = () => {

        setLoading(true)

        fetch(HOST_URL + '/api/profile', {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (response) {
            return response.json();
        }).then((data) => {

            setOsInfo(data.os.arch + "_" + data.os.platform + "_" + data.os.release)
            setCpuInfo(data.cpu.num + " x " + data.cpu.model)
            setMemInfo(bytesToSize(data.mem.total))
            setNodeInfo(data.nodejs.version)
            setPptimeInfo(secondsToDhms(data.nodejs.uptime))
            setVersionInfo(data.version)

            setLoading(false)

        }).catch(e => {
            setLoading(false)
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

        <Row style={{margin: "0 -12px"}}>

            <Col span={24} style={{padding: "0 12px"}}>
                <h1>Profile</h1>
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        borderBottom: "1px solid #E2E2E2",
                        lineHeight: "0.1em",
                        margin: "10px 0 20px",
                    }}
                />
            </Col>

            <Col style={{padding: "0 12px",
                marginRight: '0px',
                marginBottom: '20px'}}>
                <div style={{
                    height: '250px',
                    width: '400px',
                    backgroundColor: '#E8EAFF',
                    borderRadius: '8px',
                }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '38px',
                            left: '38px',
                            width: "3px",
                            height: '73px',
                            backgroundColor: '#828CF5',
                            borderRadius: '2px',
                        }}
                    />
                    <h2
                        style={{
                            position: 'absolute',
                            top: '45px',
                            left: '50px',
                            color: '#AAADD4',
                        }}
                    >
                        OS
                    </h2>
                    <h2
                        style={{
                            position: 'absolute',
                            top: '80px',
                            left: '50px',
                            color: '#343435',
                        }}
                    >
                        {osInfo}
                    </h2>
                    <img style={{
                        position: 'absolute',
                        top: 'calc(100% - 100px)',
                        left: 'calc(100% - 115px)',
                    }}
                         src={imgOs} alt={'없음'}/>
                </div>
            </Col>

            <Col style={{padding: "0 12px",
                marginRight: '0px',
                marginBottom: '20px'}}>
                <div style={{
                    height: '250px',
                    width: '400px',
                    backgroundColor: '#FFEFE3',
                    borderRadius: '8px',
                }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '38px',
                            left: '38px',
                            width: "3px",
                            height: '73px',
                            backgroundColor: '#F0AD7B',
                            borderRadius: '2px',
                        }}
                    />
                    <h2
                        style={{
                            position: 'absolute',
                            top: '45px',
                            left: '50px',
                            color: '#C3B3A8',
                        }}
                    >
                        CPU
                    </h2>
                    <h2
                        style={{
                            position: 'absolute',
                            top: '80px',
                            left: '50px',
                            color: '#343435',
                        }}
                    >
                        {cpuInfo}
                    </h2>
                    <img style={{
                        position: 'absolute',
                        top: 'calc(100% - 100px)',
                        left: 'calc(100% - 115px)',
                    }}
                         src={imgCpu} alt={'없음'}/>
                </div>
            </Col>

            <Col style={{padding: "0 12px",
                marginRight: '0px',
                marginBottom: '20px'}}>
                <div style={{
                    height: '250px',
                    width: '400px',
                    backgroundColor: '#D0EDE6',
                    borderRadius: '8px',
                }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '38px',
                            left: '38px',
                            width: "3px",
                            height: '73px',
                            backgroundColor: '#86D4C1',
                            borderRadius: '2px',
                        }}
                    />
                    <h2
                        style={{
                            position: 'absolute',
                            top: '45px',
                            left: '50px',
                            color: '#A7BFB9',
                        }}
                    >
                        Memory
                    </h2>
                    <h2
                        style={{
                            position: 'absolute',
                            top: '80px',
                            left: '50px',
                            color: '#343435',
                        }}
                    >
                        {memInfo}
                    </h2>
                    <img style={{
                        position: 'absolute',
                        top: 'calc(100% - 100px)',
                        left: 'calc(100% - 115px)',
                    }}
                         src={imgMem} alt={'없음'}/>
                </div>
            </Col>

            <Col style={{padding: "0 12px",
                marginRight: '0px',
                marginBottom: '20px'}}>
                <div style={{
                    height: '250px',
                    width: '400px',
                    backgroundColor: '#E9F6FF',
                    borderRadius: '8px',
                }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '38px',
                            left: '38px',
                            width: "3px",
                            height: '73px',
                            backgroundColor: '#8BC3EA',
                            borderRadius: '2px',
                        }}
                    />
                    <h2
                        style={{
                            position: 'absolute',
                            top: '45px',
                            left: '50px',
                            color: '#ACBECB',
                        }}
                    >
                        Node.js
                    </h2>
                    <h2
                        style={{
                            position: 'absolute',
                            top: '80px',
                            left: '50px',
                            color: '#343435',
                        }}
                    >
                        {nodeInfo}
                    </h2>
                    <img style={{
                        position: 'absolute',
                        top: 'calc(100% - 100px)',
                        left: 'calc(100% - 115px)',
                    }}
                         src={imgNode} alt={'없음'}/>
                </div>
            </Col>

            <Col style={{padding: "0 12px",
                marginRight: '0px',
                marginBottom: '20px'}}>
                <div style={{
                    height: '250px',
                    width: '400px',
                    backgroundColor: '#FFF2FB',
                    borderRadius: '8px',
                }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '38px',
                            left: '38px',
                            width: "3px",
                            height: '73px',
                            backgroundColor: '#E09ACB',
                            borderRadius: '2px',
                        }}
                    />
                    <h2
                        style={{
                            position: 'absolute',
                            top: '45px',
                            left: '50px',
                            color: '#D2BACA',
                        }}
                    >
                        Uptime
                    </h2>
                    <h2
                        style={{
                            position: 'absolute',
                            top: '80px',
                            left: '50px',
                            color: '#343435',
                        }}
                    >
                        {uptimeInfo}
                    </h2>
                    <img style={{
                        position: 'absolute',
                        top: 'calc(100% - 100px)',
                        left: 'calc(100% - 115px)',
                    }}
                         src={imgUptime} alt={'없음'}/>
                </div>
            </Col>

            <Col style={{padding: "0 12px",
                marginRight: '0px',
                marginBottom: '20px'}}>
                <div style={{
                    height: '250px',
                    width: '400px',
                    backgroundColor: '#EBF0F6',
                    borderRadius: '8px',
                }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '38px',
                            left: '38px',
                            width: "3px",
                            height: '73px',
                            backgroundColor: '#9FB4CD',
                            borderRadius: '2px',
                        }}
                    />
                    <h2
                        style={{
                            position: 'absolute',
                            top: '45px',
                            left: '50px',
                            color: '#B3BDC8',
                        }}
                    >
                        Version
                    </h2>
                    <h2
                        style={{
                            position: 'absolute',
                            top: '80px',
                            left: '50px',
                            color: '#343435',
                        }}
                    >
                        {versionInfo}
                    </h2>
                    <img style={{
                        position: 'absolute',
                        top: 'calc(100% - 100px)',
                        left: 'calc(100% - 115px)',
                    }}
                         src={imgVersion} alt={'없음'}/>
                </div>
            </Col>

            <Col style={{padding: "0 12px",
                marginRight: '0px',
                marginBottom: '20px',
            }}>
                <CPUUsage/>
            </Col>

            <Col style={{padding: "0 12px",
                marginRight: '0px',
                marginBottom: '20px',
            }}>
                <MemoryUsage/>
            </Col>
        </Row>
    );

}

export default Profile;