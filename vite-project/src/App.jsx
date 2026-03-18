import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './Components/Header';
import BestProduct from './Components/BestProduct';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AsideComponent from './Components/AsideComponent';
import Recommendation from './Components/Recommendation';
import BestForYou from './Components/BestForYou';
import AboutUs from './Components/AboutUs';
import Footer from './Components/Footer';
import CatalogModal from './Components/CatalogModal';
import AuthCartModal from './Components/AuthCartModal';

function App() {
  const [modalType, setModalType] = useState(null);
  // const openHeaderModal =(type) => setModalType(type);
  const closeHeaderModal =()=> setModalType(null);

  const [bestDeals, setBestDeals] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === product.id);
      if (exists) {
        return prevCart.filter(item => item.id !== product.id);
      }
      return [...prevCart, product];
    });
  };

  const toggleFavorite = (product) => {
    setFavorites((prevFavs) => {
          const isFav = prevFavs.some(fav => fav.id === product.id);
          if (isFav) {
              return prevFavs.filter(fav => fav.id !== product.id);
          }
          return [...prevFavs, product];
      });
  };

  useEffect(() => {
    const getProducts = async () => {
      const {data: best} = await supabase
        .from('products')
        .select('*')
        .eq('tag', 'best_deal');

      const {data: rec} = await supabase
        .from('products')
        .select('*')
        .eq('tag', 'recommended');

      if (best) setBestDeals(best);
      if (rec) setRecommended(rec);
    };
    getProducts();
  }, []);

  return (
    <>
      <Router>
        <Header setModalType={setModalType} modalType={modalType}/>
        {modalType === 'catalog' && (
            <CatalogModal type={modalType} onClose={closeHeaderModal} />
        )}

        {(modalType === 'login' || modalType === 'register' || modalType === 'cart') && (
            <AuthCartModal 
            type={modalType} 
            onClose={closeHeaderModal}
            cart={cart} 
            favorites={favorites}
            setCart={setCart}
            />
        )}

        <div className="container mt-1">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <AsideComponent onLoginClick={() => setModalType('login')}/>
            </div>
            <div className="col-lg-9">
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
            </div>
          </div>
        </div>
        <AboutUs />
        <Footer />
      </Router>
      
    </>
  )
}

export default App
