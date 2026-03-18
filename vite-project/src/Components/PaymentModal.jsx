import React from 'react';

const PaymentModal = ({ isOpen, type, onClose }) => {
    if (!isOpen) return null;

    const isVisa = type === 'visa';

    return (
        <div className="payment-modal-overlay" onClick={onClose}>
            <div className="payment-modal-content" onClick={e => e.stopPropagation()}>
                <div className="payment-modal-header">
                    <h5 className="payment-modal-title">
                        {isVisa ? 'Verified by Visa' : 'Mastercard ID Check'}
                    </h5>
                    <button className="payment-modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="payment-modal-body">
                    <p>
                        Платіжні системи в партнерстві з банками-емітентами впроваджують сучасні схеми перевірки особистості власника картки, щоб зробити покупки в Інтернеті більш безпечними. Встановлюється спеціальний пароль для кожної операції, що здійснюється, і це вселяє в Вас впевненість, що тільки Ви можете робити такі покупки онлайн.
                    </p>
                    <p>
                        Сучасні технологічні рішення необхідні для того, щоб власник картки був упевнений в безпеці транзакції і в тому, що він має справу зі справжнім (а не «підставним») магазином.
                    </p>
                    <p>
                        Одна з таких технологічних рішень називається Verified by Visa («Перевірено Visa») або Mastercard ID Check.
                    </p>
                    <p>
                        Для активації послуги необхідно звернутися в Ваш банк.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;