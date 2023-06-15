export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <form
          className="popup__form popup__form_edit-profile"
          name={name}
          method="post"
          noValidate=""
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__submit-button">
            {titleButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
