import {Layout, Menu, Icon} from 'antd';
import menu from '../../config/menu';
import {AuthConsumer} from 'react-check-auth';
import Logout from '../Auth/Logout';
import * as auth from '../../services/auth';
import React, {Component} from 'react';


const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const Link = require('dva').router.Link;

class HeaderMenu extends Component {
  render() {
    let headerStyle = {
      lineHeight: '64px'
    }

    if (this.props.isMobile) {
      headerStyle['padding'] = 0;
    }
    const selectedMenu = this.props.selected ||'home';
    return ( 
      <Header  style={headerStyle}>
        <div className="logo" />
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedMenu]}
            style={{ lineHeight: '64px', padding: 0}}
        >
            {menu.map(item=> 
              <MenuItem key={item.key} style={{ backgroundColor: 'inherit', textColor: selectedMenu === item.key ? 'rgb(212, 136, 6)' : '' }}>
                <Link to={item.path}> { item.label} </Link>
              </MenuItem>
            )}
            { auth.check() ? 
                (
                  <SubMenu style={{float: 'right'}} key="sub1" title={<span><Icon type="user" /><span> {auth.getUser().name}</span></span>}>
                      <Menu.Item ><Link to='favorites'><Icon type="book" /> Favorites</Link></Menu.Item>
                      <Menu.Item > <Logout><Icon type="logout" /> Log Out</Logout></Menu.Item>
                  </SubMenu>
                ) :
                  <MenuItem  key="login" style={{ backgroundColor: 'inherit', float: 'right'}}><Link to='login'> Login</Link></MenuItem>
            }                    
        </Menu>
      </Header>
    );
  }
}

export default HeaderMenu;