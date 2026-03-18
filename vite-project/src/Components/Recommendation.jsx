import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

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
                            <div className="card h-100 border-0 border-end rounded-0 p-2 product-card">
                                <div className="position-relative text-center">
                                    <img src={`/products/${p.image_url}`} 
                                    className="img-fluid" alt="" 
                                    style={{height: '140px', objectFit: 'contain'}} 
                                    />
                                    <i 
                                    className={`bi ${isFav?'bi-heart-fill text-danger':'bi-heart text-muted'} position-absolute top-0 end-0 fs-5`} 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => toggleFavorite(p)}
                                    ></i>
                                </div>
                                <div className="card-body px-1 py-2">
                                    <p className="card-text mb-1 small text-dark" style={{height: '40px', overflow: 'hidden'}}>
                                        {p.name}
                                    </p>
                                    <div className="text-muted small text-decoration-line-through">
                                        {p.old_price} ₴
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="fw-bold text-danger fs-5">
                                            {p.price} ₴
                                        </span>
                                        <div onClick={() => addToCart(p)} style={{cursor: 'pointer'}}>
                                            {inCart ? (
                                                <i className="bi bi-check-circle-fill text-primary fs-4"></i>
                                            ) : (
                                                <i className="bi bi-cart3 text-success fs-4"></i>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-2 text-success" style={{fontSize: '10px'}}>
                                        <i className="bi bi-truck me-1"></i> 
                                        Безкоштовна доставка
                                    </div>   
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