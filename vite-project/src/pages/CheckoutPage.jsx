import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';

const CheckoutPage = ({cart = [], updateQuantity, setCart}) => {
    const cartTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    const [form, setForm] = useState({name: '', surname: '', phone: '', address: '', payment: 'card'});
    const [errors, setErrors] = useState({name: false, surname: false, phone: false, address: false});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'phone' && !/^[0-9+() \s]*$/.test(value)) return;
        if ((name === 'name' || name === 'surname' || name === 'address') && !/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]*$/.test(value)) return;

        let finalValue = value;
        if ((name === 'name' || name === 'surname' || name === 'address') && value.length > 0) {
            finalValue = value.charAt(0).toUpperCase() + value.slice(1);
        }

        const newForm = {...form, [name]: finalValue};
        setForm(newForm);

        setErrors({
            ...errors,
            name: newForm.name.length > 0 && newForm.name.trim().length < 2,
            surname: newForm.surname.length > 0 && newForm.surname.trim().length < 2,
            phone: newForm.phone.replace(/\D/g, '').length > 0 && newForm.phone.replace(/\D/g, '').length < 10,
            address: newForm.address.length > 0 && newForm.address.trim().length < 3
        });
    };

    const isFormInvalid = 
        form.name.trim().length < 2 || 
        form.surname.trim().length < 2 || 
        form.phone.replace(/\D/g, '').length < 10 || 
        form.address.trim().length < 3;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormInvalid) return;

        const {data: {user}} = await supabase.auth.getUser();

        const orderData = {
            user_id: user?.id || null,
            items: cart,
            total_price: cartTotal,
            status: 'Новий',
            address: form.address,
            phone: form.phone
        };

        const {error} = await supabase.from('orders').insert([orderData]);

        if (!error) {
            setShowSuccess(true);
            if (setCart) setCart([]);
        } 
        else {
            toast.error("Помилка при збереженні замовлення. Спробуйте ще раз.");
        }
    };

    return (
        <div className="container my-5 position-relative">
            {(cart.length === 0 && !showSuccess) ? (
                <div className="text-center py-5">
                    <h3>
                        Кошик порожній
                    </h3>
                    <a href="/" className="btn btn-success mt-3">
                        Повернутися до покупок
                    </a>
                </div>
            ) : (
                <>
                    <h2 className="fw-bold mb-4">
                        Оформлення замовлення
                    </h2>
                    <form className="row g-4" onSubmit={handleSubmit}>
                        <div className="col-lg-8">
                            <div className="bg-light p-4 rounded border">
                                <h5 className="mb-3">
                                    Контактні дані
                                </h5>
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <input type="text" name="name" placeholder="Ім'я" 
                                        className={`form-control ${errors.name ? 'is-invalid' : !form.name ? 'border-warning' : ''}`}
                                        value={form.name} 
                                        onChange={handleChange} 
                                        required 
                                        />
                                        {errors.name && <div className="invalid-feedback">Мінімум 2 символи</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" name="surname" placeholder="Прізвище" 
                                        className={`form-control ${errors.surname ? 'is-invalid' : !form.surname ? 'border-warning' : ''}`}
                                        value={form.surname} 
                                        onChange={handleChange} 
                                        required 
                                        />
                                        {errors.surname && <div className="invalid-feedback">Мінімум 2 символи</div>}
                                    </div>
                                    <div className="col-12">
                                        <input type="tel" name="phone" placeholder="Телефон" 
                                        className={`form-control ${errors.phone ? 'is-invalid' : !form.phone ? 'border-warning' : ''}`}
                                        value={form.phone} 
                                        onChange={handleChange} 
                                        required 
                                        />
                                        {errors.phone && <div className="invalid-feedback">Введіть коректний номер</div>}
                                    </div>
                                </div>
                                <h5 className="mb-3">
                                    Доставка
                                </h5>
                                <div className="position-relative mb-4">
                                    <input type="text" name="address" placeholder="Місто, відділення НП" 
                                    className={`form-control ${errors.address ? 'is-invalid' : !form.address ? 'border-warning' : ''}`}
                                    value={form.address} 
                                    onChange={handleChange} 
                                    required
                                    />
                                    {errors.address && <div className="invalid-feedback" style={{marginTop: '0.25rem'}}>Мінімум 3 символи</div>}
                                </div>
                                <h5 className="mb-3">
                                    Оплата
                                </h5>
                                <select name="payment" className="form-select" onChange={handleChange}>
                                    <option value="card">
                                        Оплата карткою онлайн
                                    </option>
                                    <option value="cash">
                                        Готівкою при отриманні
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="bg-white p-4 rounded border shadow-sm">
                                <h5 className="mb-4">
                                    Ваше замовлення
                                </h5>
                                {cart.map(item => (
                                    <div key={item.id} className="d-flex align-items-center mb-3 pb-3 border-bottom text-dark">
                                        <img 
                                        src={`/products/${item.image_url.replace(' ','_')}`} 
                                        alt={item.name} 
                                        className="rounded me-3" 
                                        style={{width: '50px', height: '50px', objectFit: 'contain'}} 
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0 small fw-bold" 
                                            style={{fontSize: '0.85rem'}}>
                                                {item.name}
                                            </h6>
                                            <div className="text-success small fw-bold">
                                                {item.price} ₴
                                            </div>
                                        </div>                                 
                                        <div className="d-flex align-items-center ms-2">
                                            <button 
                                            type="button" 
                                            className="btn btn-sm btn-light border" 
                                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                            > 
                                                - 
                                            </button>
                                            <span className="mx-2 small fw-bold">{item.quantity || 1}</span>
                                            <button 
                                            type="button" 
                                            className="btn btn-sm btn-light border" 
                                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                            >
                                                + 
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="d-flex justify-content-between my-3">
                                    <h5 className="mb-0">
                                        Разом:
                                    </h5>
                                    <h5 className="fw-bold text-success mb-0">
                                        {cartTotal} ₴
                                    </h5>
                                </div>
                                <button type="submit" className="btn btn-success w-100 fw-bold py-2" disabled={isFormInvalid}>
                                    Підтвердити замовлення
                                </button>
                            </div>
                        </div>
                    </form>
                </>
            )}
            {showSuccess && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
                style={{background: 'rgba(0,0,0,0.6)', zIndex: 1050}}>
                    <div className="bg-white p-5 rounded-4 shadow-lg text-center" style={{maxWidth: '400px'}}>
                        <div className="text-success mb-3">
                            <i className="bi bi-check-circle-fill" style={{fontSize: '4rem'}}></i>
                        </div>
                        <h3 className="fw-bold">
                            Замовлення оформлено!
                        </h3>
                        <p className="text-muted small">
                            Дякуємо! Наш менеджер скоро зв'яжеться з вами.
                        </p>
                        <button className="btn btn-success w-100 py-2 fw-bold" 
                        onClick={() => window.location.href = '/'}>
                            На головну
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;