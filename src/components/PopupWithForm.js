const PopupWithForm = ({
  name,
  title,
  buttonText,
  children,
  onClose,
  isOpen,
  onSubmit,
}) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <form
          className="form form_edit-profile"
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          <h2 className="form__title">{title}</h2>
          {children}
          <button type="submit" className="form__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
