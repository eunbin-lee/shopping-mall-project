import React from 'react';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import '../../utils/sns.css';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        role: 'general',
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('성명을 입력해 주세요'),
        // lastName: Yup.string().required('Last Name is required'),
        email: Yup.string()
          .email('이메일을 올바르게 입력해 주세요')
          .required('이메일을 입력해 주세요'),
        userID: Yup.string()
          .min(4, '아이디를 4자리 이상 입력해 주세요')
          .required('아이디를 입력해 주세요'),
        password: Yup.string()
          .min(6, '비밀번호를 6자리 이상 입력해 주세요')
          .required('비밀번호를 입력해 주세요'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
          .required('비밀번호를 확인해 주세요'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            role: values.role,
            email: values.email,
            userID: values.userID,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              props.history.push('/login');
            } else {
              alert(response.payload.err.errmsg);
            }
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <h2 style={{ marginBottom: '2rem', fontWeight: 'bold' }}>
              회원가입
            </h2>
            <Form
              style={{ minWidth: '375px' }}
              {...formItemLayout}
              onSubmit={handleSubmit}
            >
              <Form.Item required label="구분">
                <select
                  id="role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    border: '1px solid #dbdbdb',
                    borderRadius: '4px',
                    padding: '0.3rem 0.5rem',
                    paddingRight: '10.6rem',
                  }}
                >
                  <option value="general" selected>
                    일반
                  </option>
                  <option value="seller">판매자</option>
                </select>
              </Form.Item>

              <Form.Item required label="성명">
                <Input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              {/* <Form.Item required label="Last Name">
                <Input
                  id="lastName"
                  placeholder="Enter your Last Name"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastName && touched.lastName
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div>
                )}
              </Form.Item> */}

              <Form.Item
                required
                label="이메일"
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? 'error' : 'success'
                }
              >
                <Input
                  id="email"
                  placeholder="shop@example.com"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="아이디"
                hasFeedback
                validateStatus={
                  errors.userID && touched.userID ? 'error' : 'success'
                }
              >
                <Input
                  id="userID"
                  placeholder="4자리 이상"
                  type="text"
                  value={values.userID}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.userID && touched.userID
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.userID && touched.userID && (
                  <div className="input-feedback">{errors.userID}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="비밀번호"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? 'error' : 'success'
                }
              >
                <Input
                  id="password"
                  placeholder="6자리 이상"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="비밀번호 확인" hasFeedback>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                  style={{ margin: '10px 0' }}
                >
                  회원가입 완료
                </Button>
              </Form.Item>
            </Form>

            <div className="sns">
              <div style={{ marginTop: '1.5rem' }}>
                <button className="kakao">카카오 간편가입</button>
                <button className="naver">네이버 간편가입</button>
              </div>
              <div>
                <button className="google">구글 간편가입</button>
                <button className="facebook">페이스북 간편가입</button>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
