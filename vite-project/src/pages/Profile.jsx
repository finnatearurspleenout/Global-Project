import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('data');
    
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ firstName: '', lastName: '' });
    
    const [recentItems, setRecentItems] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                navigate('/');
                return;
            }

            setUser(user);
            
            setEditForm({
                firstName: user.user_metadata?.first_name || '',
                lastName: user.user_metadata?.last_name || ''
            });

            const { data: ordersData, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (!error) setOrders(ordersData);

            const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
            setRecentItems(viewed);

            setLoading(false);
        };

        fetchAllData();
    }, [navigate]);

    const handleUpdateProfile = async () => {
        if (!editForm.firstName.trim() || !editForm.lastName.trim()) {
            toast.error("Будь ласка, заповніть ім'я та прізвище");
            return;
        }

        const { error } = await supabase.auth.updateUser({
            data: { 
                first_name: editForm.firstName, 
                last_name: editForm.lastName 
            }
        });

        if (error) {
            toast.error("Помилка оновлення: " + error.message);
        } else {
            toast.success("Дані успішно збережено!");
            setIsEditing(false);
            
            setUser(prev => ({
                ...prev,
                user_metadata: {
                    ...prev.user_metadata,
                    first_name: editForm.firstName,
                    last_name: editForm.lastName
                }
            }));
        }
    };

    const handleResetPassword = async () => {
        const loadingToast = toast.loading("Відправляємо лист...");

        const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
            redirectTo: window.location.origin + '/profile',
        });

        toast.dismiss(loadingToast);

        if (error) {
            toast.error("Помилка: " + error.message);
        } else {
            toast.success("Інструкції надіслано на вашу пошту!");
        }

    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '80vh'}}>
            <div className="spinner-border text-success" role="status"></div>
        </div>
    );

    return (
        <div className="container py-5" style={{minHeight: '100vh'}}>
            <div className="row mt-4">
                <div className="col-md-3 mb-4">
                    <div className="card border-0 shadow-sm p-4 rounded-4">
                        <div className="text-center mb-4">
                            <div className="bg-success text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" 
                            style={{width: '70px', height: '70px', fontSize: '28px'}}>
                                {user?.user_metadata?.first_name?.[0] || 'U'}
                            </div>
                            <h5 className="fw-bold mb-0">
                                {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                            </h5>
                            <small className="text-muted text-break">
                                {user?.email}
                            </small>
                        </div>   
                        <div className="list-group list-group-flush">
                            <button 
                            onClick={() => setActiveTab('data')}
                            className={`list-group-item list-group-item-action border-0 py-2 rounded-3 mb-1 ${activeTab === 'data' ? 'active bg-success text-white' : ''}`}
                            >
                                <i className="bi bi-person me-2"></i> Особисті дані
                            </button>
                            <button 
                            onClick={() => setActiveTab('orders')}
                            className={`list-group-item list-group-item-action border-0 py-2 rounded-3 mb-1 ${activeTab === 'orders' ? 'active bg-success text-white' : ''}`}
                            >
                                <i className="bi bi-box-seam me-2"></i> Мої замовлення
                            </button>
                            <button 
                            onClick={() => supabase.auth.signOut().then(() => navigate('/'))} 
                            className="list-group-item list-group-item-action border-0 py-2 text-danger mt-3"
                            >
                                <i className="bi bi-box-arrow-right me-2"></i> Вихід
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    {activeTab === 'data' && (
                        <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold m-0 h5">
                                    Особисті дані
                                </h4>
                                {!isEditing ? (
                                    <button className="btn btn-outline-dark btn-sm rounded-pill px-3" onClick={() => setIsEditing(true)}>
                                        Змінити
                                    </button>
                                ) : (
                                    <div>
                                        <button className="btn btn-success btn-sm me-2 px-3 rounded-pill" onClick={handleUpdateProfile}>
                                            Зберегти
                                        </button>
                                        <button className="btn btn-light btn-sm px-3 rounded-pill" onClick={() => setIsEditing(false)}>
                                            Скасувати
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="text-muted small d-block mb-1">
                                        Ім'я
                                    </label>
                                    {isEditing ? (
                                        <input 
                                        type="text" 
                                        className="form-control form-control-sm" 
                                        value={editForm.firstName} 
                                        onChange={(e) => setEditForm({...editForm, firstName: e.target.value})} 
                                        />
                                    ) : (
                                        <p className="fw-bold m-0">
                                            {user?.user_metadata?.first_name || 'Не вказано'}
                                        </p>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="text-muted small d-block mb-1">
                                        Прізвище
                                    </label>
                                    {isEditing ? (
                                        <input 
                                        type="text" 
                                        className="form-control form-control-sm" 
                                        value={editForm.lastName} 
                                        onChange={(e) => setEditForm({...editForm, lastName: e.target.value})} 
                                        />
                                    ) : (
                                        <p className="fw-bold m-0">
                                            {user?.user_metadata?.last_name || 'Не вказано'}
                                        </p>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="text-muted small d-block mb-1">
                                        Email
                                    </label>
                                    <p className="fw-bold m-0">
                                        {user?.email}
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <label className="text-muted small d-block mb-1">
                                        Дата реєстрації
                                    </label>
                                    <p className="fw-bold m-0">
                                        {new Date(user?.created_at).toLocaleDateString('uk-UA')}
                                    </p>
                                </div>
                            </div>
                            <hr className="my-4 opacity-50" />
                            <button className="btn btn-link p-0 text-success text-decoration-none small" onClick={handleResetPassword}>
                                <i className="bi bi-shield-lock me-1"></i> Змінити пароль через Email
                            </button>
                        </div>
                    )}
                    {activeTab === 'orders' && (
                        <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
                            <h4 className="fw-bold mb-4 h5">
                                Історія замовлень
                            </h4>
                            {orders.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-borderless align-middle small">
                                        <thead className="table-light text-muted">
                                            <tr>
                                                <th>№</th>
                                                <th>Дата</th>
                                                <th>Товари</th>
                                                <th>Сума</th>
                                                <th>Статус</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order.id} className="border-bottom">
                                                    <td className="py-3 fw-bold">#{order.id.toString().slice(0, 5)}</td>
                                                    <td className="py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                                                    <td className="py-3">
                                                        {order.items.map((item, i) => (
                                                            <div key={i} className="text-truncate" style={{maxWidth: '180px'}}>
                                                                {item.name} <span className="text-muted">
                                                                    x{item.quantity}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className="py-3 fw-bold text-success">
                                                        {order.total_price} грн
                                                    </td>
                                                    <td className="py-3">
                                                        <span className="badge bg-light text-dark border px-2 py-1">
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <i className="bi bi-cart-x text-muted mb-3 d-block" style={{fontSize: '3rem'}}></i>
                                    <p className="text-muted">
                                        Ви ще нічого не замовляли
                                    </p>
                                    <button onClick={() => navigate('/')} className="btn btn-success btn-sm px-4 rounded-pill">
                                        До каталогу
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {recentItems.length > 0 && (
                        <div className="mt-5">
                            <h5 className="fw-bold mb-3">
                                Ви нещодавно переглядали
                            </h5>
                            <div className="row g-3">
                                {recentItems.map((item, index) => (
                                    <div key={index} className="col-6 col-md-3">
                                        <div className="card border-0 shadow-sm p-3 h-100 text-center rounded-4">
                                            <div className="d-flex align-items-center justify-content-center mb-2" style={{ height: '120px', overflow: 'hidden' }}>
                                                <img 
                                                src={`/products/${(item.image_url || item.image || '').replace(/\s+/g, '_')}`} 
                                                alt={item.name}
                                                onError={(e) => { e.target.src = '/products/placeholder.png'; }}
                                                style={{maxHeight: '100%',  maxWidth: '100%', objectFit: 'contain'}}                                                                                                                                                                                                       
                                                />
                                            </div>
                                            <div style={{minHeight: '40px'}} className="d-flex align-items-center justify-content-center">
                                                <p className="small mb-1 text-truncate fw-medium" style={{fontSize: '12px'}}>
                                                    {item.name}
                                                </p>
                                            </div>                                 
                                            <p className="small fw-bold text-success mb-0">
                                                {item.price} грн
                                            </p>                                     
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;