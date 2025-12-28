import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import CheckBox from "./components/CheckBox";
import Input from "./components/Input";
import Inputnumber from "./components/Inputnumber";
import _modal from "./components/_modal";
import _radio from "./components/_radio";
import Tables from "./components/Tables";
import _alert from "./components/_alert";
import _anchor from "./components/_anchor";
import _button from "./components/_button";
import _buttonPage from "./components/_buttonPage";
import _dropDown from "./components/_dropDown";


const { Header, Content, Footer } = Layout;
const menuItems = [
    {key: '/Input', label: 'Input'},
    {key: '/Inputnumber', label: 'Inputnumber'},
    {key: '/CheckBox', label: 'CheckBox'},
    {key: '/_radio', label: 'radio'},
    {key: '/_modal', label: 'modal'},
    {key: '/Tables', label: 'Table'},
    {key: '/_alert', label: '_alert'},
    {key: '/_anchor', label: '_anchor'},
    {key: '/_button', label: '_button'},
    {key: '/_dropDown', label: '_dropDown'},
]

function App() {

    const location = useLocation();
    const name = location.pathname.split('/')[1];
    let navigate = useNavigate();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onClick = (e) => {
        console.log(e.key)
        navigate(e.key);
    }
  return (
      <Layout>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
              <div className="demo-logo" />
              <Menu
                  theme="dark"
                  mode="horizontal"
                  onClick={onClick}
                  defaultSelectedKeys={[location.pathname]}
                  items={menuItems}
                  style={{ flex: 1, minWidth: 0 }}
              />
          </Header>
          <Content style={{ padding: '0 48px' }}>
              <Breadcrumb
                  separator=""
                  items={[
                      {
                          title: 'Location',
                      },
                      {
                          type: 'separator',
                          separator: ':',
                      },
                      {
                          href: '/CheckBox',
                          title: 'CheckBox',
                      },
                      {
                          type: 'separator',
                      },
                      {
                          href: '/Input',
                          title: 'Input',
                      },
                      {
                          type: 'separator',
                      },
                      {
                          href: '/Inputnumber',
                          title: 'Inputnumber',
                      },
                      {
                          type: 'separator',
                      },
                      {
                          href: '/_modal',
                          title: 'modal',
                      },
                      {
                          type: 'separator',
                      },
                      {
                          href: '/_radio',
                          title: 'radio',
                      },
                      {
                          type: 'separator',
                      },
                      {
                          href: '/Tables',
                          title: 'Table',
                      },
                      {
                          type: 'separator',
                      },
                      {
                          href: '/_alert',
                          title: 'alert',
                      },
                      {
                          type: 'separator',
                      },
                      {
                          href: '/_anchor',
                          title: 'anchor',
                      },
                      {
                          type: 'separator',
                      },
                      {
                          href: '/_button',
                          title: 'button',
                      },
                      {
                          type: 'separator',
                      },
                      {
                          href: '/_dropDown',
                          title: 'dropDown',
                      },
                      {
                          type: 'separator',
                      },
                      {
                          title: `현재위치는 ${name}`,
                      },
                  ]}
              />
              <div
                  style={{
                      background: colorBgContainer,
                      minHeight: 280,
                      padding: 24,
                      borderRadius: borderRadiusLG,
                  }}
              >
                  <Routes>
                      <Route exact path="/" element={<CheckBox/>}/>
                      <Route exact path="/CheckBox" element={<CheckBox/>}/>
                      <Route exact path="/Input" element={<Input/>}/>
                      <Route exact path="/_alert" element={<_alert/>}/>
                      <Route exact path="/Inputnumber" element={<Inputnumber/>}/>
                      <Route exact path="/_modal" element={<_modal/>}/>
                      <Route exact path="/_radio" element={<_radio/>}/>
                      <Route exact path="/Tables" element={<Tables/>}/>
                      <Route exact path="/_anchor" element={<_anchor/>}/>
                      <Route exact path="/_button" element={<_button/>}/>
                      <Route exact path="/_dropDown" element={<_dropDown/>}/>
                      <Route exact path="/_buttonPage" element={<_buttonPage/>}/>
                  </Routes>
              </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
      </Layout>
  );
}

export default App;
