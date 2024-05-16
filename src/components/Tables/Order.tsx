import React, { useState, useEffect, useRef } from 'react';
import { getAllOrders ,deleteOrder } from '../Backend-api/OrderAPI';
import ReactCountryFlag from "react-country-flag";
import countryCodes from '../Charts/contrycode';
import UpdateOrderForm from '../../pages/Form/update-forms/UpdateOrderForm';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false); 

  const orderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getAllOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    orderRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClosePopUp = () => {
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter(order =>
    order.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.supplier.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(selectedOrder.orderId);
      // Filter out the deleted order from the orders list
      setOrders(orders.filter(order => order.orderId !== selectedOrder.orderId));
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleUpdateOrder = () => {
    setShowUpdateForm(true);
  };
  const handleDataRefetch = async () => {
    try {
      const updatedProducts = await getAllOrders(); 
      setOrders(updatedProducts); 
      if (selectedOrder) {
        const updatedSelectedOrder = updatedProducts.find(order => order.orderId === selectedOrder.orderId);
        setSelectedOrder(updatedSelectedOrder); 
      }
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };
  return (
    <div className="mt-4 relative">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by order ID or supplier name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
      </div>
      <div ref={orderRef} />
      {selectedOrder && (
        <div className="bg-white mb-10 dark:bg-gray-800 shadow-md rounded-lg p-6 col-span-full">
          <h2 className="text-lg font-semibold mb-2 text-blue-400">Order Details</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Order ID:</span> {selectedOrder.orderId}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Supplier:</span> {selectedOrder.supplier.supplierName}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Country:</span> {selectedOrder.supplier.country}  <ReactCountryFlag countryCode={countryCodes[selectedOrder.supplier.country]} svg />
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Region:</span> {selectedOrder.supplier.region}
          </p>
          <div className="mt-2">
            <h2 className="text-lg font-semibold mb-1">Order Items</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Total Order Items:</span> {selectedOrder.orderItems.length}
            </p>
            <ul>
              {selectedOrder.orderItems.map((item, index) => (
                <li key={index} className="mb-1">
                  Product ID: {item.productId}, Quantity: {item.quantity} items, Price: {item.order_price}$
                </li>
              ))}
            </ul>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Order Type:</span> {selectedOrder.orderType}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Order Date:</span> {selectedOrder.orderDate}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Reference:</span> {selectedOrder.reference}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Total Price:</span> {selectedOrder.total_price}$
          </p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 mr-5" onClick={handleClosePopUp}>
            Close
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mt-4 mr-5" onClick={handleUpdateOrder}>
            Update
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4 mr-5" onClick={handleDeleteOrder}>
            Delete
          </button>
          {showUpdateForm && <UpdateOrderForm Order={selectedOrder}  onRefetch={handleDataRefetch}  onClose={() => setShowUpdateForm(false)} />}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredOrders.map((order, orderIndex) => (
          <div key={orderIndex} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Order Details</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Total Order Items:</span> {order.orderItems.length}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Supplier:</span> {order.supplier.supplierName}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Country:</span> {order.supplier.country}  <ReactCountryFlag countryCode={countryCodes[order.supplier.country]} svg />
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Region:</span> {order.supplier.region}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Refrence:</span> {order.reference}
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4" onClick={() => handleOrderClick(order)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
