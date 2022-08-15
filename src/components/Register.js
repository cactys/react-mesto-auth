import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="auth">
      <form className="form form__auth" onSubmit={handleSubmit}>
        <h2 className="form__title-auth">Регистрация</h2>
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
            {console.log(data)}
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
            />
            <span className="form__input-error edit-password-error" />
          </label>
        </fieldset>
        <button type="submit" className="form__submit-auth">
          Зарегистрироваться
        </button>
        <div className="form__sign-in">
          <Link className="form__link" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
