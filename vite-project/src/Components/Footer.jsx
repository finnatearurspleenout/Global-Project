import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PaymentModal from './PaymentModal';

const Footer = () => {
    const [modalConfig, setModalConfig] = useState({isOpen: false, type: ''});

    const openModal = (type, e) => {
        e.preventDefault();
        setModalConfig({isOpen: true, type});
    };

    const closeModal = () => setModalConfig({isOpen: false, type: ''});

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer border-top mt-5 pt-4 pb-5"
        style={{backgroundColor: '#f5f5f5'}}>
            <div className="container">
                <div className="row mb-4">
                    <div className="col-md-3">
                        <h5 className="fs-6 fw-bold mb-3">
                            Інформація про компанію
                        </h5>
                        <ul className="list-unstyled small">
                            <li className="mb-2">
                                <Link to="/about" className="text-decoration-none text-muted">Про нас</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/terms" className="text-decoration-none text-muted">Умови використання</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5 className="fs-6 fw-bold mb-3">
                            Допомога
                        </h5>
                        <ul className="list-unstyled small">
                            <li className="mb-2">
                                <Link to="/delivery" className="text-decoration-none text-muted">Доставка та оплата</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contacts" className="text-decoration-none text-muted">Контакти</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5 className="fs-6 fw-bold mb-3">
                            Сервіси
                        </h5>
                        <ul className="list-unstyled small">
                            <li className="mb-2">
                                <Link to="/warranty" className="text-decoration-none text-muted">Гарантія</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 d-flex flex-column align-items-end justify-content-start">
                        <div className="d-flex gap-3">
                            <a href="/" onClick={(e) => openModal('visa', e)}>
                                <img src="/visa-logo.svg" alt="Visa" height="18" />
                            </a>
                            <a href="/" onClick={(e) => openModal('mastercard', e)}>
                                <img src="/mastercard-logo.svg" alt="Mastercard" height="22" />
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="opacity-25" />
                <div className="text-center text-muted pt-2" style={{fontSize: '12px'}}>
                    © 2015–{currentYear} Інтернет-магазин «Electro Shop»
                </div>
            </div>
            <PaymentModal 
                isOpen={modalConfig.isOpen} 
                type={modalConfig.type} 
                onClose={closeModal} 
            />
        </footer>
    );
};

export default Footer;