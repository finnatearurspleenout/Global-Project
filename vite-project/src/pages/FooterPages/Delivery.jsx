import React from 'react';

const Delivery = () => {
    return (
        <div className="container my-5 pt-5">
            <h1 className="fw-bold mb-4">
                Доставка та оплата
            </h1>
            <div className="row g-5">
                <div className="col-lg-6">
                    <h3 className="h5 fw-bold text-success border-bottom pb-2">
                        Способи доставки
                    </h3>
                    <div className="mb-4">
                        <h6 className="fw-bold">
                            Доставка у відділення "Нова Пошта"
                        </h6>
                        <p className="small text-muted">
                            Термін доставки: 1-3 робочих дні. Вартість згідно з тарифами перевізника. При замовленні від 30 000 грн — доставка безкоштовна (крім великогабаритних товарів).
                        </p>
                    </div>
                    <div className="mb-4">
                        <h6 className="fw-bold">
                            Адресна доставка кур'єром
                        </h6>
                        <p className="small text-muted">
                            Ми доставимо ваше замовлення прямо до дверей у будь-якому місті України. Ви зможете оглянути товар та перевірити комплектність перед оплатою.
                        </p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <h3 className="h5 fw-bold text-primary border-bottom pb-2">
                        Методи оплати
                    </h3>
                    <div className="mb-4">
                        <h6 className="fw-bold">
                            Оплата при отриманні
                        </h6>
                        <p className="small text-muted">
                            Ви можете сплатити замовлення готівкою або карткою безпосередньо у відділенні перевізника або кур'єру після перевірки товару.
                        </p>
                    </div>
                    <div className="mb-4">
                        <h6 className="fw-bold">
                            Безготівковий розрахунок
                        </h6>
                        <p className="small text-muted">
                            Для юридичних та фізичних осіб. Після оформлення замовлення наш менеджер надішле вам рахунок-фактуру на електронну пошту.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Delivery;