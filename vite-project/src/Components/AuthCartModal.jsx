import React, { useState, useEffect } from 'react';

const AuthCartModal = ({type, onClose, cart = [], addToCart, setCart, removeFromCart, updateQuantity, favorites = [], setFavorites}) => {
    if (!type || type === 'none') return null;
    const [authMode, setAuthMode] = useState('login');
    const [openServices, setOpenServices] = useState({});
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', 
        password: '', confirmPassword: '', country: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (type === 'login' || type === 'register') {
            setAuthMode(type);
        }
        setFormData({firstName: '', lastName: '', email: '', password: '', confirmPassword: '', country: ''});
        setErrors({});
    }, [type]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: ''});
    };

    const toggleServices = (id) => {
        setOpenServices(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleLogin = () => {
        const loginErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            loginErrors.email = 'Введіть коректну пошту';
        }

        if (!formData.password) {
        loginErrors.password = 'Введіть пароль';
        } 
        else if (formData.password.length < 9) {
        loginErrors.password = 'Пароль має бути не менше 9 символів';
        }
        if (Object.keys(loginErrors).length > 0) {
            setErrors(loginErrors);
        }
        else {
            console.log('Вхід дозволено', formData.email);
            // виклик апі в майбутньому, щоб не забути
            onClose();
        }
    };
    
    const handleRegister = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*\.\-]+$/;

        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Невірний формат електронної пошти';
        }

        if (formData.password.length < 9) {
            newErrors.password = 'Пароль має бути не менше 9 символів';
        } 
        else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Пароль містить заборонені символи';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Паролі не збігаються';
        }

        if (!formData.firstName) newErrors.firstName = "Введіть ім'я";
        if (!formData.lastName) newErrors.lastName = "Введіть прізвище";
        if (!formData.country) newErrors.country = "Оберіть країну";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } 
        else {
            console.log('Реєстрація успішна', formData);
            onClose();
        }
    };

    return (
        <div className="payment-modal-overlay" onClick={onClose}>
            <div 
            className="payment-modal-content p-4 text-center"
            style={{maxWidth: type === 'cart' || type === 'favorites'?'750px':'420px', maxHeight: '90vh', minHeight: type === 'cart' || type === 'favorites'?'400px':'auto', overflowY:'auto', position:'relative', transition: 'max-width 0.3s ease'}} 
            onClick={e => e.stopPropagation()}
            >
                <button className="btn-close position-absolute top-0 end-0 m-3 shadow-none" onClick={onClose}></button>
                {type === 'login' && (
                    <div className="py-3">
                        <h3 className="fw-bold mb-4">
                            {authMode === 'login' ? 'Вхід' : 'Реєстрація'}
                        </h3>
                        {authMode === 'login' ? (
                            <div className="text-start">
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">
                                        Електронна пошта
                                    </label>
                                    <input 
                                    type="email" name="email"
                                    value={formData.email} 
                                    onChange={handleChange}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}  
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold">
                                        Пароль
                                    </label>
                                    <input 
                                    type="password" name="password"
                                    value={formData.password} 
                                    onChange={handleChange}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}                              
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <button 
                                onClick={handleLogin}
                                className="btn w-100 text-white fw-bold py-2 mb-3" 
                                style={{backgroundColor: '#00a046'}}
                                >
                                    Увійти
                                </button>
                                <div className="mt-3 text-center">
                                    <span className="text-muted small me-2">
                                        Немає акаунту?
                                    </span>
                                    <button 
                                    onClick={() => {
                                        setAuthMode('register');
                                        setErrors({});
                                    }}
                                    className="btn btn-link text-decoration-none p-0 small" 
                                    
                                    >
                                        Зареєструватися
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-start">
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label className="form-label small fw-bold">
                                            Ім'я
                                        </label>
                                        <input 
                                        type="text" name="firstName" 
                                        value={formData.firstName} 
                                        onChange={handleChange} 
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} 
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label small fw-bold">
                                            Прізвище
                                        </label>
                                        <input 
                                        type="text" name="lastName" 
                                        value={formData.lastName} 
                                        onChange={handleChange} 
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} 
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">
                                        Email
                                    </label>
                                    <input 
                                    type="email" name="email" value={formData.email} 
                                    onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">
                                        Країна
                                    </label>
                                    <select 
                                    name="country" 
                                    value={formData.country} 
                                    onChange={handleChange} 
                                    className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">Оберіть країну</option>
                                        <option value="UA">Україна</option>
                                        <option value="PL">Польща</option>
                                        <option value="UK">Велика Британія</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">
                                        Пароль (мін. 9 симв.)
                                    </label>
                                    <input 
                                    type="password" name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold">
                                        Підтвердіть пароль
                                    </label>
                                    <input 
                                    type="password" name="confirmPassword" 
                                    value={formData.confirmPassword} 
                                    onChange={handleChange} 
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} 
                                    />
                                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                </div>
                                <button 
                                onClick={handleRegister} 
                                className="btn w-100 text-white fw-bold py-2 mb-3" 
                                style={{backgroundColor: '#00a046'}}    
                                >
                                    Створити акаунт
                                </button>
                                <div className="text-center mt-2">
                                    <span className="text-muted small me-2">
                                        Вже є аккаунт?
                                    </span>
                                    <button onClick={() => {
                                        setAuthMode('login');
                                        setErrors({});
                                    }} 
                                    className="btn btn-link text-decoration-none p-0 small" 
                                    >
                                        Увійти
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {type === 'cart' && (
                    <div className="py-2">
                        {cart.length > 0 ? (
                            <div className="text-start">
                                {cart.map(item => (
                                    <div key={item.id} className="mb-4 border-bottom pb-4 w-100">
                                        <div className="d-flex align-items-start justify-content-between mb-3">
                                            <div className="d-flex" style={{width: '50%'}}>
                                                <img src={`/products/${item.image_url}`} alt="" 
                                                style={{width: '60px', height: '60px', objectFit: 'contain'}} />
                                                <div className="ms-3 small">
                                                    <div>
                                                        {item.name}
                                                    </div>
                                                    <div className="text-muted mt-1" 
                                                    style={{fontSize: '11px'}}>
                                                        Продавець: <br /> <strong>Electro Shop</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="d-flex align-items-center border rounded bg-white">
                                                    <button className="btn btn-sm px-2 py-1 text-muted border-0 shadow-none" 
                                                    onClick={() => updateQuantity(item.id, -1)} 
                                                    disabled={item.quantity <= 1}>
                                                        −
                                                    </button>

                                                    <input type="text" 
                                                    className="text-center border-0 p-0" 
                                                    value={item.quantity || 1} 
                                                    readOnly style={{width: '35px', fontSize: '14px'}} />

                                                    <button className="btn btn-sm px-2 py-1 text-primary border-0 shadow-none" 
                                                    onClick={() => updateQuantity(item.id, 1)}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="text-end me-3">
                                                    {item.old_price && 
                                                        <div className="text-muted small text-decoration-line-through">
                                                            {item.old_price*(item.quantity || 1)}
                                                                ₴
                                                        </div>
                                                    }
                                                    <div className="text-danger fw-bold fs-5 text-nowrap">
                                                        {item.price*(item.quantity || 1)} ₴                                                         
                                                    </div>
                                                </div>
                                                <button className="btn btn-link text-muted p-0" 
                                                onClick={() => removeFromCart(item.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="ms-5 ps-3">
                                            <div className="text-dark small fw-bold mb-2 d-flex align-items-center" 
                                            style={{cursor: 'pointer'}} 
                                            onClick={() => toggleServices(item.id)}>
                                                <i className={`bi bi-chevron-${openServices[item.id] ? 'up':'down'} me-2 small`}></i> 
                                                Додаткові послуги
                                            </div>
                                            {openServices[item.id] && (
                                                <div className="ps-2">
                                                    <div className="form-check mb-1 d-flex align-items-center">
                                                        <input className="form-check-input me-2 shadow-none" type="checkbox" id={`garant-${item.id}`} />
                                                        <label className="form-check-label small" 
                                                        htmlFor={`garant-${item.id}`}>
                                                            Сервіс "3 роки гарантії"
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center">
                                                        <input className="form-check-input me-2 shadow-none" type="checkbox" id={`protect-${item.id}`} />
                                                        <label className="form-check-label small" 
                                                        htmlFor={`protect-${item.id}`}>
                                                            Захист від пошкоджень
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-4 pt-3 border-top bg-white">
                                    <div className="d-flex justify-content-between flex-column align-items-center gap-3">
                                        <button className="btn btn-outline-secondary fw-bold px-4 py-3 order-2 order-md-1 w-100 w-md-auto" onClick={onClose}>
                                            Продовжити покупки
                                        </button>                              
                                        <div className="d-flex align-items-center rounded overflow-hidden order-1 order-md-2 w-100 w-md-auto" 
                                        style={{backgroundColor: '#eef8f2', border: '1px solid #00a046'}}>
                                            <span className="fs-5 fw-bold text-dark px-3 flex-grow-1 text-center">
                                                {cart.reduce((sum, item) => sum + (Number(item.price)*(item.quantity || 1)), 0)} ₴
                                            </span>
                                            <button className="btn btn-success fw-bold px-4 py-3 border-0 rounded-0">
                                                Оформити замовлення
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center py-4 text-center">
                                <i className="bi bi-cart-x text-muted" 
                                style={{fontSize: '4.5rem', opacity: 0.5}}></i>
                                <h4 className="fw-bold mt-3">
                                    Кошик порожній
                                </h4>
                                <p className="text-muted small mb-4">
                                    Але це ніколи не пізно виправити!
                                </p>
                                <button className="btn text-white px-5 fw-bold" 
                                style={{backgroundColor: '#00a046'}} 
                                onClick={onClose}>
                                    До покупок
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {type === 'favorites' && (
                    <div className="py-2 text-start">
                        <h4 className="fw-bold mb-4">
                            Список бажаного
                        </h4>
                        {favorites.length > 0 ? (
                            <>
                                {favorites.map(item => {
                                    const isInCart = cart.some(c => c.id === item.id);
                                    return (
                                        <div key={item.id} 
                                        className="mb-3 border-bottom pb-3 d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center" 
                                            style={{width: '60%'}}>
                                                <img src={`/products/${item.image_url}`} alt="" 
                                                style={{width: '50px', height: '50px', objectFit: 'contain'}} />
                                                <div className="ms-3">
                                                    <div className="small fw-bold text-truncate" 
                                                    style={{maxWidth: '250px'}}>
                                                        {item.name}
                                                    </div>
                                                    <div className="text-danger fw-bold small">
                                                        {item.price} ₴
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm border-0 shadow-none"
                                                onClick={() => addToCart(item)}>
                                                    <i className={`bi ${isInCart ? 'bi-check-circle-fill text-success':'bi-cart-plus text-success'} fs-4`}></i>
                                                </button>
                                                <button className="btn btn-sm text-muted border-0" 
                                                onClick={() => setFavorites(prev => prev.filter(f => f.id !== item.id))}>
                                                    <i className="bi bi-trash fs-5"></i>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                                <button className="btn btn-outline-secondary w-100 fw-bold mt-3" 
                                onClick={onClose}>
                                    Продовжити перегляд
                                </button>
                            </>
                        ) : 
                            <div className="text-center py-5">
                                <h5>
                                    Список порожній
                                </h5>
                                <button className="btn btn-success mt-3" 
                                onClick={onClose}>
                                    На головну
                                </button>
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthCartModal;