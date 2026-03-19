import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';

const Recommendation = ({ products = [], cart = [], favorites = [], addToCart, toggleFavorite }) => {
    return (
        <div className="product-slider-container mt-5 px-2">
            <h2 className="fs-5 fw-bold mb-3">
                Рекомендації на основі ваших переглядів
            </h2>
            <Swiper
                modules={[Navigation, Scrollbar]}
                spaceBetween={10}
                slidesPerView={2}
                navigation={true}
                scrollbar={{ draggable: true, dragSize: 50 }}
                breakpoints={{
                    640: {slidesPerView: 3},
                    1024: {slidesPerView: 4},
                    1200: {slidesPerView: 6}
                }}
                className="pb-4"
            >
                {products.map((p) => {
                    const inCart = cart.some(item => item.id === p.id);
                    const isFav = favorites.some(fav => fav.id === p.id);
                    return (
                        <SwiperSlide key={p.id}>
                            <div className="product-card border-end h-100">
                                <div className="position-relative text-center">
                                    <Link to={`/product/${p.id}`}>
                                        <img 
                                        src={`/products/${p.image_url}`} 
                                        className="img-fluid" 
                                        alt="" 
                                        style={{height:'140px',objectFit:'contain'}} 
                                        />
                                    </Link>
                                    <i 
                                    className={`bi ${isFav?'bi-heart-fill text-danger':'bi-heart text-danger'} position-absolute top-0 end-0 fs-5`} 
                                    style={{cursor:'pointer'}}
                                    onClick={() => toggleFavorite(p)}
                                    ></i>
                                </div>
                                <div className="product-title-container mt-2">
                                    <Link 
                                    to={`/product/${p.id}`} 
                                    className="product-title-text"
                                    >
                                        {p.name}
                                    </Link>
                                </div>
                                <span className="product-old-price">
                                    {p.old_price > 0 ? `${p.old_price} ₴`:''}
                                </span>
                                <div className="product-footer">
                                    <div className="product-price-current text-danger">
                                        {p.price} 
                                        <span className="currency-symbol">
                                            ₴
                                        </span>
                                    </div>
                                    <button 
                                    className="buy-button" 
                                    onClick={() => addToCart(p)}
                                    >
                                        {inCart ? (
                                            <i className="bi bi-check-circle-fill text-success"></i>
                                        ) : (
                                            <i className="bi bi-cart3 text-success"></i>
                                        )}
                                    </button>
                                </div>
                                <div 
                                className="mt-2 text-success" 
                                style={{fontSize:'10px'}}
                                >
                                    <i className="bi bi-truck me-1"></i> 
                                    Безкоштовна доставка
                                </div>   
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default Recommendation;