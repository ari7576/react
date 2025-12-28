import React, {useState} from "react";

import { HOST_URL } from '../define';

import { Button, Input, Radio, message, Col, Row } from "antd";

import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaUserPlus} from "react-icons/fa";

function UserJoinPage(props) {

    const [messageApi, contextHolder] = message.useMessage();

    const [userID, setUserID] = useState('')
    const [pass0, setPass0] = useState('')
    const [pass1, setPass1] = useState('')
    const [name, setName] = useState('')
    const [permission, setPermission] = useState('user')

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
            messageApi.open({ type: 'warning', content: '이름을 입력해주세요.' });
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
        }).then(function (res) {
            return res.json();
        }).then((data) => {
            if (data.success) {
                messageApi.open({ type: 'success', content: '가입이 완료 되었습니다.' });
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

            case 'pass1' :
                setPass1(e.target.value)
                break;

            case 'name' :
                setName(e.target.value)
                break;

            default:
                break;
        }

    }



    const onChangePermission = (e) => {

        setPermission(e.target.value);
    };

    return (
        <>
            {contextHolder}

            <Row style={{margin: "0 -12px"}}>
                <Col span={24} style={{padding: "0 12px"}}>
                    <h1>User Join</h1>
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
                    <Row style={{marginBottom: 5}} >
                        <Col span={6} >
                            <h4>비밀번호 (확인)</h4>
                        </Col>
                        <Col span={16} >
                            <Input.Password
                                id = 'pass1'
                                value={pass1}
                                onChange={onChange}
                                placeholder="비밀번호를 입력해 주세요." />
                        </Col>
                    </Row>
                    <Row style={{marginBottom: 5}} >
                        <Col span={6} >
                            <h4>이름</h4>
                        </Col>
                        <Col span={16} >
                            <Input
                                id = 'name'
                                value={name}
                                onChange={onChange}
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
                </Col>
            </Row>

            <Row>
                <Col span={10} style={{padding: "0 12px"}}>
                <Button
                    onClick={handleOkAdd}
                ><FaUserPlus/>추가</Button>
                </Col>
            </Row>
        </>
    );
}

export default UserJoinPage;
