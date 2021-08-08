import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { request } from '@/utils';
import localforage from 'localforage';
import './style.less';
const Login = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const res = await request('/users/login', {
      method: 'POST',
      data: values,
    });
    if (res.code === 200) {
      await localforage.setItem('user', values?.name);
      history.push('/gamer');
    } else {
      message.warn(res.msg);
    }
  };
  const forgetPassword = () => {
    const user = form.getFieldValue('name');
    message.info(`update users set password = '111111' where user='${user}'   请！`);
  };
  return (
    <div id="login-wrap">
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="name" rules={[{ required: true, message: '必填' }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '必填' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Button type="text" size="small" onClick={forgetPassword}>
            忘记密码
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
