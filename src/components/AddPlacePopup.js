import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const imageRef = useRef();
  const titleRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({
      title: titleRef.current.value,
      link: imageRef.current.value,
    });
  };

  useEffect(() => {
    titleRef.current.value = '';
    imageRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__set">
        <label className="form__field">
          <input
            type="text"
            placeholder="Название"
            className="form__input form__input_photo-title"
            id="card-name"
            name="title"
            required
            minLength="2"
            maxLength="40"
            ref={titleRef}
          />
          <span className="form__input-error card-name-error"></span>
        </label>
        <label className="form__field">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="form__input form__input_photo-link"
            id="card-link"
            name="link"
            ref={imageRef}
            required
          />
          <span className="form__input-error card-link-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
