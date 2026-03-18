import React, { Component, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './cssSwipers/swiperBestProduct.css';

class BestProduct extends Component {
    render() {
        const promoItems = [
            {id: 1, title: 'Ноутбук Apple MacBook',image: '/macbook-banner.png', link: '/product/macbook'},
            {id: 2, title: 'Iphone',image: '/iphone17-banner.png', link: '/product/iphone17'},
            {id: 3, title: 'Samsung',image: '/samsung-banner.png', link: '/product/samsung'}
        ];
        return (
            <main className="promo-slider-section">
                <div className='container-fluid px-0'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Pagination, Navigation, Autoplay]}
                        className="main-banner-swiper"
                    >
                        {promoItems.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Link to={item.link} className="banner-link">
                                    <div className="banner-slide">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>                   
                    <div className="text-end mt-2 px-3">
                        <Link to="/all-actions" className="all-promo-link">
                            Всі акції →
                        </Link>
                    </div>
                </div>
            </main>
        );
    }
}

export default BestProduct;