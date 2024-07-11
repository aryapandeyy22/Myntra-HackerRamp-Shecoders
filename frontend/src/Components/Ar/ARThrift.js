import React from 'react';
import ARTagComponent from './ARTagComponent';

const ThriftItemCard = ({ thriftItem }) => {
  const { ar_tag_url, ar_description, title, category, price } = thriftItem;

  return (
    <div className="thrift-item-card">
      <h2>{title}</h2>
      <p>Category: {category}</p>
      <p>Price: ${price}</p>
      <ARTagComponent arTagUrl={ar_tag_url} arDescription={ar_description} />
    </div>
  );
};

export default ThriftItemCard;
