import { useEffect, useState } from "react";
import PopupWithForm from "../popup_with_form/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, isLoad, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoad={isLoad}
    >
      <label className="popup__field">
        <input
          id="place-input"
          name="name"
          className="popup__input popup__input_type_place-name"
          type="text"
          placeholder="Название"
          required
          minLength={2}
          maxLength={30}
          value={name}
          onChange={handleNameChange}
        />
        <span className="place-input-error popup__error popup__error_top" />
      </label>
      <label className="popup__field">
        <input
          id="link-input"
          name="link"
          className="popup__input popup__input_type_link"
          type="url"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleLinkChange}
          required
        />
        <span className="link-input-error popup__error popup__error_bottom" />
      </label>
    </PopupWithForm>
  );
}
