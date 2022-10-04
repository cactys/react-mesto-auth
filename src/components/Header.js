import { Link, Route, Switch } from 'react-router-dom';

const Header = ({ loggedOut, email }) => {
  return (
    <header className="header">
      {/* <div className="header__container"> */}
        <div className="header__logo" />
        {/* <div className="header__burger">
          <span className="header__berger-line header__burger-line_1" />
          <span className="header__berger-line header__burger-line_2" />
          <span className="header__berger-line header__burger-line_3" />
        </div>
      </div> */}
      <Switch>
        <Route path="/signin">
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
        </Route>
        <Route path="/signup">
          <Link className="header__link" to="/signin">
            Войти
          </Link>
        </Route>
        <Route path="/main">
          <div className="header__login">
            <p className="header__email">{email}</p>
            <Link className="header__logout" to="/signin" onClick={loggedOut}>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
