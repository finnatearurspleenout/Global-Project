import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './Components/Header';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import AsideComponent from './Components/AsideComponent';
import AboutUs from './Components/AboutUs';
import Footer from './Components/Footer';
import CatalogModal from './Components/CatalogModal';
import AuthCartModal from './Components/AuthCartModal';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import SearchPage from './pages/SearchPage';
import CheckoutPage from './pages/CheckoutPage';
// 
import AboutUsFooter from './pages/FooterPages/AboutUsFooter';
import Contacts from './pages/FooterPages/Contacts';
import Delivery from './pages/FooterPages/Delivery';
import Terms from './pages/FooterPages/Terms';
import Warranty from './pages/FooterPages/Warranty';
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile';

function App() {
  const [modalType, setModalType] = useState(null);
  // const openHeaderModal =(type) => setModalType(type);
  const closeHeaderModal =()=> setModalType(null);

  const [bestDeals, setBestDeals] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

// секція About us (відображається лише на сторінці home)
  const ConditionalAboutUs = () => {
    const location = useLocation();
    if (location.pathname !== '/') return null;
    return <AboutUs />;
  };

// кошик
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved?JSON.parse(saved):[];
  });
  
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === product.id);
      if (exists) {
        return prevCart.filter(item => item.id !== product.id);
      }
      return [...prevCart,{...product, quantity: 1}];
    });
  };
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ?{...item, quantity: newQty} : item
      )
    );
  };

  // сердечко (список улюбленого)
  const toggleFavorite = (product) => {
    setFavorites((prevFavs) => {
          const isFav = prevFavs.some(fav => fav.id === product.id);
          if (isFav) {
              return prevFavs.filter(fav => fav.id !== product.id);
          }
          return [...prevFavs, product];
      });
  };
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved?JSON.parse(saved):[];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // api supabase
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

      const {data: all} = await supabase
        .from('products')
        .select('*')

      if (best) setBestDeals(best);
      if (rec) setRecommended(rec);
      if (all) setAllProducts(all);
    };
    getProducts();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Header 
        setModalType={setModalType} 
        modalType={modalType} 
        cart={cart}
        products={allProducts}
        />
        {modalType === 'catalog' && (
            <CatalogModal type={modalType} onClose={closeHeaderModal} />
        )}

        {(modalType === 'login' || modalType === 'register' || modalType === 'cart' || modalType === 'favorites') && (
            <AuthCartModal 
            type={modalType} 
            onClose={closeHeaderModal}
            favorites={favorites}
            setFavorites={setFavorites}
            cart={cart}
            setCart={setCart}
            addToCart={addToCart} 
            removeFromCart={(id) => setCart(prev => prev.filter(item => item.id !== id))} 
            updateQuantity={updateQuantity}
            />
        )}
        <div className="main-container">
          <div className="container mt-1">
            <div className="row">
              <div className="col-lg-3 d-none d-lg-block">
                <AsideComponent 
                onLoginClick={() => setModalType('login')}
                setModalType={setModalType}
                cartCount={cart.length}
                favCount={favorites.length}
                />
              </div>
              <div className="col-lg-9">
                <Routes>
                  <Route path='/' element={
                    <Home 
                    recommended={recommended} 
                    bestDeals={bestDeals} 
                    cart={cart} 
                    setCart={setCart} 
                    addToCart={addToCart} 
                    toggleFavorite={toggleFavorite} 
                    favorites={favorites}
                    />
                    }
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/category/:categoryId" element={
                    <CategoryPage 
                    products={allProducts}
                    cart={cart} 
                    addToCart={addToCart} 
                    toggleFavorite={toggleFavorite} 
                    favorites={favorites}
                    />
                    } 
                  />
                  <Route path="/product/:productId" element={
                    <ProductPage 
                    products={allProducts} 
                    addToCart={addToCart} 
                    toggleFavorite={toggleFavorite} 
                    favorites={favorites}
                    />
                    } 
                  />
                  <Route path="/search" element={
                    <SearchPage 
                    products={allProducts} 
                    addToCart={addToCart} 
                    toggleFavorite={toggleFavorite} 
                    favorites={favorites}
                    cart={cart}
                    />
                    } 
                  />
                  <Route path="/checkout" element={
                    <CheckoutPage
                      cart={cart}
                      setCart={setCart}
                      updateQuantity={updateQuantity}
                    />} 
                  />
                  {/* footer pages */}
                  <Route path="/about" element={<AboutUsFooter />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/delivery" element={<Delivery />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/warranty" element={<Warranty />} />
                </Routes>   
              </div>
            </div>
          </div>
          <ConditionalAboutUs />
        </div>     
        <Footer />
      </Router>
      
    </>
  )
}

export default App
