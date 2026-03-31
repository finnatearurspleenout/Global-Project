import React from 'react';

const Warranty = () => {
    return (
        <div className="container my-5 pt-5">
            <h1 className="fw-bold mb-4">
                Сервіс та Гарантія
            </h1>
            <div className="alert alert-info py-4">
                <p className="mb-0">
                    <strong>Electro Shop</strong> гарантує високу якість усіх реалізованих товарів. Ми працюємо виключно з офіційними постачальниками, що забезпечує вам повну підтримку від виробника.
                </p>
            </div>
            <div className="row mt-4">
                <div className="col-md-4">
                    <h5 className="fw-bold">
                        Терміни
                    </h5>
                    <ul className="list-unstyled small text-muted">
                        <li>
                            Смартфони: 12-24 міс.
                        </li>
                        <li>
                            Ноутбуки: 12-36 міс.
                        </li>
                        <li>
                            Комплектуючі: до 60 міс.
                        </li>
                    </ul>
                </div>
                <div className="col-md-8 border-start px-4">
                    <h5 className="fw-bold">
                        Умови повернення
                    </h5>
                    <p>
                        Згідно із Законом України "Про захист прав споживачів", ви маєте право повернути або обміняти товар протягом 14 днів з моменту покупки. Товар не повинен мати слідів використання, має бути збережений товарний вигляд, пакування та всі пломби.
                    </p>
                    <p className="text-muted small italic">
                        Зверніть увагу: гарантія не поширюється на пошкодження, що виникли внаслідок порушення правил експлуатації або механічного впливу.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Warranty;