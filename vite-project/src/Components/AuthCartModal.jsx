import React, { useState, useEffect } from 'react';

const AuthCartModal = ({type, onClose, cart = [], setCart}) => {
    if (!type) return null;
    const [authMode, setAuthMode] = useState('login');
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

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
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
            style={{maxWidth: '420px', maxHeight: '90vh', overflowY:'auto', position:'relative'}} 
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
                    <div className="py-4">
                        {cart.length > 0 ? (
                            <div className="text-start">
                                {cart.map(item => (
                                    <div key={item.id} className="d-flex align-items-center mb-3 border-bottom pb-2">
                                        <img src={`/products/${item.image_url}`} alt="" 
                                        style={{width: '60px', height: '60px', objectFit: 'contain'}} />
                                        <div className="ms-3 flex-grow-1">
                                            <div className="small fw-bold">
                                                {item.name}
                                            </div>
                                            <div className="text-danger fw-bold">
                                                {item.price} ₴
                                            </div>
                                        </div>
                                        <button 
                                        className="btn btn-sm text-muted" 
                                        onClick={() => removeFromCart(item.id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                ))}
                                <div className="mt-4 d-flex justify-content-between align-items-center">
                                    <span className="fw-bold">
                                        Разом:
                                    </span>
                                    <span className="fs-4 fw-bold text-danger">
                                        {cart.reduce((sum, item) => sum + Number(item.price), 0)} ₴
                                    </span>
                                </div>
                                <button className="btn btn-success w-100 mt-3 fw-bold py-2">
                                    Оформити замовлення
                                </button>
                            </div>
                        ) : (
                            <div className="py-4">
                                <i className="bi bi-cart-x text-muted" 
                                style={{fontSize: '4.5rem'}}></i>
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
            </div>
        </div>
    );
};

export default AuthCartModal;