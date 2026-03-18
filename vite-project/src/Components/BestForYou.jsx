import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BestForYou({products = [], addToCart, toggleFavorite, favorites = [], cart = []}) {
    const [visibility, setVisibility] = useState(6);
    const [isClosing, setIsClosing] = useState(false);
    
    function loadMore() {
        if (visibility < products.length) {
            setVisibility(prevValue => prevValue + 6);
        } 
        else {
            setIsClosing(true);
            setTimeout(() => {
                const titleElement = document.getElementById('best-for-you-title');
                if (titleElement) {
                    window.scrollTo({
                        top: titleElement.offsetTop - 100, 
                        behavior: 'smooth' 
                    });
                }
            }, 100);
            setTimeout(() => {
                setVisibility(6); 
                setIsClosing(false);
            }, 900);
        }
    }
    const displayedProducts = products.slice(0, visibility);

    return (
        <div className="container-fluid mt-4">
            <h2 id="best-for-you-title" className="fs-4 fw-bold mb-4">
                Найкращі пропозиції для вас
            </h2>
            <div className={`products-collapse ${isClosing?'closing':'open'}`}>
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
                    {displayedProducts.map((product) => {
                        const isFavorite = favorites.some(fav => fav.id === product.id);
                        const isInCart = cart && cart.some(item => item.id === product.id);

                        return (
                            <div className="col" key={product.id}>
                                <div className="card h-100 border-0 shadow-sm p-2 product-card position-relative">
                                    <i 
                                    className={`bi ${isFavorite ? 'bi-heart-fill text-danger':'bi-heart'} position-absolute top-0 end-0 m-2 fs-5`} 
                                    style={{cursor: 'pointer', zIndex: 10}}
                                    onClick={() => toggleFavorite(product)}
                                    >
                                    </i>
                                    <Link to={`/product/${product.id}`}>
                                        <div className="text-center mb-2" 
                                        style={{height: '160px'}}>
                                            <img src={`/products/${product.image_url}`} className="img-fluid h-100 object-fit-contain" alt={product.title} />
                                        </div>
                                    </Link>
                                    <div className="card-body p-1 d-flex flex-column">
                                        <div className="product-title-container mb-2">
                                            <Link to={`/product/${product.id}`} className="nav-link p-0">
                                                <span className="product-title-text text-dark">
                                                    {product.name}
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="mt-auto">
                                            {product.old_price && (
                                                <div className="text-muted small text-decoration-line-through">
                                                    {product.old_price} ₴
                                                </div>
                                            )}
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fw-bold text-danger fs-5">
                                                    {product.price} ₴
                                                </span>
                                                <i className={`bi ${isInCart?'bi-check-circle-fill text-primary':'bi-cart3 text-success'} fs-4`} 
                                                style={{cursor: 'pointer'}}
                                                onClick={() => addToCart(product)}></i>
                                            </div>
                                            <div className="mt-2 text-success" 
                                            style={{fontSize: '10px'}}>
                                            <i className="bi bi-truck me-1"></i> 
                                                Безкоштовна доставка
                                            </div>                                       
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="text-center mt-4 pb-5">
                <button 
                className={`btn ${visibility < products.length?'btn-success':'btn-outline-success'} px-5 fw-bold`}
                onClick={loadMore}>
                    {visibility < products.length ?'Показати ще':'Згорнути все'}
                </button>
            </div>  
        </div>
    )
}


export default BestForYou;