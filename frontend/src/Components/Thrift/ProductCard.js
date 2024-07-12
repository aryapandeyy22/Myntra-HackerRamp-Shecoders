import React from 'react';
import Slider from 'react-slick';

const ProductCard = ({ product }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="border rounded-lg overflow-hidden shadow-md">
            {product.images.length === 1 ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
            ) : (
                <Slider {...sliderSettings}>
                    {product.images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={product.name} className="w-full h-48 object-cover" />
                        </div>
                    ))}
                </Slider>
            )}
            <div className="p-4">
                <h2 className="text-base font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">Price: Rs. {product.sellingPrice}</p>
                <p className="text-gray-600 mb-2">Color: {product.color}</p>
                <p className="text-gray-600 mb-2">Category: {product.category}</p>
                <button className="bg-gray-800 text-white py-2 px-4 rounded-lg mt-2 hover:bg-gray-700 transition duration-300">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
