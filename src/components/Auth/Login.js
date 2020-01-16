import React from 'react';
import {Redirect, Link} from 'umi';
import { Form, Icon, Input, Button, Checkbox} from 'antd';
import styles from './Login.less';
import * as auth from '../../services/auth';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    
  state = {
      redirectToReferrer: false
  };  

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        auth.login(values)
          .then((data) => {
            if (data.err) {
              data.err.response.json().then(errData => {
                console.log(errData);

                this.props.form.setFields({
                  password: {
                    value: values.password,
                    errors: [new Error(errData.message || 'Something is wrong!')],
                  },
                });
              });
            } else {
              auth.setToken(data.access_token, values.remember)
              auth.setUser(data.user, values.remember)

              this.setState({ redirectToReferrer: true });     
            } 
          });

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { redirectToReferrer } = this.state;
    const { from } =  { from: { pathname: "/" } };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    
    return (
      <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <Link className={styles.forgetButton} to="forget-password">Forgot password</Link>
              <Button type="primary" htmlType="submit" className={styles.loginButton}>
                Log in
              </Button>
              Or <Link to="register-user">register now!</Link>
            </FormItem>
        </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;