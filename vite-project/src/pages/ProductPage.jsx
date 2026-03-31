
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useEffect, useMemo } from 'react';

const ProductPage = ({products, addToCart, toggleFavorite, favorites, cart}) => {
    const {productId} = useParams();
    const navigate = useNavigate();
    const product = products.find(p => String(p.id) === String(productId));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    useEffect(() => {
        if (product) {
            const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
            const updated = [product, ...viewed.filter(p => p.id !== product.id)].slice(0, 4);
            localStorage.setItem('recentlyViewed', JSON.stringify(updated));
        }
    }, [product]);

    const similarProducts = useMemo(() => {
        if (!product) return [];
        return products
        .filter(p => p.category === product.category && p.id !== product.id)
        .sort(() => Math.random()-0.5)
        .slice(0, 4);
    }, [productId, products, product?.category]);

    if(!product) {
        return <div className="container mt-5 text-center py-5">Товар не знайдено</div>;
    }

    const isFavorite = favorites.some(fav=> fav.id === product.id);

    return (

        <div className="container mt-4 mb-5">
            <button 
            className="btn btn-outline-secondary mb-4 border-0" 
            onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left"></i> 
                    Назад
            </button>
            <div className="row mb-5">
                <div className="col-md-6 text-center">
                <img 
                src={`/products/${product.image_url}`} 
                alt={product.name} 
                className="img-fluid rounded shadow-sm"
                style={{maxHeight: '450px', objectFit: 'contain'}}
                />
                </div>
                <div className="col-md-6">
                    <h1 className="fw-bold fs-2">
                        {product.name}
                    </h1>
                    <span className="badge bg-success mb-3">
                        {product.category}
                    </span>
                    <div className="my-4">
                        {product.old_price && (
                            <p className="text-decoration-line-through text-muted mb-0">
                                {product.old_price} ₴
                            </p>
                        )}
                        <h2 className="fw-bold text-danger">
                            {product.price} ₴
                        </h2>
                    </div>
                    <div className="d-flex gap-2 mt-4">
                        <button 
                        className="btn btn-success btn-lg px-5 flex-grow-1" 
                        onClick={() => addToCart(product)}>
                            <i className="bi bi-cart-fill me-2"></i> 
                                Додати в кошик
                        </button>
                        <button 
                        className={`btn btn-outline-danger btn-lg ${isFavorite ? 'active':''}`}
                        onClick={() => toggleFavorite(product)}
                        >
                        <i className={`bi ${isFavorite ? 'bi-heart-fill':'bi-heart'}`}></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-5 border-top pt-4">
                <h4 className="fw-bold mb-3">
                    Опис та характеристики
                </h4>
                <p className="text-muted" 
                style={{whiteSpace: 'pre-line', fontSize: '1.1rem', lineHeight: '1.6'}}>
                    {product.description || "Детальний опис цього товару зараз оновлюється. Зверніться до підтримки для уточнення деталей."}
                </p>
            </div>
            {similarProducts.length > 0 && (
                <div className="mt-5 pt-5 border-top">
                    <h3 className="fw-bold mb-4">
                        Схожі товари
                    </h3>
                    <div className="row row-cols-2 row-cols-md-4 g-3">
                        {similarProducts.map(item => (
                            <div key={item.id} className="col">
                                <ProductCard 
                                product={item}
                                addToCart={addToCart}
                                toggleFavorite={toggleFavorite}
                                favorites={favorites}
                                cart={cart}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;