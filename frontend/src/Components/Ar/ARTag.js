// ARComponent.jsx
import React, { useRef, useEffect, useState } from 'react';
import { ARjs } from 'ar.js'; // Adjust import path based on your setup

const ARComponent = () => {
    const arScene = useRef(null);
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        if (arScene.current) {
            // Initialize AR.js scene
            const arToolkitSource = new ARjs.Source({
                sourceType: 'webcam',
            });

            const arToolkitContext = new ARjs.Context({
                cameraParametersUrl: 'data/camera_para.dat',
                detectionMode: 'mono',
            });

            arToolkitContext.init(() => {
                arScene.current.appendChild(arToolkitSource.domElement);
            });

            // Example: Handle marker recognition
            const markerControls = new ARjs.MarkerControls(arToolkitContext, arScene.current, {
                type: 'pattern',
                patternUrl: 'data/patt.hiro', // Adjust based on your AR marker setup
                changeMatrixMode: 'cameraTransformMatrix',
            });

            markerControls.addEventListener('markerFound', async (ev) => {
                const productId = ev.data.marker.id; // Marker ID or pattern identifier
                console.log(`AR Tag found! Scanning product ID: ${id}`);

                try {
                    // Fetch product details from backend
                    const response = await fetch(`http://localhost:3000/api/thrift/${id}`);
                    if (!response.ok) {
                        throw new Error('Product not found');
                    }
                    const productData = await response.json();
                    setProductDetails(productData);
                } catch (error) {
                    console.error('Error fetching product details:', error.message);
                    setProductDetails(null);
                }
            });

            markerControls.addEventListener('markerLost', () => {
                // Clear product details when marker is lost
                setProductDetails(null);
            });
        }
    }, []);

    return (
        <div>
            <div ref={arScene} style={{ width: '100%', height: '500px' }}>
                {/* AR scene will be rendered here */}
            </div>
            {productDetails && (
                <div>
                    <h2>{productDetails.name}</h2>
                    <p>{productDetails.description}</p>
                    <p>{productDetails.size}</p>
                    <p>{productDetails.brand}</p>
                    <p>{productDetails.material}</p>
                    <p>{productDetails.color}</p>
                    <p>{productDetails.condition}</p>



                </div>
            )}
        </div>
    );
};

export default ARComponent;
