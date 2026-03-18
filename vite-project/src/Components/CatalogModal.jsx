import React from 'react';
import { Link } from 'react-router-dom';

const CatalogModal = ({type, onClose}) => {
    if (type !== 'catalog') return null;

    return (
        <div className="catalog-overlay" onClick={onClose}>
            <div className="catalog-container bg-white shadow-lg" onClick={e => e.stopPropagation()}>
                <div className="container py-4">
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        <div className="col text-start">
                            <h6 className="fw-bold mb-3 d-flex align-items-center">
                                <i className="bi bi-laptop me-2 text-success"></i> 
                                Ноутбуки та комп'ютери
                            </h6>
                            <ul className="list-unstyled small">
                                <li className="mb-2">
                                    <Link to="/laptops" 
                                    onClick={onClose} 
                                    className="catalog-link">Ноутбуки</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/gaming-pc" 
                                    onClick={onClose} 
                                    className="catalog-link">Ігрові комп'ютери</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/monitors" 
                                    onClick={onClose} 
                                    className="catalog-link">Монітори</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/components" 
                                    onClick={onClose}
                                    className="catalog-link">Комплектуючі</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col text-start">
                            <h6 className="fw-bold mb-3 d-flex align-items-center">
                                <i className="bi bi-phone me-2 text-success"></i> 
                                Мобільні пристрої
                            </h6>
                            <ul className="list-unstyled small">
                                <li className="mb-2">
                                    <Link to="/phones" 
                                    onClick={onClose} 
                                    className="catalog-link">Смартфони</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/tablets" 
                                    onClick={onClose} 
                                    className="catalog-link">Планшети</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col text-start">
                            <h6 className="fw-bold mb-3 d-flex align-items-center">
                                <i className="bi bi-controller me-2 text-success"></i> 
                                Товари для геймерів
                            </h6>
                            <ul className="list-unstyled small">
                                <li className="mb-2">
                                    <Link to="/consoles" 
                                    onClick={onClose} 
                                    className="catalog-link">Приставки</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/games" 
                                    onClick={onClose} 
                                    className="catalog-link">Ігри</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CatalogModal;