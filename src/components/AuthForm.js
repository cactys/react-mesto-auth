import { Link } from 'react-router-dom';

const AuthForm = ({
  name,
  onSubmit,
  title,
  children,
  buttonText,
  path,
  linkText,
}) => {
  return (
    <div className="auth">
      <form className="form form__auth" onSubmit={onSubmit}>
        <h2 className="form__title-auth">{title}</h2>
        {children}
        <button type="submit" className="form__submit-auth">
          {buttonText}
        </button>
        {
          <div className={`form__${name}`}>
            <Link className="form__link" to={path}>
              {linkText}
            </Link>
          </div>
        }
      </form>
    </div>
  );
};

export default AuthForm;
