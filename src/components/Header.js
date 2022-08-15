import { Link, Route, Switch } from 'react-router-dom';

const Header = ({ loggedOut, email }) => {
  return (
    <header className="header">
      <div className="header__logo" />

      <Switch>
        <Route path="/sign-in">
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/main">
          <div className="header__container">
            <p className="header__email">{email}</p>
            <Link className="header__logout" to="/sign-in" onClick={loggedOut}>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
