import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const SearchPage = ({products, addToCart, toggleFavorite, favorites, cart}) => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') ||'';

    const filteredProducts = products.filter(p => {
        const searchTerm = query.toLowerCase();
        const keywords = {
            'комп':'ноутбук ігровий пк',
            'пк':'ігровий пк компютер комплектуючі',
            'ноут':'ноутбук',
            'телефон':'смартфон iphone айфон',
            'самсунг':'samsung',
            'ігри':'ігри приставки playstation xbox',
            'геймінг':'геймінг крісло кермо ігри',
            'вуха':'навушники airpods',
            'айфон':'apple iphone macbook ipad airpods'
        };

        const relatedWords = keywords[searchTerm] || "";
        const productData = `${p.name} ${p.category} ${p.description} ${p.tag ||''}`.toLowerCase();
        const directMatch = productData.includes(searchTerm);

        const keywordMatch = relatedWords.split(' ').some(word => 
            word && productData.includes(word)
        );
        return directMatch || keywordMatch;
    });
    
    return (
        <div className="container mt-4 mb-5">
            <h2 className="fw-bold mb-4">
                Результати пошуку за запитом: 
                <span className="text-success">
                    "{query}"
                </span>
            </h2> 
            {filteredProducts.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="col">
                            <ProductCard 
                            product={product} 
                            addToCart={addToCart} 
                            toggleFavorite={toggleFavorite} 
                            favorites={favorites}
                            cart={cart}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <i className="bi bi-search fs-1 text-muted"></i>
                    <p className="mt-3 fs-5">
                        На жаль, за вашим запитом нічого не знайдено.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;