export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isLoad,
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
          onSubmit={onSubmit}
        >
          <h2
            className={`popup__title ${
              name === "delete-card" ? "popup__title_delete-card" : ""
            }`}
          >
            {title}
          </h2>
          {children}
          <button type="submit" className="popup__submit-button">
            {isLoad ? "Сохранение..." : titleButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
