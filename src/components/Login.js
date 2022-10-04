import { useState } from 'react';
import AuthForm from './AuthForm';

const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    const { email, password } = data;
    handleLogin(email, password);
  };

  return (
    <AuthForm
      name="signup"
      title="Вход"
      onSubmit={handleSubmit}
      buttonText="Войти"
      path="/signup"
      linkText=""
    >
      <fieldset className="form__set-auth">
        <label className="form__field">
          <input
            type="email"
            placeholder="Email"
            className="form__input form__input_auth"
            id="edit-email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <span className="fprm__input-error edit-email-error" />
        </label>
        <label className="form__field">
          <input
            type="password"
            placeholder="Пароль"
            className="form__input form__input_auth"
            id="edit-password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <span className="form__input-error edit-password-error" />
        </label>
      </fieldset>
    </AuthForm>
  );
};

export default Login;
