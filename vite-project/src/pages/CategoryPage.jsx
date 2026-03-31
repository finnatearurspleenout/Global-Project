import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const categoryMapping = {
    laptops: "Ноутбуки",
    computers: "Ігровий ПК",
    components: "Комплектуючі",
    peripherals: "Периферія",
    gaming: "Геймінг",
    tablets: "Планшети",
    consoles: "Приставки",
    monitors: "Монітори",
    smartphones: "Смартфони",
    games: "Ігри"
};

const categoryDescriptions = {
    laptops: "Вибирайте найкращі ноутбуки для роботи, навчання та найвибагливіших ігор від провідних світових брендів.",
    computers: "Потужні стаціонарні системи, ігрові збірки та робочі станції для будь-яких завдань.",
    components: "Все для апгрейду та збірки ПК: процесори, відеокарти, пам'ять та системи охолодження.",
    peripherals: "Клавіатури, миші, навушники та інші аксесуари для максимального комфорту та продуктивності.",
    smartphones: "Найсучасніші смартфони: від бюджетних моделей до флагманів з найкращими камерами.",
    tablets: "Універсальні планшети для творчості, перегляду контенту та мобільної роботи.",
    monitors: "Монітори з високою роздільною здатністю та частотою оновлення для геймерів та дизайнерів.",
    consoles: "Ігрові консолі нового покоління та портативні приставки для розваг у будь-якому місці.",
    games: "Величезний вибір ігор усіх жанрів: від масштабних RPG до захопливих інді-проєктів."
};

const CategoryPage = ({products, addToCart, toggleFavorite, favorites, cart }) => {
    const {categoryId} = useParams();

    const dbCategory = categoryMapping[categoryId];
  
    const filteredProducts = products.filter(p => p.category === dbCategory);

    return (
    <div className="container-fluid mt-4">
        <h2 className="fs-4 fw-bold mb-4">
            {dbCategory || "Товари"}
        </h2>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                    <ProductCard 
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                    cart={cart}
                    />
                ))
            ) : (
                <div className="col-12 text-center py-5">
                    <p className="text-muted">
                        У категорії {dbCategory} поки немає товарів.
                    </p>
                </div>
            )}
            </div>
            <div className="mt-5 p-4 bg-light rounded mb-5">
                <h4 className="fw-bold mb-3">
                    Про категорію
                </h4>
                <p className="text-muted">
                    {categoryDescriptions[categoryId] || "Опис оновлюється.."}
                </p>
            </div>
        </div>
    );
};

export default CategoryPage;