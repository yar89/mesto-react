import Header from "./header/Header.jsx";
import Main from "./main/Main.jsx";
import Footer from "./footer/Footer.jsx";
import PopupWithForm from "./popup_with_form/PopupWithForm.jsx";
import ImagePopup from "./image_popup/ImagePopup.jsx";
import { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./edit_profile_popup/EditProfilePopup.jsx";
import EditAvatarPopup from "./edit_avatar_popup/EditAvatarPopup.jsx";
import AddPlacePopup from "./add_place_popup/AddPlacePopup.jsx";

function App() {
  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  //стейт контекста
  const [currentUser, setCurrentUser] = useState({});

  //стейты карточки
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState("");

  function handleCardLike(card) {
    
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    if (isLiked) {
      api.deleteLikeCard(card._id)
        .then((res) => {
          setCards(state => state.map((c) => c._id === card._id ? res : c))
        })
        .catch((err) => console.error(`Ошибка ${err}`));
    } else {
      api.putLikeCard(card._id)
        .then((res) => {
          setCards(state => state.map((c) => c._id === card._id ? res : c))
        })
        .catch((err) => console.error(`Ошибка ${err}`));
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopup(false);
    setIsDeletePopupOpen(false);
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

  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId);
    setIsDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
  }

  useEffect(() => {
    Promise.all([api.getUserInfoFromServer(), api.getCardsFromServer()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser);
        setCards(dataCard);
      })
      .catch((err) =>
        console.error(`Ошибка редактирования данных страницы ${err}`)
      );
  }, []);

  function handleUpdateUser(data) {
    setIsLoad(true);
    api
      .setUsersInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setIsLoad(false);
      })
      .catch((err) => console.error(`Ошибка редактирования профиля ${err}`))
      .finally(() => setIsLoad(false));
  }

  function handleUpdateAvatar(link) {
    setIsLoad(true);
    api
      .updateUserAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setIsLoad(false);
      })
      .catch((err) => console.error(`Ошибка редактирования аватара ${err}`))
      .finally(() => setIsLoad(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoad(true);
    api
      .addNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        setIsLoad(false);
      })
      .catch((err) =>
        console.error(`Ошибка при добавлении новой карточки ${err}`)
      )
      .finally(() => setIsLoad(false));
  }

  function handleDeleteCardSubmit(evt) {
    evt.preventDefault();
    setIsLoad(true);
    api
      .deleteCardFromServer(deleteCardId)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
        setIsLoad(false);
      })
      .catch((err) => console.error(`Ошибка при удалении карточки ${err}`))
      .finally(() => setIsLoad(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDelete={handleDeletePopupClick}
          onCardLike={handleCardLike}
          cards={cards}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoad={isLoad}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoad={isLoad}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          titleButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteCardSubmit}
          isLoad={isLoad}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoad={isLoad}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
