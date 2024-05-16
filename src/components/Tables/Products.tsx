import React, { useState, useEffect, useRef } from 'react';
import { getAllProducts, deleteProduct } from '../Backend-api/ProductAPI';
import UpdateProductForm from '../../pages/Form/update-forms/UpdateProductForm';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const productRef = useRef(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    console.log(product)

    setShowUpdateForm(false); // Close the update form

    productRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClosePopUp = () => {
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(selectedProduct.id);
      setProducts(products.filter(product => product.id !== selectedProduct.id));
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const handleUpdateProduct = () => {
    setShowUpdateForm(true);
  };
  const handleDataRefetch = async () => {
    try {
      const updatedProducts = await getAllProducts(); 
      setProducts(updatedProducts); 
      if (selectedProduct) {
        const updatedSelectedProduct = updatedProducts.find(product => product.id === selectedProduct.id);
        setSelectedProduct(updatedSelectedProduct); 
      }
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };
  

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.productType.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-4 relative">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name or reference"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
      </div>
      <div ref={productRef} />
      {selectedProduct && (
        <div className="bg-white mb-10 dark:bg-gray-800 shadow-md rounded-lg p-6 col-span-full">
          <h2 className="text-lg font-semibold mb-2 text-blue-400">Product Details</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Name:</span> {selectedProduct.name}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Price:</span> {selectedProduct.price_Unit}$
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Stock:</span> {selectedProduct.stock}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Description:</span> {selectedProduct.description}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Reference:</span> {selectedProduct.reference}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">productType:</span> {selectedProduct.productType.name}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Brand:</span> {selectedProduct.brand}
          </p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 mr-5" onClick={handleClosePopUp}>
            Close
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mt-4 mr-5" onClick={handleUpdateProduct}>
            Update
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4 mr-5" onClick={handleDeleteProduct}>
            Delete
          </button>
          {showUpdateForm && <UpdateProductForm product={selectedProduct}  onRefetch={handleDataRefetch}  onClose={() => setShowUpdateForm(false)} />}
        </div>
      )}
           

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredProducts.map((product, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Name:</span> {product.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Price:</span> {product.price_Unit}$
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Stock:</span> {product.stock}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Description:</span> {product.description}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Reference:</span> {product.reference}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">productType:</span> {product.productType.name}
          </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4" onClick={() => handleProductClick(product)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
