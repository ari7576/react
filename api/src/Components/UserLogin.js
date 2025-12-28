import React, {useState, useEffect} from "react";

import { HOST_URL } from '../define';

import { Button, Input, message, Col, Row } from "antd";

import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaUserPlus} from "react-icons/fa";

function UserLoginPage(props) {




    const [messageApi, contextHolder] = message.useMessage();

    const [userID, setUserID] = useState('')
    const [pass0, setPass0] = useState('')
    const [check, setCheck] = useState('')
    const handleOkAdd = () => {

        if (userID.length === 0){
            messageApi.open({ type: 'warning', content: '아이디를 입력해 주세요.'});
            return
        }

        if (pass0.length === 0){
            messageApi.open({ type: 'warning', content: '비밀번호를 입력해 주세요.' });
            return
        }

        const user = {
            userID: userID,
            password: pass0,
        }

        fetch(HOST_URL + "/api/user/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        }).then(function (res) {
            return res.json();
        }).then((data) => {
            if (data.success) {

                messageApi.open({ type: 'success', content: '로그인이 완료 되었습니다.' });

                localStorage.setItem("token", data.token);
                localStorage.setItem("ID", data.userID);
                localStorage.setItem("name", data.name);



            } else {
                messageApi.open({ type: 'error', content: data.message });
            }
        }).catch(e => {
            console.log(e)
        });

    };

    const onChange = (e) => {

        console.log(e.target.id)

        switch(e.target.id) {
            case 'userID' :
                setUserID(e.target.value)
                break;

            case 'pass0' :
                setPass0(e.target.value)
                break;

            default:
                break;
        }

    }


    return (
        <>
            {contextHolder}

            <Row style={{margin: "0 -12px"}}>
                <Col span={24} style={{padding: "0 12px"}}>
                    <h1>User Login</h1>
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
                <Col span={10} style={{padding: "0 12px"}}>
                    <Row style={{marginBottom: 5}} >
                        <Col span={6} >
                            <h4>아이디</h4>
                        </Col>
                        <Col span={16} >
                            <Input
                                id = 'userID'
                                value={userID}
                                onChange={onChange}
                                placeholder="아이디를 입력해 주세요." />
                        </Col>
                    </Row>
                    <Row style={{marginBottom: 5}} >
                        <Col span={6} >
                            <h4>비밀번호</h4>
                        </Col>
                        <Col span={16} >
                            <Input.Password
                                id = 'pass0'
                                value={pass0}
                                onChange={onChange}
                                placeholder="비밀번호를 입력해 주세요." />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col span={10} style={{padding: "0 12px"}}>
                    <Button
                        onClick={handleOkAdd}
                    ><FaUserPlus/>로그인</Button>
                </Col>
            </Row>
        </>
    );
}

export default UserLoginPage;
