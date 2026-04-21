import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container text-center py-5 my-5">
            <h1 className="display-1 fw-bold text-success">
                404
            </h1>
            <h2 className="mb-4">
                Ой! Сторінку не знайдено
            </h2>
            <p className="text-muted mb-5">
                Схоже, ви зайшли не туди. Сторінка, яку ви шукаєте, не існує або була переміщена.
            </p>
            <Link to="/" className="btn btn-success btn-lg px-5 shadow-sm">
                Повернутися на головну
            </Link>
        </div>
    );
};

export default NotFound;