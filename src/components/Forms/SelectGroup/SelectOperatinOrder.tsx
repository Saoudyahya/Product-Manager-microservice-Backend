import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../../Backend-api/OrderAPI';
import { getProductById } from '../../Backend-api/ProductAPI';
import SelectPaymentType from './SelectPaymentType'; // Import SelectPaymentType component

interface OrderOperation {
  order: Order;
  paid: boolean;
  payment_type: string;
}

interface Order {
  orderId: number;
  reference: string;
  orderItems: OrderItem[];
  orderType: string;
  orderDate: string;
  totalPrice: number;
  supplier: {
    id: string;
    supplierName: string;
    country: string;
    region: string;
    productIds: number[];
  };
}

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  order_price: number;
}

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

const defaultOrder: OrderOperation = {
  order: {
    orderId: 0,
    reference: '',
    orderItems: [],
    orderType: '',
    orderDate: '',
    totalPrice: 0,
    supplier: {
      id: '',
      supplierName: '',
      country: '',
      region: '',
      productIds: [],
    },
  },
  paid: false, 
  payment_type: 'Cash', 
};

const SelectOperationOrder: React.FC<{
  onOrderChange: (selectedOrders: OrderOperation[]) => void;
  formSubmitted: boolean;
}> = ({ onOrderChange,formSubmitted }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<OrderOperation[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getAllOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchProductsForOrder = async (order: Order) => {
    try {
      const products: Product[] = [];
      for (const orderItem of order.orderItems) {
        const product = await getProductById(orderItem.productId);
        products.push(product);
      }
      return products;
    } catch (error) {
      console.error('Error fetching products for order:', error);
      throw error;
    }
  };

  const addSelectedOrder = async (orderId: number) => {
    const selectedOrder = orders.find((order) => order.orderId === orderId);
    if (selectedOrder && !selectedOrders.find((order) => order.order.orderId === orderId)) {
      try {
        const orderProducts = await fetchProductsForOrder(selectedOrder);
        const defaultValues = { paid: false, payment_type: 'Cash' };
        const updatedOrders = [...selectedOrders, { order: selectedOrder, ...defaultValues }];
        setSelectedOrders(updatedOrders);
        onOrderChange(updatedOrders);
        setProducts(orderProducts);
        console.log(updatedOrders); 
      } catch (error) {
        console.error('Error adding selected order:', error);
      }
    }
  };
  
  useEffect(() => {
    if (formSubmitted) {
  
      setSelectedOrders([]);
    } 
  }, [formSubmitted]);
  
  

  const removeSelectedOrder = (orderId: number) => {
    const updatedSelectedOrders = selectedOrders.filter((order) => order.order.orderId !== orderId);
    setSelectedOrders(updatedSelectedOrders);
    onOrderChange(updatedSelectedOrders);
  };

  const handleIsPaidChange = (orderId: number, value: boolean) => {
    const updatedSelectedOrders = selectedOrders.map((order) => {
      if (order.order.orderId === orderId) {
        console.log(`isPaid changed for orderId ${orderId}:`, value);
        return { ...order, paid: value };
      }
      return order;
    });
    setSelectedOrders(updatedSelectedOrders);
  };
  
  const handlePaymentTypeChange = (orderId: number, value: string) => {
    const updatedSelectedOrders = selectedOrders.map((order) => {
      if (order.order.orderId === orderId) {
        console.log(`Payment type changed for orderId ${orderId}:`, value);
        return { ...order, payment_type: value };
      }
      return order;
    });
    setSelectedOrders(updatedSelectedOrders);
  };
  
  useEffect(() => {
    console.log(selectedOrders);
    onOrderChange(selectedOrders); // Call onOrderChange after the state update
  }, [selectedOrders]); 

  return (
    <div className="mb-8">
      <label className="mb-2 block text-blue-900 dark:text-blue-300 font-bold">Orders</label>

      <div className="relative bg-gray-200 dark:bg-gray-900 rounded-md p-2">
        <select
          value=""
          onChange={(e) => {
            const orderId = parseInt(e.target.value);
            addSelectedOrder(orderId);
          }}
          className="w-full appearance-none rounded border border-blue-500 bg-transparent py-2 px-3 outline-none transition focus:border-blue-700 active:border-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-blue-500 text-blue-900 dark:text-blue-300"
        >
          <option value="">Select Order</option>
          {orders.map((order) => (
            <option key={order.orderId} value={order.orderId} className="text-blue-900 dark:text-blue-300">
              {order.reference}
            </option>
          ))}
        </select>

        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-blue-500 dark:text-blue-300">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
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

      {/* Display selected orders side by side */}
      <div className="flex flex-wrap gap-4 mt-4">
        {selectedOrders.map((selectedOrder) => (
          <div key={selectedOrder.order.orderId} className="p-4 border border-gray-400 rounded-md bg-gray-100 dark:bg-gray-800" style={{ width: 'calc(100%)' }}>
            <h2 className="text-lg font-semibold mb-4 text-center text-blue-900 dark:text-blue-300">Selected Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="col-span-full">
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Order Reference:</span> {selectedOrder.order.reference}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Order Type:</span> {selectedOrder.order.orderType}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Order Date:</span> {selectedOrder.order.orderDate}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Total Price:</span> {selectedOrder.order.totalPrice}
                </p>
                {/* Supplier Information */}
                <div className="mt-4 border-t border-gray-400 pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-center text-blue-900 dark:text-blue-300">Supplier Information</h3>
                  <p className="text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">Supplier Name:</span> {selectedOrder.order.supplier.supplierName}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">Country:</span> {selectedOrder.order.supplier.country}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">Region:</span> {selectedOrder.order.supplier.region}
                  </p>
                </div>
                <div className="mt-4 border-t border-gray-400 pt-4">
                  <div>
                    <SelectPaymentType onPaymentTypeChange={(selectedType) => handlePaymentTypeChange(selectedOrder.order.orderId, selectedType)} />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <label className="block mb-2 text-lg font-semibold text-black dark:text-white">Is Paid</label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedOrder.paid}
                          onChange={(e) => handleIsPaidChange(selectedOrder.order.orderId, e.target.checked)}
                          className="ml-2 h-6 w-6 text-blue-500 focus:ring-blue-500 border-gray-300 rounded dark:text-blue-300 dark:border-gray-600 dark:focus:ring-blue-500 dark:checked:bg-blue-500 dark:checked:border-transparent dark:checked:ring-transparent"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Mark as paid</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {selectedOrder.order.orderItems.map((orderItem) => {
                const product = products.find((product) => product.id === orderItem.productId);
                return product ? (
                  <div key={product.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-300">{product.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300">Description: {product.description}</p>
                    <p className="text-gray-700 dark:text-gray-300">Stock: {product.stock}</p>
                    <p className="text-gray-700 dark:text-gray-300">Reference: {product.reference}</p>
                    <p className="text-gray-700 dark:text-gray-300">Brand: {product.brand}</p>
                    <p className="text-gray-700 dark:text-gray-300">Price: {product.price_Unit}$</p>
                    <p className="text-gray-700 dark:text-gray-300">Product Type: {product.productType.name}</p>
                    {/* Display order item attributes */}
                    <p className="text-gray-700 dark:text-gray-300">Quantity: {orderItem.quantity}</p>
                    <p className="text-gray-700 dark:text-gray-300">Order Price: {orderItem.order_price}$</p>
                  </div>
                ) : null;
              })}
            </div>
            <button
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => removeSelectedOrder(selectedOrder.order.orderId)}
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
      </div>
    </div>
  );
};

export default SelectOperationOrder;
