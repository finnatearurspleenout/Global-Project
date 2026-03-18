import React, { Component, useState } from 'react';

const AboutUs =()=> {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <section className="about-store-section mt-5 mb-5 px-3">
            <div className={`container text-dark position-relative ${isExpanded ? 'is-expanded' : ''}`} 
            style={{lineHeight: '1.6', fontSize: '15px'}}>
                <div className="visible-content">
                    <h2 className="fs-4 fw-bold mb-3">
                        Electro Shop - твій провідник у світ високих технологій.
                    </h2>
                    <p className="mb-2">
                        Ми створили цей простір для тих, хто не уявляє життя без швидкості, потужного заліза та бездоганної графіки. 
                        Наш шлях розпочався з простої ідеї: зробити професійне обладнання доступним для кожного...
                    </p>
                </div>
                {!isExpanded && <div className="text-fade"></div>}
                <div className="expandable-content text-collapse-container" 
                     style={{maxHeight: isExpanded ? '1000px' : '0px'}}>
                    <div className="text-fade"></div>
                    <p className="mb-4">
                        ...від геймера-початківця до топового IT-спеціаліста. Ми віримо, що правильний вибір техніки здатний змінити якість роботи та задоволення від гри.
                    </p>                   
                    <h3 className="fs-5 fw-bold mb-2">
                        Наші цінності
                    </h3>
                    <ul className="mb-4">
                        <li className="mb-1">
                            <strong>Технологічність:</strong> ми тримаємо руку на пульсі всіх новинок індустрії.
                        </li>
                        <li className="mb-1">
                            <strong>Відвертість:</strong> рекомендуємо лише те, що купили б самі.
                        </li>
                        <li>
                            <strong>Підтримка:</strong> ми залишаємось на зв'язку після покупки.
                        </li>
                    </ul>
                    <h3 className="fs-5 fw-bold mb-2">
                        Ми дбаємо про твій комфорт
                    </h3>
                    <p className="mb-2">
                        Ми знаємо, як важливо отримати свій новий ноутбук вчасно. Тому наша система працює як швейцарський годинник:
                    </p>
                    <ul className="mb-4">
                        <li>
                            <strong>Експертний підхід</strong> - допоможемо обрати ПК під конкретні завдання.
                        </li>
                        <li>
                            <strong>Швидкість</strong> - оперативна логістика по всій Україні.
                        </li>
                    </ul>
                    <p className="fw-medium">
                        <strong>Давай створювати майбутнє разом!</strong>
                    </p>
                </div>

                <button 
                onClick={toggleReadMore} 
                className="btn btn-link p-0 text-decoration-none d-flex align-items-center mt-1"
                style={{color: '#00a046', fontWeight: '500', border: 'none', background: 'none'}}
                >
                    {isExpanded ? 'Згорнути' : 'Читати повністю'}
                    <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'} ms-1`} style={{fontSize: '12px'}}></i>
                </button>
            </div>
        </section>
    );
}


export default AboutUs;