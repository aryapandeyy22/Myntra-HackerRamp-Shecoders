import React, { useState } from 'react';
import Slider from 'react-slick';
import ARComponent from '../Ar/ARTag'; // Import your AR component here

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

    // Function to generate a random rating between 1 to 5
    const generateRandomRating = () => {
        return Math.floor(Math.random() * 5) + 1;
    };

    // Generate a random rating for the product
    const rating = generateRandomRating();

    // State to manage AR component visibility
    const [showARComponent, setShowARComponent] = useState(false);

    // Function to toggle AR component visibility
    const toggleARComponent = () => {
        setShowARComponent(!showARComponent);
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
                <p className="text-gray-600 mb-2">Price: Rs. {product.price}</p>
                <p className="text-gray-600 mb-2">Color: {product.color}</p>
                <p className="text-gray-600 mb-2">Category: {product.category}</p>
                {product.ar_tag_url && (
                    <p className="text-gray-600 mb-2">
                        AR Tag: <a href="#" onClick={toggleARComponent}>Scan me</a>
                    </p>
                )}
                <p className="text-gray-600 mb-2">Rating: {rating} ★★★★★</p>
                <button className="bg-gray-800 text-white py-2 px-4 rounded-lg mt-2 hover:bg-gray-700 transition duration-300">
                    Add to Cart
                </button>
            </div>

            {showARComponent && <ARComponent productId={product.id} />} {/* Pass necessary props to ARComponent */}
        </div>
    );
};

export default ProductCard;
