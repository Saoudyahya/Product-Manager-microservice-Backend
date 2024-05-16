import React, { useState, useEffect, useRef } from 'react';
import { getAllSuppliers , deleteSupplier } from '../Backend-api/SupplierAPi';// Import the function to fetch suppliers
import { getProductById } from '../Backend-api/ProductAPI';// Import the function to fetch product by ID
import ReactCountryFlag from "react-country-flag";
import UpdateSupplierForm from '../../pages/Form/update-forms/UpdateSupplierForm';
import countryCodes from '../Charts/contrycode';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const supplierRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const suppliersData = await getAllSuppliers();
        setSuppliers(suppliersData);
      } catch (error) {
        console.error('Error fetching suppliers data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchProductsForSupplier = async (productIds) => {
    const products = [];
    for (const productId of productIds) {
      const product = await getProductById(productId);
      products.push(product);
    }
    return products;
  };

  const handleSupplierClick = async (supplier) => {
    setSelectedSupplier(supplier);
    const products = await fetchProductsForSupplier(supplier.productIds);
    setSelectedProducts(products);
    supplierRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClosePopUp = () => {
    setSelectedSupplier(null);
    setSelectedProducts([]);
  };

  const handleDeleteSupplier = async () => {
    try {
      await deleteSupplier(selectedSupplier.supplierId);
      setSuppliers(suppliers.filter(supplier => supplier.supplierId !== selectedSupplier.supplierId));
      setSelectedSupplier(null);
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  const handleUpdateSupplier = () => {
    setShowUpdateForm(true);
  };
  const handleDataRefetch = async () => {
    try {
      const updatedSupplierData = await getAllProducts(); 
      setSuppliers(updatedSupplierData); 
      if (selectedSupplier) {
        const updatedSelectedProduct = selectedSupplier.find(supplier => supplier.id === selectedSupplier.id);
        setSelectedSupplier(updatedSelectedProduct); 
      }
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-4 relative">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by supplier name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
      </div>
      <div ref={supplierRef} />
      {selectedSupplier && (
        <div className="bg-white mb-10 dark:bg-gray-800 shadow-md rounded-lg p-6 col-span-full">
          <h2 className="text-lg font-semibold mb-2 text-blue-400">Supplier Details</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Supplier Name:</span> {selectedSupplier.supplierName}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Country:</span> {selectedSupplier.country} <ReactCountryFlag countryCode={countryCodes[selectedSupplier.country]} svg />
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Region:</span> {selectedSupplier.region}
          </p>
          <div className="mt-2">
            <h2 className="text-lg font-semibold mb-1">Products :</h2>
            {selectedProducts.map((product, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
                <h2 className="text-lg font-semibold mb-2 text-blue-400">Product Details</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Product ID:</span> {product.id}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Product Name:</span> {product.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Price Per Unit:</span> {product.price_Unit}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Description:</span> {product.description}
                </p>
                {/* Include other product details as needed */}
              </div>
            ))}
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 mr-5" onClick={handleClosePopUp}>
            Close
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mt-4 mr-5" onClick={handleUpdateSupplier}>
        Update
      </button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4 mr-5" onClick={handleDeleteSupplier}>
        Delete
      </button>
      {showUpdateForm && <UpdateSupplierForm Supplier={selectedSupplier}  onRefetch={handleDataRefetch}  onClose={() => setShowUpdateForm(false)} />}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredSuppliers.map((supplier, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Supplier Details</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Supplier Name:</span> {supplier.supplierName}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Country:</span> {supplier.country} <ReactCountryFlag countryCode={countryCodes[supplier.country]} svg />
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Region:</span> {supplier.region}
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4" onClick={() => handleSupplierClick(supplier)}>
              View Products
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Supplier;
