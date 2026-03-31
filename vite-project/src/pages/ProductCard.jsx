import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({product, addToCart, toggleFavorite, favorites = [], cart = []}) => {
    const isFavorite = favorites.some(fav => fav.id === product.id);
    const isInCart = cart && cart.some(item => item.id === product.id);

    return (
        <div className="col">
            <div className="card h-100 border-0 shadow-sm p-2 product-card position-relative">
                <i 
                className={`bi ${isFavorite ? 'bi-heart-fill text-danger':'bi-heart text-danger'} position-absolute top-0 end-0 m-2 fs-5`} 
                style={{cursor: 'pointer', zIndex: 10}}
                onClick={() => toggleFavorite(product)}
                ></i>
                <Link to={`/product/${product.id}`}>
                    <div className="text-center mb-2" 
                    style={{height: '160px'}}>
                        <img 
                        src={`/products/${product.image_url.replace(' ','_')}`} 
                        className="img-fluid h-100 object-fit-contain" 
                        alt={product.name} 
                        />
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
                            <i 
                            className={`bi ${isInCart ? 'bi-check-circle-fill text-success':'bi-cart3 text-success'} fs-4`} 
                            style={{cursor: 'pointer'}}
                            onClick={() => addToCart(product)}
                            ></i>
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
};

export default ProductCard;