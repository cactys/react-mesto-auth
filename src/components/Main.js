import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__data'>
          <button
            type='button'
            className='profile__avatar-edit'
            onClick={onEditAvatar}
          ></button>
          <img src={currentUser.avatar} alt='Аватар' className='profile__avatar' />
          <div className='profile__profile-info'>
            <h1 className='profile__title'>{currentUser.name}</h1>
            <button
              type='button'
              className='profile__edit-button'
              onClick={onEditProfile}
            />
            <p className='profile__subtitle'>{currentUser.about}</p>
          </div>
        </div>
        <button type='button' className='profile__add-button' onClick={onAddPlace} />
      </section>

      <div className='grid'>
        <ul className='cards'>
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Main;
