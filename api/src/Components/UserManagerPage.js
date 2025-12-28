import React, {useEffect, useState} from "react";

import { HOST_URL } from '../define';

import { Table, Modal, Button, Input, Radio, message, Col, Row } from "antd";
import axios from "axios";
import moment from "moment";

import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaUserEdit, FaUserPlus} from "react-icons/fa";
import { TiUserDelete} from "react-icons/ti"; // Import css

function UserManagerPage(props) {

    const [fileList, setFileList] = useState([])

    const [loading, setLoading] = useState(false)

    const [modalUserAdd, setModalUserAdd] = useState(false);

    const [modalUserEdit, setModalUserEdit] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const [userID, setUserID] = useState('')
    const [pass0, setPass0] = useState('')
    const [pass1, setPass1] = useState('')
    const [name, setName] = useState('')
    const [permission, setPermission] = useState('user')

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
            title: 'Edit',
            dataIndex: 'Edit',
            key: 'Edit',
            align: 'center',
            render: (name, record) => {
                return (
                    <Button onClick={() => userEdit(record) }><FaUserEdit />수정</Button>
                );
            }
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

    const handleOkAdd = () => {

        if (userID.length === 0){
            messageApi.open({ type: 'warning', content: '아이디를 입력해 주세요.' });
            return
        }

        if (userID.length <= 5){
            messageApi.open({ type: 'warning', content: '아이디를 5자 이상 입력해 주세요.' });
            return
        }

        const regex = /^[a-zA-Z0-9]*$/;

        if (!regex.test(userID)){
            messageApi.open({ type: 'warning', content: '아이디는 영어 숫자만 사용 가능 합니다.' });
            return
        }

        if (pass0.length === 0){
            messageApi.open({ type: 'warning', content: '비밀번호를 입력해 주세요.' });
            return
        }

        if (pass0 !== pass1){
            messageApi.open({ type: 'warning', content: '비밀번호가 동일하지 않습니다.' });
            return
        }

        if (name.length === 0){
            messageApi.open({ type: 'warning', content: '비밀번호가 동일하지 않습니다.' });
            return
        }

        const user = {
            userID: userID,
            password: pass0,
            name: name,
            permission: permission,
        }

        fetch(HOST_URL + "/api/user/add", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        }).then(function (response) {
            return response.json();
        }).then((data) => {

            if (data.success) {
                getList()
                setModalUserAdd(false);
            } else {
                messageApi.open({ type: 'error', content: data.message });
            }
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            console.log(e)
        });

    };

    const handleOkEdit = () => {

        if (pass0.length === 0){
            messageApi.open({ type: 'warning', content: '비밀번호를 입력해 주세요.' });
            return
        }

        if (pass0 !== pass1){
            messageApi.open({ type: 'warning', content: '비밀번호가 동일하지 않습니다.' });
            return
        }

        if (name.length === 0){
            messageApi.open({ type: 'warning', content: '비밀번호가 동일하지 않습니다.' });
            return
        }

        const user = {
            userID: userID,
            password: pass0,
            name: name,
            permission: permission,
        }

        fetch(HOST_URL + "/api/user/edit", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        }).then(function (response) {
            return response.json();
        }).then((data) => {

            if (data.success) {
                getList()
                setModalUserEdit(false);
            } else {
                messageApi.open({ type: 'error', content: data.message });
            }
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            console.log(e)
        });

    };

    const handleCancel = () => {
        setModalUserAdd(false);
        setModalUserEdit(false);
    };

    const userAdd = () => {

        setUserID('')
        setPass0('')
        setPass1('')
        setName('')
        setPermission('user')

        setModalUserAdd(true)

    }

    const userEdit = (record) => {

        setUserID(record.userID)
        setPass0('')
        setPass1('')
        setName(record.name)
        setPermission(record.permission)

        setModalUserEdit(true)

    }

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
            willUnmount: () => {},
            afterClose: () => {},
            onClickOutside: () => {},
            onKeypress: () => {},
            onKeypressEscape: () => {},
            overlayClassName: "overlay-custom-class-name"
        };

        confirmAlert(options);


    }

    const onChangeUserID = (e) => {
        const { value } = e.target
        setUserID(value)
    }

    const onChangePass0 = (e) => {
        const { value } = e.target
        setPass0(value)
    }

    const onChangePass1 = (e) => {
        const { value } = e.target
        setPass1(value)
    }

    const onChangeName = (e) => {
        const { value } = e.target
        setName(value)
    }

    const onChangePermission = (e) => {
        setPermission(e.target.value);
    };

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
            <Modal title="사용자 추가"
                   open={modalUserAdd}
                   onOk={handleOkAdd}
                   onCancel={handleCancel}
                   centered
            >
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        borderBottom: "1px solid #E2E2E2",
                        lineHeight: "0.1em",
                        margin: "10px 0 20px",
                    }}
                />
                <Row style={{marginBottom: 5}} >
                    <Col span={6} >
                        <h4>아이디</h4>
                    </Col>
                    <Col span={16} >
                        <Input
                            value={userID}
                            onChange={onChangeUserID}
                            placeholder="아이디를 입력해 주세요." />
                    </Col>
                </Row>
                <Row style={{marginBottom: 5}} >
                    <Col span={6} >
                        <h4>비밀번호</h4>
                    </Col>
                    <Col span={16} >
                        <Input.Password
                            value={pass0}
                            onChange={onChangePass0}
                            placeholder="비밀번호를 입력해 주세요." />
                    </Col>
                </Row>
                <Row style={{marginBottom: 5}} >
                    <Col span={6} >
                        <h4>비밀번호 (확인)</h4>
                    </Col>
                    <Col span={16} >
                        <Input.Password
                            value={pass1}
                            onChange={onChangePass1}
                            placeholder="비밀번호를 입력해 주세요." />
                    </Col>
                </Row>
                <Row style={{marginBottom: 5}} >
                    <Col span={6} >
                        <h4>이름</h4>
                    </Col>
                    <Col span={16} >
                        <Input
                            value={name}
                            onChange={onChangeName}
                            placeholder="이름을 입력해 주세요." />
                    </Col>
                </Row>
                <Row style={{marginBottom: 5}} >
                    <Col span={6} >
                        <h4>권한</h4>
                    </Col>
                    <Col span={16} >
                        <Radio.Group onChange={onChangePermission} value={permission}>
                            <Radio value={'admin'}>관리자</Radio>
                            <Radio value={'menu'}>메뉴</Radio>
                            <Radio value={'user'}>사용자</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        borderBottom: "1px solid #E2E2E2",
                        lineHeight: "0.1em",
                        margin: "10px 0 20px",
                    }}
                />
            </Modal>

            <Modal title="사용자 수정"
                   open={modalUserEdit}
                   onOk={handleOkEdit}
                   onCancel={handleCancel}
                   centered
            >
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        borderBottom: "1px solid #E2E2E2",
                        lineHeight: "0.1em",
                        margin: "10px 0 20px",
                    }}
                />
                <Row style={{marginBottom: 5}}>
                    <Col span={6}>
                        <h4>아이디</h4>
                    </Col>
                    <Col span={16}>
                        <Input
                            value={userID}
                            onChange={onChangeUserID}
                            readOnly={true}
                            placeholder="아이디를 입력해 주세요."/>
                    </Col>
                </Row>
                <Row style={{marginBottom: 5}}>
                    <Col span={6}>
                        <h4>비밀번호</h4>
                    </Col>
                    <Col span={16}>
                        <Input.Password
                            value={pass0}
                            onChange={onChangePass0}
                            placeholder="비밀번호를 입력해 주세요."/>
                    </Col>
                </Row>
                <Row style={{marginBottom: 5}}>
                    <Col span={6}>
                        <h4>비밀번호 (확인)</h4>
                    </Col>
                    <Col span={16}>
                        <Input.Password
                            value={pass1}
                            onChange={onChangePass1}
                            placeholder="비밀번호를 입력해 주세요."/>
                    </Col>
                </Row>
                <Row style={{marginBottom: 5}}>
                    <Col span={6}>
                        <h4>이름</h4>
                    </Col>
                    <Col span={16}>
                        <Input
                            value={name}
                            onChange={onChangeName}
                            placeholder="이름을 입력해 주세요."/>
                    </Col>
                </Row>
                <Row style={{marginBottom: 5}}>
                    <Col span={6}>
                        <h4>권한</h4>
                    </Col>
                    <Col span={16}>
                        <Radio.Group
                            value={permission}
                            onChange={onChangePermission} >
                            <Radio value={'admin'}>관리자</Radio>
                            <Radio value={'menu'}>메뉴</Radio>
                            <Radio value={'user'}>사용자</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        borderBottom: "1px solid #E2E2E2",
                        lineHeight: "0.1em",
                        margin: "10px 0 20px",
                    }}
                />
            </Modal>

            <Row style={{margin: "0 -12px"}}>
                <Col span={24} style={{padding: "0 12px"}}>
                    <h1>User Manager</h1>
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
                <Button
                    onClick={userAdd}
                    style={{
                        position: 'absolute',
                        top: '60px',
                        left: 'calc(100% - 210px)',
                    }}
                ><FaUserPlus/>추가</Button>
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

export default UserManagerPage;
