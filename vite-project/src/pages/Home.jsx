import React from 'react';
import BestProduct from '../Components/BestProduct';
import Recommendation from '../Components/Recommendation';
import BestForYou from '../Components/BestForYou';
import AboutUs from '../Components/AboutUs';

const Home = ({recommended, bestDeals, cart, setCart, addToCart, toggleFavorite, favorites}) => {
  return (
    <>
      <BestProduct />
      <Recommendation 
      products={recommended}
      cart={cart} 
      setCart={setCart}
      addToCart={addToCart} 
      toggleFavorite={toggleFavorite}
      favorites={favorites}
      />
      <BestForYou 
      products={bestDeals}
      addToCart={addToCart} 
      toggleFavorite={toggleFavorite}
      favorites={favorites}
      cart={cart}
      />
      {/* <AboutUs /> */}
    </>
  );
};

export default Home;