import React from 'react';

const SortBar = ({ sort, setSort }) => {
    return (
        <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-lg font-semibold">Sort By:</h2>
            <select
                className="border p-2 rounded-md"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="relevance">Relevance</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
                <option value="newest">Newest</option>
            </select>
        </div>
    );
};

export default SortBar;
