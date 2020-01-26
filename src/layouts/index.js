import React, {Component} from 'react';
import { Layout, Breadcrumb } from 'antd';
import HeaderMenu from '../components/Header/Header';
import {AuthProvider} from "react-check-auth";
import * as auth from '../services/auth';
import * as request from '../utils/request'; 
import { connect } from 'dva';

import { enquireScreen } from 'enquire-js';
import './index.css';

const {Content, Footer } = Layout;

let isMobile;

enquireScreen((b) => {
console.log('enquiring', b);
  isMobile = b;
});
class Layouts extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log('Testing', props.isMobile);
        const { pathname } = props.location;
        const {dispatch} = props;
        this.dispatch = dispatch;
        this.state = {
        isMobile: false
        };
    }

    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });
            this.dispatch({
                type: 'global/setIsMobile',
                payload: !!b
            });
        });
    }

    render() {

    const { selectedMenu} = this.props;
    const { children, ...restProps } = this.props;
    const { pathname } = this.props.location;
    const { appLocale } = this.state;
    const pathKey = pathname && pathname.split('/')[0];// (pathname.split('/')[1] || pathname.split('/')[0]);
    const childrenToRender = React.cloneElement(children, {
      ...children.props,
      isMobile: 'this.state.isMobile',
    //   key: pathKey,
    });
        
    console.log('Props' , children.props , childrenToRender.props);
    return (
        // <AuthProvider authUrl={auth.url+'/user'} reqOptions={request.getReqOption()}>
            <Layout className="layout">
                <HeaderMenu isMobile={this.state.isMobile} selected={selectedMenu}/>
                <Content style={{ padding: isMobile ? '0 0px' : '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    {/*     <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item> */}
                    </Breadcrumb>
                    <div style={{ background: isMobile ? 'inherit' : '#fff', padding: isMobile ? 0 : 24, minHeight: 280 }}>
                        {childrenToRender}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    A Passionate Project by 
                    <a target="blank" href="https://twitter.com/MahbubRucse"> Mahbub Rabbani </a>  
                    & <a target="blank" href="https://twitter.com/Mhzaman2"> Hasanuzzaman </a>
                </Footer>
            </Layout>
        // </AuthProvider>
    );
                    }
}

export default connect(({ global }) => ({...global})) (Layouts);