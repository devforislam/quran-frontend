import React from 'react';
import  * as auth from '../../services/auth';
import Redirect from  'umi/redirect';

class Logout extends React.Component {
   
    logout  = () => {
        auth.logout();
    }

    render() {
        const {children} = this.props;
        if (!auth.check()) {
            return <Redirect to='/' />
        }
        return (
            <span onClick={this.logout}>
                {children}
            </span>
        )
    }
}

export default Logout;