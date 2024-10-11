import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';
import './Products.css';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const [newProduct, setNewProduct] = useState({
    id: Date.now(), 
    name: '',
    price: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {  
      dispatch(addProduct(newProduct));
      setNewProduct({
        id: Date.now(),  
        name: '',
        price: '',
        description: ''
      });
    } else {
      alert('กรอกชื่อและราคาด้วยค้าบบบ');
    }
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div>
      <h2>รายการผลิตภัณฑ์</h2>
      <ul>
        {productList.map(product => (
          <li key={product.id} className="product-item">
            <Link to={`/product/${product.id}`}>
            {product.name} - ${product.price}

            </Link>

            {/* แสดงถ้ามีค่า */}
            {product.description && <p>{product.description}</p>}  
            <button onClick={() => handleRemoveProduct(product.id)} className="remove-button">ลบรายการ</button>
          </li>
        ))}
      </ul>

      <h3>เพิ่มผลิตภัณฑ์ใหม่</h3>
      <input 
        type="text" 
        name="name" 
        placeholder="ชื่อผลิตภัณฑ์" 
        value={newProduct.name} 
        onChange={handleInputChange} 
        required 
        className="input-large" 
      />
      <input 
        type="text" 
        name="price" 
        placeholder="ราคาผลิตภัณฑ์" 
        value={newProduct.price} 
        onChange={handleInputChange} 
        required 
        className="input-large" 
      />
      <input 
        type="text" 
        name="description" 
        placeholder="รายละเอียดผลิตภัณฑ์ (ใส่หรือไม่ใส่ก็ได้)" 
        value={newProduct.description} 
        onChange={handleInputChange} 
        className="input-large" 
      />
      <button onClick={handleAddProduct}>เพิ่มผลิตภัณฑ์</button>
    </div>
  );
}

export default Products;
