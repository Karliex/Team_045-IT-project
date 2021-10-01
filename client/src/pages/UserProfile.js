import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { Button} from "react-bootstrap";
import { Divider, Menu, Layout} from 'antd';
import { MailOutlined, SettingOutlined} from '@ant-design/icons'
import axios from '../common/axios'
import LoginPart from "../components/LoginPart"

export default function UserProfile(props) {
    const [toggleCollapsed,setcollapsed]=useState(false)

    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    const changecollapsed=() =>{
        setcollapsed(!toggleCollapsed)
    }
    return (
        <div className="Profile">
           <div>
                <Link to="/">
                    <Button variant="Link" style={{float:"Left",marginLeft:"5px",marginTop:"5px",fontWeight:"bold"}}>Back</Button>
                </Link>
                <LoginPart/>
                <Divider/>
            </div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={toggleCollapsed} onCollapse={changecollapsed} theme="light">
                    <div className="logo" />
                    <Menu defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<MailOutlined />}>
                            User profile
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<SettingOutlined/>} title="Account setting">
                            <Menu.Item key="3">Change Password</Menu.Item>
                            <Menu.Item key="4">Change Profile details</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            Bill is a cat.
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}