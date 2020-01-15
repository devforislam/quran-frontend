import { Layout, Breadcrumb } from 'antd';
import HeaderMenu from '../Header/Header';
import {AuthProvider} from "react-check-auth";
import * as auth from '../../services/auth';
import * as request from '../../utils/request'; 

const {Content, Footer } = Layout;

const Layouts = ({children, location, selectedMenu}) => {
    console.log('api' , auth.url, auth.reqOptions);
    return (
        <AuthProvider authUrl={auth.url+'/user'} reqOptions={request.getReqOption()}>
            <Layout className="layout">
                <HeaderMenu selected={selectedMenu}/>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    {/*     <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item> */}
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    A Passionate Project by 
                    <a target="blank" href="https://twitter.com/MahbubRucse"> Mahbub Rabbani </a>  
                    & <a target="blank" href="https://twitter.com/Mhzaman2"> Hasanuzzaman </a>
                </Footer>
            </Layout>
        </AuthProvider>
    );
}

export default Layouts;