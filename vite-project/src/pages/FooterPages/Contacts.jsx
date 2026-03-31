import React from 'react';

const Contacts = () => {
    return (
        <div className="container my-5 pt-5">
            <h1 className="fw-bold mb-4">
                Наші контакти
            </h1>
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card h-100 p-3 shadow-sm border-0 bg-light">
                        <h6 className="fw-bold text-uppercase">
                            Гаряча лінія
                        </h6>
                        <p className="h5 text-success">
                            0 800 333 44 55
                        </p>
                        <p className="small text-muted">
                            Безкоштовно по Україні
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 p-3 shadow-sm border-0 bg-light">
                        <h6 className="fw-bold text-uppercase">
                            Графік роботи
                        </h6>
                        <p className="mb-0">
                            Пн-Пт: 09:00 — 21:00
                        </p>
                        <p className="mb-0">
                            Сб-Нд: 10:00 — 19:00
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 p-3 shadow-sm border-0 bg-light">
                        <h6 className="fw-bold text-uppercase">
                            Email для запитів
                        </h6>
                        <p className="mb-0">
                            support@electro-shop.ua
                        </p>
                        <p className="mb-0">
                            sales@electro-shop.ua
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <h5 className="fw-bold mb-3">
                    Головний шоурум
                </h5>
                <p>
                    Україна, м. Київ, вул. Хрещатик, 100. Ми завжди раді бачити вас для тестування новітніх девайсів та консультацій.
                </p>
            </div>
        </div>
    );
};

export default Contacts;