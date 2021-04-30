import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApiCocktails } from '../redux/actions';
import '../Styles/FoodCards.css';

class CocktailCards extends React.Component {
  constructor(props) {
    super(props);
    this.callCocktail = this.callCocktail.bind(this);
  }

  componentDidMount() {
    this.callCocktail();
  }

  async callCocktail() {
    const { getCocktails } = this.props;
    await getCocktails();
  }

  createCards() {
    const { cocktails } = this.props;
    const maxItens = 11;
    return cocktails.map(
      (cocktail, index) => (index <= maxItens
      && (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ cocktail.strDrinkThumb }
            alt="cocktails"
            data-testid={ `${index}-card-img` }
            className="foodCards"
          />
          <p data-testid={ `${index}-card-name` }>{cocktail.strDrink}</p>
        </div>)
      ),
    );
  }

  render() {
    const { cocktails } = this.props;
    if (cocktails === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (!cocktails) return <div>Loading...</div>;
    return (
      <div className="cardContainer">
        { this.createCards() }
      </div>
    );
  }
}

CocktailCards.propTypes = {
  cocktails: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  getCocktails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cocktails: state.cocktails.cocktails,
});

const mapDispatchToProps = (dispatch) => (
  { getCocktails: () => dispatch(requestApiCocktails()) }
);

export default connect(mapStateToProps, mapDispatchToProps)(CocktailCards);
