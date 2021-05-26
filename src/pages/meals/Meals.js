import React, { useContext, useEffect } from 'react';
import { Header, Categories, Main, Footer, Loading } from '../../components';
import { Context } from '../../context';
import { fecthByName } from '../../services/api';

function Meals() {
  const { data, updateData } = useContext(Context);

  useEffect(() => {
    if (!data.meals) { updateData(fecthByName('', true)); }
  }, [data, updateData]);

  if (!data) return <Loading />;

  return (
    <section>
      <Header title="Comidas" search />
      <Categories />
      <Main recipes={ data.meals } />
      <Footer />
    </section>
  );
}

export default Meals;
