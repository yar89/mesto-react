import { useEffect, useRef } from "react";
import PopupWithForm from "../popup_with_form/PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  isLoad,
  onUpdateAvatar,
}) {
  const ref = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoad={isLoad}
    >
      <label className="popup__field">
        <input
          ref={ref}
          id="avatar-input"
          name="avatar"
          className="popup__input popup__input_type_link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          minLength={2}
          maxLength={200}
        />
        <span className="avatar-input-error popup__error popup__error_top" />
      </label>
    </PopupWithForm>
  );
}
