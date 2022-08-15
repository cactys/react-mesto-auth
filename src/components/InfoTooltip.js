import React from 'react';
import denied from '../images/denied.svg';
import access from '../images/access.svg';

const InfoTooltip = ({ isOpen, onClose, onInfoTooltip }) => {
  return (
    <div className={`popup popup_type_tooltip ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <img
          className="popup__icon-tooltip"
          src={onInfoTooltip ? access : denied}
          alt="Tooltip"
        />
        <p className="popup__tooltip-text">
          {onInfoTooltip
            ? `Вы успешно зарегистрировались!`
            : `Что-то пошло не так! Попробуйте ещё раз.`}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;
