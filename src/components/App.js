import { useState, useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Main from './Main';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState({});
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleRegister = (email, password) => {
    auth
      .signUp(email, password)
      .then(() => {
        setIsTooltipPopupOpen(true);
        setInfoTooltip(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true);
        setInfoTooltip(false);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .signIn(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setData({
            password: password,
            email: email,
          });
          setIsLogin(true);
          history.replace({ pathname: '/main' });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true);
        setInfoTooltip(false);
      });
  };

  const signOut = () => {
    localStorage.removeItem('jwt');
    setData({
      email: '',
      password: '',
    });
    setIsLogin(false);
    history.push('/sign-in');
  };

  useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth
          .getContent(jwt)
          .then((res) => {
            if (res && res.data.email) {
              setData({
                email: res.data.email,
              });
              setIsLogin(true);
              history.push('/main');
            } else {
              history.push('/sign-in');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    tokenCheck();
    api
      .getUser()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, [history, isLogin]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (selectedCard) => {
    setIsOpen(true);
    setSelectedCard(selectedCard);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsOpen(false);
    setIsTooltipPopupOpen(false);
  };

  const handleUpdateUser = (data) => {
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data) => {
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={isLogin} signOut={signOut} email={data.email} />
          <Switch>
            <ProtectedRoute
              path="/main"
              loggedIn={isLogin}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
            />
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>
            <Route>
              {!isLogin ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} isOpen={isOpen} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            onInfoTooltip={infoTooltip}
          />
        </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
