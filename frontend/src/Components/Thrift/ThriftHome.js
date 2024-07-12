import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../action/productaction';
import Filter from './Filter';
import SortBar from './SortBar';
import ProductCard from './ProductCard';
import './ThriftHome.css';

const ThriftPage = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: [],
        gender: '',
        color: [],
        priceRange: ''
    });
    const [sort, setSort] = useState('relevance');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        filterProducts();
    }, [filters, products, sort]);

    const filterProducts = () => {
        let updatedProducts = products;

        if (filters.category.length > 0) {
            updatedProducts = updatedProducts.filter(product => filters.category.includes(product.category));
        }

        if (filters.gender) {
            updatedProducts = updatedProducts.filter(product => product.gender === filters.gender);
        }

        if (filters.color.length > 0) {
            updatedProducts = updatedProducts.filter(product => filters.color.includes(product.color));
        }

        if (filters.priceRange) {
            updatedProducts = updatedProducts.filter(product => product.sellingPrice === parseFloat(filters.priceRange));
        }

        // Apply sorting
        switch (sort) {
            case 'price_low_high':
                updatedProducts = updatedProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
                break;
            case 'price_high_low':
                updatedProducts = updatedProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);
                break;
            case 'newest':
                updatedProducts = updatedProducts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                break;
            default:
                break;
        }

        setFilteredProducts(updatedProducts);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row">
                {/* Sidebar for Filters */}
                <div className="lg:w-1/4">
                    <Filter filters={filters} setFilters={setFilters} products={products} />
                </div>

                {/* Main Content Area */}
                <div className="lg:w-3/4 lg:ml-6">
                    {/* Sort Bar */}
                    <div className="flex justify-end mb-4">
                        <SortBar sort={sort} setSort={setSort} />
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThriftPage;
