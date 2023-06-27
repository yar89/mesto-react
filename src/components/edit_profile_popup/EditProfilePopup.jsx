import { useContext, useEffect, useState } from "react";
import PopupWithForm from "../popup_with_form/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  isLoad,
  onUpdateUser,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      profession: description,
    });
  }

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoad={isLoad}
    >
      <label className="popup__field">
        <input
          id="name-input"
          name="name"
          className="popup__input popup__input_type_profile-name"
          type="text"
          placeholder="Имя пользователя"
          required
          minLength={2}
          maxLength={40}
          value={name}
          onChange={handleNameChange}
        />
        <span className="name-input-error popup__error popup__error_top" />
      </label>
      <label className="popup__field">
        <input
          id="profession-input"
          name="profession"
          className="popup__input popup__input_type_profile-profession"
          type="text"
          placeholder="Профессия"
          required
          minLength={2}
          maxLength={200}
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="profession-input-error popup__error popup__error_bottom" />
      </label>
    </PopupWithForm>
  );
}
