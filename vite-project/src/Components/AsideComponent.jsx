import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AsideComponent = ({onLoginClick, setModalType, cartCount = 0, favCount = 0}) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });
        const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="category-list mt-2 pe-3 border-end">
            <Link 
            to="/category/laptops" 
            className="nav-link category-item d-flex align-items-center p-2 rounded"
            >
            <i className="bi bi-laptop me-3 fs-5 icon-default"></i>
                <span>
                    Ноутбуки
                </span>
            </Link>
            <Link 
            to="/category/computers" 
            className="nav-link category-item d-flex align-items-center p-2 rounded mt-1"
            >
            <i className="bi bi-pc-display me-3 fs-5 icon-default"></i>
                <span>
                    Ігрові ПК
                </span>
            </Link>
            <Link 
            to="/category/components" 
            className="nav-link category-item d-flex align-items-center p-2 rounded mt-1"
            >
            <i className="bi bi-cpu me-3 fs-5 icon-default"></i>
                <span>
                    Комплектуючі
                </span>
            </Link>
            <Link 
            to="/category/peripherals" 
            className="nav-link category-item d-flex align-items-center p-2 rounded mt-1"
            >
            <i className="bi bi-headphones me-3 fs-5 icon-default"></i>
                <span>
                    Периферія та аксесуари
                </span>
            </Link>
            <hr className="my-3 text-muted" />
            <Link 
            to="/category/sales" 
            className="nav-link category-item d-flex align-items-center p-2 rounded"
            >
            <i className="bi bi-percent me-3 fs-5"></i>
                <span>
                    Акції та знижки
                </span>
            </Link>
            <hr className="my-3 text-muted" />
            {!user && (
                <div 
                className="p-3 mt-4 text-center border-0" 
                style={{backgroundColor:'#f5f5f5',borderRadius:'8px'}}
                >
                    <p style={{fontSize:'13px',color:'#212121',lineHeight:'1.4'}} >             
                        Увійдіть, щоб отримувати рекомендації, персональні бонуси і знижки.
                    </p>
                    <button className="btn w-100 fw-bold py-2 mt-2" 
                    style={{backgroundColor:'#00a046',color:'white',borderRadius:'8px',fontSize:'14px'}}
                    onClick={onLoginClick} >    
                        Увійдіть в особистий кабінет
                    </button>
                </div>
            )}
            <div 
            className="nav-link category-item d-flex align-items-center p-2 rounded mt-3"
            style={{cursor:'pointer'}}
            onClick={() => setModalType('cart')}
            >
                <div className="position-relative me-3">
                    <i className="bi bi-cart3 fs-5"></i>
                    {cartCount > 0 && (
                        <span 
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                            style={{fontSize:'10px',padding:'2px 5px'}}
                        >
                            {cartCount}
                        </span>
                    )}
                </div>
                <span>
                    Кошик
                </span>
            </div>
            <div 
            className="nav-link category-item d-flex align-items-center p-2 rounded mt-1"
            style={{cursor:'pointer'}}
            onClick={() => setModalType('favorites')}
            >
                <div className="position-relative me-3">
                    <i className="bi bi-heart fs-5"></i>
                    {favCount > 0 && (
                        <span 
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            style={{fontSize:'10px',padding:'2px 5px'}}
                        >
                            {favCount}
                        </span>
                    )}
                </div>
                <span>
                    Список бажаного
                </span>
            </div>
            <hr className="my-3 text-muted" />
        </div>
    );
};

export default AsideComponent;