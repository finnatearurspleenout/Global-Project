import React, { Component, useRef, useState } from 'react';

class AsideComponent extends Component {
    render() {
        return (
            <div className="category-list mt-2 pe-3 border-end">
                <a href="#" className="nav-link category-item d-flex align-items-center p-2 rounded">
                    <i className="bi bi-laptop me-3 fs-5 icon-default"></i>
                    <span>
                        Ноутбуки
                    </span>
                </a>
                <a href="#" className="nav-link category-item d-flex align-items-center p-2 rounded mt-1">
                    <i className="bi bi-pc-display me-3 fs-5 icon-default"></i>
                    <span>
                        Комп'ютери
                    </span>
                </a>
                <a href="#" className="nav-link category-item d-flex align-items-center p-2 rounded mt-1">
                    <i className="bi bi-cpu me-3 fs-5 icon-default"></i>
                    <span>
                        Комплектуючі
                    </span>
                </a>
                <a href="#" className="nav-link category-item d-flex align-items-center p-2 rounded mt-1">
                    <i className="bi bi-headphones me-3 fs-5 icon-default"></i>
                    <span>
                        Периферія та аксесуари
                    </span>
                </a>
                <hr className="my-3 text-muted" />
                <a href="#" className="nav-link category-item d-flex align-items-center p-2 rounded">
                    <i className="bi bi-percent me-3 fs-5"></i>
                    <span>
                        Акції та знижки
                    </span>
                </a>
                <hr className="my-3 text-muted" />
                <div className="p-3 mt-4 text-center border-0" 
                style={{backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
                    <p style={{fontSize: '13px', color: '#212121', lineHeight: '1.4'}}>
                        Увійдіть, щоб отримувати рекомендації, персональні бонуси і знижки.
                    </p>
                    <button className="btn w-100 fw-bold py-2 mt-2" 
                    style={{backgroundColor: '#00a046', color: 'white', borderRadius: '8px',fontSize: '14px'}}
                    onClick={this.props.onLoginClick}>
                        Увійдіть в особистий кабінет
                    </button>
                </div>
                <hr className="my-3 text-muted" />
            </div>
        );
    }
}

export default AsideComponent;