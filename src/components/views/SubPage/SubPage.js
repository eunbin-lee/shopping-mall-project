import React from 'react';
import { Icon, Select } from 'antd';
// import CreateProducts from './CreateProducts';

function SubPage() {
  const { Option } = Select;

  // 베스트 상품 목록
  const products = [];
  const createProducts = () => {
    for (let i = 1; i <= 20; i++) {
      products.push({
        id: i,
        image: `https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg`,
        name: `Best Product${i}`,
        price: `00000￦`,
        likes: `234`,
        reviews: `10`,
      });
    }
    return products;
  };
  createProducts();

  const pages = [];
  const createPages = () => {
    for (let i = 1; i <= 5; i++) {
      pages.push({
        id: i,
      });
    }
    return pages;
  };
  createPages();

  return (
    <div
      style={{
        width: '80%',
        margin: '0 auto',
        marginTop: '-6px',
      }}
    >
      <h2 style={{ margin: '50px 5px 30px' }}>Best</h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '20px 5px',
        }}
      >
        <Select defaultValue="recommendation_order" style={{ width: '150px' }}>
          <Option value="recommendation_order">추천순</Option>
          <Option value="new_product_order">신상품순</Option>
          <Option value="low_price_order">낮은가격순</Option>
          <Option value="high_price_order">높은가격순</Option>
          <Option value="best_likes_order">베스트하트순</Option>
          <Option value="best_review_order">베스트리뷰순</Option>
        </Select>
      </div>

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {products.map((product) => (
          <li
            key={product.id}
            style={{ width: '320px', margin: '0 5px 50px', cursor: 'pointer' }}
          >
            <img
              src={product.image}
              style={{ width: '320px', height: '400px' }}
            />
            <p style={{ marginTop: '0.75rem', fontSize: '1.15rem' }}>
              {product.name}
            </p>
            <p style={{ marginTop: '-0.5rem', fontSize: '1.1rem' }}>
              {product.price}
            </p>
            <div style={{ marginTop: '2rem', fontSize: '1rem' }}>
              <span style={{ marginRight: '1rem' }}>
                <Icon type="heart" /> {product.likes}
              </span>
              <span>
                <Icon type="message" /> {product.reviews}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '70px 0',
        }}
      >
        {/*  <a
          href="/"
          style={{
            color: '#495057',
            fontSize: '1rem',
            marginBottom: '12px',
            marginLeft: '8px',
          }}
        >
          <Icon type="left" />
        </a> */}
        <ul style={{ display: 'flex' }}>
          {pages.map((page) => (
            <li style={{ margin: '0 10px' }}>
              <a
                href="/"
                style={{
                  color: '#495057',
                  fontSize: '1.05rem',
                  padding: '3px',
                }}
              >
                {page.id}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/"
          style={{
            color: '#495057',
            fontSize: '1rem',
            marginBottom: '12px',
            marginLeft: '8px',
          }}
        >
          <Icon type="right" />
        </a>
      </div>

      {/* <CreateProducts products={products} /> */}
    </div>
  );
}

export default SubPage;
