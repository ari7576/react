import React, {useEffect, useState} from "react";

import { HOST_URL } from '../define';

import { Table, Button, message, Col, Row } from "antd";
import axios from "axios";
import moment from "moment";

import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { TiUserDelete} from "react-icons/ti"; // Import css

function UserListDeletePage(props) {

    const [fileList, setFileList] = useState([])

    const [loading, setLoading] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();

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
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            align: 'center',
            render: (name, record) => {
                return (
                    <Button onClick={() => userDelete(record) }><TiUserDelete />삭제</Button>
                );
            }
        },

    ];

    const userDelete = (record) => {

        const options = {
            title: '알림',
            message: '사용자를 정말 삭제 하시겠습니까?',
            buttons: [
                {
                    label: '예',
                    onClick: () => {

                        setLoading(true)

                        const user = {
                            userID: record.userID,
                        }
                        axios
                            .post(HOST_URL + "/api/user/delete", user)
                            .then((res) => {

                                if (res.data.success) {
                                    getList()
                                } else {
                                    messageApi.open({ type: 'error', content: res.data.message });
                                }
                                setLoading(false)
                            })
                            .catch(e => {
                                setLoading(false)
                                console.log(e)
                            });
                    }
                },
                {
                    label: '아니요',
                    onClick: () => {}
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "overlay-custom-class-name"
        };

        confirmAlert(options);

    }

    const getList = () => {

        setLoading(true)
        setFileList([])

        fetch(HOST_URL + '/api/user/list', {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (response) {
            return response.json();
        }).then((data) => {

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
            {contextHolder}

            <Row style={{margin: "0 -12px"}}>
                <Col span={24} style={{padding: "0 12px"}}>
                    <h1>User List Delete</h1>
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

export default UserListDeletePage;
