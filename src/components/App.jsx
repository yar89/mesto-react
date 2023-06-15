import Header from "./header/Header.jsx";
import Main from "./main/Main.jsx";
import Footer from "./footer/Footer.jsx";
import PopupWithForm from "./popup_with_form/PopupWithForm.jsx";
import ImagePopup from "./image_popup/ImagePopup.jsx";
import { useState } from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopup(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
  }

  return (
    <div className="page__container">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__field">
          <input
            id="name-input"
            name="name"
            className="popup__input popup__input_type_profile-name"
            type="text"
            placeholder="Имя пользователя"
            required=""
            minLength={2}
            maxLength={40}
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
            required=""
            minLength={2}
            maxLength={200}
          />
          <span className="profession-input-error popup__error popup__error_bottom" />
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        titleButton="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__field">
          <input
            id="place-input"
            name="name"
            className="popup__input popup__input_type_place-name"
            type="text"
            placeholder="Название"
            required=""
            minLength={2}
            maxLength={30}
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
            required=""
          />
          <span className="link-input-error popup__error popup__error_bottom" />
        </label>
      </PopupWithForm>

      <PopupWithForm name="delete-card" title="Вы уверены?" titleButton="Да" />

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__field">
          <input
            id="avatar-input"
            name="avatar"
            className="popup__input popup__input_type_link"
            type="url"
            placeholder="Ссылка на картинку"
            required=""
            minLength={2}
            maxLength={200}
          />
          <span className="avatar-input-error popup__error popup__error_top" />
        </label>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
