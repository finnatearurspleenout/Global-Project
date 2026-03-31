import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Header = ({modalType, setModalType, cart = [], products = []}) => {
    // search
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setUser(session?.user ?? null);
        });
        const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            if (event === 'SIGNED_IN') setModalType(null);
        });

        return () => subscription.unsubscribe();
    }, [setModalType]);

    const searchResults = useMemo(() =>{
        if(!searchQuery.trim()) return [];
        return products
            .filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0,4);
    },[searchQuery, products])

    const handleSelectProduct =(id)=> {
        setSearchQuery('');
        navigate(`/product/${id}`);
    };

    const handleSearchSubmit =(e)=> {
        if(e) e.preventDefault();
        if(searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
            setSearchQuery('');
        }
    };

    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    return (
        <header className="sticky-top" 
        style={{zIndex: 1050}}>
            <div className="container-fluid border-bottom"
            style={{backgroundColor: '#221f1f'}}>
                <div className="container d-flex justify-content-between align-items-center gap-4 p-3">
                    <div className="logo flex-shrink-0">
                        <Link to="/">
                            <img src="/myLogo.png" alt="logo" style={{width: '200px'}}/>
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
                        <div className="position-relative flex-grow-1 mx-3">
                            <div className="input-group">
                                <input
                                type="text"
                                className="form-control border-end-0"
                                placeholder="Я шукаю..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter'&& handleSearchSubmit()}
                                />
                                <button
                                className="btn d-flex align-items-center px-3 text-white"
                                style={{backgroundColor: '#00a046', border: 'none'}}
                                type="button"
                                onClick={handleSearchSubmit}
                                >
                                    Знайти
                                </button>
                            </div>
                            {searchResults.length > 0 && (
                                <div className="position-absolute w-100 bg-white border rounded shadow-lg mt-1" 
                                style={{zIndex: 2000, overflow: 'hidden'}}>
                                    {searchResults.map(item => (
                                        <div
                                        key={item.id}
                                        className="d-flex align-items-center p-2 border-bottom hover-bg-light"
                                        style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                                        onClick={() => handleSelectProduct(item.id)}
                                        // ховер
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                        >
                                            <img src={`/products/${item.image_url}`} alt="" 
                                            style={{width: '40px', height: '40px', objectFit: 'contain'}} className="me-3" />
                                            <div>
                                                <div className="text-dark small fw-bold text-truncate" 
                                                style={{maxWidth: '300px'}}>
                                                    {item.name}
                                                </div>
                                                <div className="text-danger small fw-bold">
                                                    {item.price} ₴
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='d-flex gap-2 flex-shrink-0 align-items-center'>
                        {user ? (
                            <Link to="/profile" className="btn border-0 p-1 d-flex align-items-center justify-content-center"
                            style={{border: '2px solid #00a046 !important', borderRadius: '50%', width: '42px',  height: '42px', overflow: 'hidden'}}>                                                                   
                                <i className="bi bi-person-fill text-success fs-3"></i>
                            </Link>
                        ) : (
                            <button onClick={() => setModalType('login')} 
                            className="btn d-flex align-items-center justify-content-center border-0 text-white fs-4 p-2">
                                <i className="bi bi-person"></i>
                            </button>
                        )}
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