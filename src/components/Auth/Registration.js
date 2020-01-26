import React from 'react';
import {Redirect} from 'umi';
import { Form, Icon, Input, Button } from 'antd';
import styles from './Registration.less';
import * as auth from '../../services/auth';
import {AuthConsumer} from 'react-check-auth';
import * as validator from '../../validation';

const FormItem = Form.Item;

class UserRegistrationForm extends React.Component {
    
  state = {
      redirectToReferrer: false
  };  

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        auth.register(values)
          .then((data) => {
            if (data.err) {
              data.err.response.json().then(errData => {
                let errFields = validator.getParsedFieldErrors(values, errData.errors)
                this.props.form.setFields(errFields);
              }); 
            } else {
              auth.setToken(data.access_token, true);
              auth.setUser(data.user, true) ;
              this.setState({ redirectToReferrer: true });     
            } 
          });

      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { redirectToReferrer } = this.state;
    const { from } =  { from: { pathname: "/" } };

    if (redirectToReferrer || auth.check()) {
      return <Redirect to={from} />;
    }
    
    return (
      
          <Form onSubmit={this.handleSubmit} className={styles.registrationForm}>
            <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
            )}
           </FormItem>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
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
              {getFieldDecorator('password_confirmation', {
                rules: [
                  { required: true, message: 'Please confirm your Password!' }, 
                  { validator: validator.confirm, message: 'Password mismatch.' , getFieldValue: () => getFieldValue('password') }
                ],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className={styles.registerButton}>
                Register
              </Button>              
            </FormItem>
          </Form>
    );
  }
}

const WrappedUserRegistrationForm = Form.create()(UserRegistrationForm);

export default WrappedUserRegistrationForm;