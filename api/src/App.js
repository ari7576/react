import React from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import './App.css';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, } from 'antd';

import UserListPage from './Components/UserListPage';
import UserJoinPage from './Components/UserJoinPage';
import UserListDeletePage from './Components/UserListDeletePage';
import UserManagerPage from './Components/UserManagerPage';
import UserLogin from "./Components/UserLogin";
import Profile from "./Components/profile";

const { Header, Content, Footer, Sider } = Layout;

function App() {

    // todo : 경로가 바뀌게 하는데 꼭 필요함.
    const location= useLocation();
    let navigate = useNavigate();

    // 메뉴 아이템.
    const menuItems = [
        {key: '/userLogin', icon: React.createElement(UserOutlined), label: 'User Login'},
        {key: '/userList', icon: React.createElement(UserOutlined), label: 'User List'},
        {key: '/userJoin', icon: React.createElement(UserOutlined), label: 'User Join'},
        {key: '/userListDelete', icon: React.createElement(UserOutlined), label: 'User List Delete'},
        {key: '/userManager', icon: React.createElement(UserOutlined), label: 'User Manager'},
        {key: '/profile', icon: React.createElement(UserOutlined), label: 'User Profile'},

    ]

    const {
        token: { colorBgContainer},
    } = theme.useToken();

    // todo : // 메뉴 클릭 이벤트.
    const onClick = (e) => {
        console.log(e.key)
        navigate(e.key);
    }

    return (
        <div className='App'>
            <Layout style={{ minHeight: '100vh'}}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="demo-logo-vertical" />
                    
                    <Menu
                        theme="dark"
                        mode="inline"
                        onClick={onClick}
                        defaultSelectedKeys={[location.pathname]}
                        items={menuItems} />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <Routes>
                            <Route exact path="/" element={<UserListPage/>}/>
                            <Route exact path="/userList" element={<UserListPage/>}/>
                            <Route exact path="/userJoin" element={<UserJoinPage/>}/>
                            <Route exact path="/userListDelete" element={<UserListDeletePage/>}/>
                            <Route exact path="/userLogin" element={<UserLogin/>}/>
                            <Route exact path="/userManager" element={<UserManagerPage/>}/>
                            <Route exact path="/profile" element={<Profile/>}/>
                        </Routes>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
