import { Button, Col, Form, Input, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../service/apiService";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const res = await loginUserAPI(values.email, values.password);
    if (res.data) {
      notification.success({
        message: "Login user",
        description: "Dang nhap thanh cong",
      });
      setLoading(false);
      navigate("/");
    } else {
      notification.error({
        message: "Login user error",
        description: JSON.stringify(res.message),
      });
      setLoading(false);
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col xs={24} sm={18} md={12} lg={10} xl={8}>
        <div
          className=""
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "10px",
            padding: "20px",
            position: "relative",
            margin: "0 auto",
          }}
        >
          <Form onFinish={onFinish} layout="vertical" form={form}>
            <Form.Item
              label="Email name"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link to={"/"}>Go to home</Link>

              <Button
                onClick={() => {
                  form.submit();
                }}
                type="primary"
                loading={loading}
              >
                Login
              </Button>
            </div>

            <div
              className="register-prompt"
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <span>
                Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
              </span>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default LoginPage;
