import React, {useEffect, useState} from "react";

import { HOST_URL } from '../define';

import { Table, Col, Row } from "antd";
import moment from "moment";

import 'react-confirm-alert/src/react-confirm-alert.css';

function UserListPage(props) {



    const [fileList, setFileList] = useState([])

    const [loading, setLoading] = useState(false)

    const columns = [
        {
            title: 'No.',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
        },
        {
            title: 'ID',
            dataIndex: 'userID',
            key: 'userID',
            align: 'center',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'Permission',
            dataIndex: 'permission',
            key: 'permission',
            align: 'center',
        },
        {
            title: 'Date',
            dataIndex: 'regDate',
            key: 'regDate',
            align: 'center',
            render: (regDate) => {
                return <p style={{padding: '0', margin: '0'}}>{moment(regDate).format("YYYY-MM-DD HH:mm:ss")}</p>
            },
        },

    ];

    const getList = () => {

        setLoading(true)
        setFileList([])

        fetch(HOST_URL + '/api/user/list', {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem('token')}`,
            },
        }).then(function (res) {
            return res.json();
        }).then((data) => {

            console.log(data)

            if (data.success) {
                for(let i=0; i<data.data.length; i++) {
                    data.data[i].no = i + 1
                    data.data[i].key = i
                }

                setFileList(data.data)
            }

            setLoading(false)

        }).catch(e => {

            setLoading(false)
            console.log(e)

        });
    }

    useEffect(() => {

        getList()

    }, []);

    return (
        <>
            <Row style={{margin: "0 -12px"}}>
                <Col span={24} style={{padding: "0 12px"}}>
                    <h1>User List</h1>
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
            </Row>

            <Row style={{margin: "0 -12px"}}>
                <Col span={24} style={{padding: "0 12px"}}>
                    <Table
                        dataSource={fileList}
                        columns={columns}
                        loading={loading}
                        size = {'middle'}
                        pagination={{ position: ['bottomCenter'] }}
                    />
                </Col>
            </Row>

        </>
    );
}

export default UserListPage;
