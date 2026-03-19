import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Header = ({modalType, setModalType, cart = []}) => {
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    return (
        <header className="sticky-top" 
        style={{zIndex: 1050}}>
            <div className="container-fluid border-bottom"
            style={{backgroundColor: '#221f1f'}}>
                <div className="container d-flex justify-content-between align-items-center gap-4 p-3">
                    <div className="logo flex-shrink-0">
                        <Link to="/">
                            <img src="./myLogo.png" alt="logo" style={{width: '200px'}}/>
                        </Link>
                    </div>
                    <div className="d-flex flex-grow-1 align-items-center gap-3">
                        <div className="position-relative">
                            <button 
                            onClick={() => setModalType(modalType === 'catalog' ? null : 'catalog')}
                            className="btn d-flex align-items-center px-3 gap-3 text-white border border-white" 
                            style={{borderRadius: '12px', backgroundColor: '#221f1f', fontSize: '1rem', fontWeight: '500', height: '40px'}}
                            >
                                <i className={`bi ${modalType === 'catalog'?'bi-x-lg' : 'bi-grid-fill'}`}></i>
                                <span className="fw-bold">Каталог</span>
                            </button>
                        </div>
                        <div className="input-group flex-grow-1 mx-3">
                            <input type="text" className="form-control border-end-0" placeholder="Я шукаю..." />
                            <button className="btn d-flex align-items-center px-3 text-white" 
                            style={{backgroundColor: '#00a046', border: 'none'}} type="button">
                                Знайти
                            </button>
                        </div>
                    </div>
                    <div className='d-flex gap-2 flex-shrink-0 align-items-center'>
                        <button onClick={() => setModalType('login')} 
                        className="btn d-flex align-items-center justify-content-center border-0 text-white fs-4 p-2">
                            <i className="bi bi-person"></i>
                        </button>
                        <button onClick={() => setModalType('cart')}
                        className="btn d-flex align-items-center justify-content-center text-white p-2 position-relative"
                        style={{backgroundColor: '#00a046', borderRadius: '8px', width: '45px', height: '40px'}}>
                            <i className="bi bi-cart fs-5"></i>
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-secondary"
                                style={{fontSize: '0.65rem'}}>
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;