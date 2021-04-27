import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import getRandom from '../services/randomFetch';

function ExploreDrink() {
  const [randomNumber, setRandom] = useState('');
  const [isRedirect, setRedirect] = useState(false);
  const onclick = () => {
    setRedirect(true);
  };

  useEffect(() => {
    const randomFetch = async () => {
      const randomSetup = await getRandom('random', 'Drinks');
      console.log(randomSetup.drinks[0].idDrink);
      setRandom(randomSetup.drinks[0].idDrink);
    };
    randomFetch();
  }, []);

  if (isRedirect && randomNumber) {
    return <Redirect to={ `/bebidas/${randomNumber}` } />;
  }

  return (
    <div>
      <Link to="/explorar/bebidas/ingredientes">
        <button data-testid="explore-by-ingredient" type="button">
          Por Ingredientes
        </button>
      </Link>
      <button data-testid="explore-surprise" type="button" onClick={ onclick }>
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrink;
