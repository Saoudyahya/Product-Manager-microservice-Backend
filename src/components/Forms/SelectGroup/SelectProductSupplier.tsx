import React, { useState, useEffect } from 'react';
import { getProductById } from '../../Backend-api/ProductAPI';

interface Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  reference: string;
  brand: string;
  price_Unit: number;
  productType: {
    id: number;
    name: string;
  };
}

interface SelectedProduct extends Product {
  quantity: number;
}

const SelectProductSupplier: React.FC <{
  onProductChange: (selectedProducts: SelectedProduct[]) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
  onTotalPriceChange: (totalPrice: number) => void;
  productIds: number[];
  formSubmitted: boolean;
}> = ({ onProductChange, onQuantityChange, onTotalPriceChange ,productIds,formSubmitted }) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      const products: Product[] = [];
      console.log(productIds )
        for (const productId of productIds) {
        const product = await getProductById(productId);
        products.push(product);
      }
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
   useEffect(() => {
  fetchProducts();
  setSelectedProducts([]); 
}, [productIds]);
useEffect(() => {
  if (formSubmitted) {

    setSelectedProducts([]);
  } 
}, [formSubmitted]);

  const addSelectedProduct = (productId: number) => {
    const selectedProduct = products.find((product) => product.id === productId);
    if (selectedProduct) {
      const isAlreadySelected = selectedProducts.some((product) => product.id === productId);
      if (isAlreadySelected) {
    
        const alertElement = document.getElementById('alert');
        if (alertElement) {
          alertElement.style.display = 'block';
          setTimeout(() => {
            alertElement.style.display = 'none';
          }, 3000); // Hide alert after 3 seconds
        }
      } else {
        setSelectedProducts([...selectedProducts, { ...selectedProduct, quantity: 1 }]);
        setIsOptionSelected(true);
      }
      if (!isAlreadySelected) {
        setSelectedProducts([...selectedProducts, { ...selectedProduct, quantity: 1 }]);
        setIsOptionSelected(true);
        onProductChange([...selectedProducts, { ...selectedProduct, quantity: 1 }]);
      }
    }
    
  };

  const removeSelectedProduct = (productId: number) => {
    const updatedSelectedProducts = selectedProducts.filter((product) => product.id !== productId);
    setSelectedProducts(updatedSelectedProducts);
    if (updatedSelectedProducts.length === 0) {
      setIsOptionSelected(false);
    }
    onProductChange(updatedSelectedProducts);

  };

  const updateQuantity = (productId: number, quantity: number) => {
    const selectedProduct = selectedProducts.find((product) => product.id === productId);
    if (selectedProduct) {
      if (quantity <= selectedProduct.stock) {
        const updatedSelectedProducts = selectedProducts.map((product) =>
          product.id === productId ? { ...product, quantity } : product
        );
        setSelectedProducts(updatedSelectedProducts);
      } else {
        console.log("Selected quantity exceeds stock level");
      }

    }
    onQuantityChange(productId, quantity);
  };

  useEffect(() => {
    const totalPrice = calculateTransactionTotal();
    onTotalPriceChange(totalPrice);
  }, [selectedProducts]);

  const calculateTotalPrice = (selectedProduct: SelectedProduct) => {
    return selectedProduct.quantity * selectedProduct.price_Unit;
  };

  const calculateTransactionTotal = () => {
    return selectedProducts.reduce((total, selectedProduct) => {
      return total + calculateTotalPrice(selectedProduct);
    }, 0);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">Products</label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value=""
          onChange={(e) => {
            const productId = parseInt(e.target.value);
            addSelectedProduct(productId);
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id.toString()} className="text-body dark:text-bodydark">
              {product.reference}
            </option>
          ))}
        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>

      {/* Display selected product details */}
      <div className="flex justify-center flex-wrap gap-4">
        {selectedProducts.map((selectedProduct) => (
          <div key={selectedProduct.id} className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-2 text-center">Selected Product Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Name:</span> {selectedProduct.name}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Description:</span>{' '}
                  {selectedProduct.description}
                </p>
                <p className={`font-semibold ${selectedProduct.stock > 100 ? 'text-green-500' : selectedProduct.stock > 50 ? 'text-orange-500' : 'text-red-500'}`}>
                  Stock: {selectedProduct.stock}
                </p>
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Reference:</span>{' '}
                  {selectedProduct.reference}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Brand:</span> {selectedProduct.brand}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Price:</span> {selectedProduct.price_Unit}
                </p>
                <label className="block text-gray-800 dark:text-gray-200">Quantity:</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md py-1 px-2 w-full dark:bg-gray-700"
                  value={selectedProduct.quantity}
                  onChange={(e) => updateQuantity(selectedProduct.id, parseInt(e.target.value))}
                />
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Total Price:</span>{' '}
                  {calculateTotalPrice(selectedProduct)}
                </p>
              </div>
            </div>
            <button
              className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => removeSelectedProduct(selectedProduct.id)}
            >
              <svg
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1C4.477 1 0 5.477 0 11s4.477 10 10 10 10-4.477 10-10S15.523 1 10 1zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M13 7a1 1 0 10-2 0v6a1 1 0 102 0V7zM7 7a1 1 0 112 0v6a1 1 0 11-2 0V7z"
                  clipRule="evenodd"
                />
              </svg>
              Cancel
            </button>
          </div>
        ))}
        <div
          id="alert"
          className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 mt-2 rounded-md text-center"
          style={{ display: 'none' }}
        >
          Product already selected
        </div>
      </div>
      {/* Display total transaction price */}
      {selectedProducts.length > 0 && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2 text-center">Total Order Price</h2>
          <p className="text-gray-800 dark:text-gray-200 text-center">
            {calculateTransactionTotal()}
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectProductSupplier;
