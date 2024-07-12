import React, { useEffect } from 'react';

const Filter = ({ filters, setFilters, products }) => {
    const categories = [...new Set(products.map(item => item.category))];
    const colors = [...new Set(products.map(item => item.color))];
    const prices = [...new Set(products.map(item => item.sellingPrice).sort((a, b) => a - b))];

    const handleFilterChange = (type, value) => {
        let newFilters = { ...filters };

        if (type === 'category' || type === 'color') {
            if (newFilters[type].includes(value)) {
                newFilters[type] = newFilters[type].filter(item => item !== value);
            } else {
                newFilters[type].push(value);
            }
        } else {
            newFilters[type] = newFilters[type] === value ? '' : value;
        }

        setFilters(newFilters);
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Categories</h2>
                {categories.map(category => (
                    <div key={category} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            name="category"
                            value={category}
                            id={`category-${category}`}
                            checked={filters.category.includes(category)}
                            onChange={() => handleFilterChange('category', category)}
                        />
                        <label htmlFor={`category-${category}`} className="ml-2">{category}</label>
                    </div>
                ))}
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Colors</h2>
                {colors.map(color => (
                    <div key={color} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            name="color"
                            value={color}
                            id={`color-${color}`}
                            checked={filters.color.includes(color)}
                            onChange={() => handleFilterChange('color', color)}
                        />
                        <label htmlFor={`color-${color}`} className="ml-2">{color}</label>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">Price Range</h2>
                <select
                    className="border p-2 rounded-md"
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                    <option value="">All Prices</option>
                    {prices.map(price => (
                        <option key={price} value={price}>{price}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filter;

