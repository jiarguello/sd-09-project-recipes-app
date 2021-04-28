import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import iconProfile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header(props) {
  const history = useHistory();
  const { setTitle, setShowSearchBar, showSearchBar } = useContext(RecipesContext);
  const { showSearchButton, title } = props;

  const handleClick = () => {
    history.push('/perfil');
    setTitle('Perfil');
  };

  return (
    <header className="header">
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ handleClick }
        src={ iconProfile }
      >
        <img src={ iconProfile } alt="icon-profile" />
      </button>
      <h1 data-testid="page-title">{ title }</h1>
      { showSearchButton ? (
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ () => setShowSearchBar(!showSearchBar) }
          src={ searchIcon }
        >
          <img src={ searchIcon } alt="icon-search" />
        </button>
      ) : null }
    </header>
  );
}

Header.propTypes = {
  showSearchButton: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
