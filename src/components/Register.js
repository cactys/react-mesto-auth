import { useState } from 'react';
import AuthForm from './AuthForm';

const Register = ({ handleRegister }) => {
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
    const { email, password } = data;
    handleRegister(email, password);
  };

  return (
    <AuthForm
      name="sign-in"
      title="Регистрация"
      onSubmit={handleSubmit}
      buttonText="Зарегистрироваться"
      path="/sign-in"
      linkText="Уже зарегистрированы? Войти"
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
            minLength="2"
            maxLength="40"
          />
          <span className="form__input-error edit-email-error" />
        </label>
        <label className="auth__field">
          <input
            type="password"
            placeholder="Пароль"
            className="form__input form__input_auth"
            id="edit-password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
            minLength="2"
            maxLength="40"
          />
          <span className="form__input-error edit-password-error" />
        </label>
      </fieldset>
    </AuthForm>
  );
};

export default Register;
