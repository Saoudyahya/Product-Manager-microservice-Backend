import React, { useState, useEffect, useRef } from 'react';
import { getAllOperations ,deleteOperation} from '../Backend-api/OperationAPI';
import UpdateOperationOrderForm from '../../pages/Form/update-forms/UpdateOperationForm';

const Operation = () => {
  const [operations, setOperations] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const operationRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const operationsData = await getAllOperations();
        setOperations(operationsData);
      } catch (error) {
        console.error('Error fetching operations data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOperationClick = (operation) => {
    setSelectedOperation(operation);
   
    
    operationRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClosePopUp = () => {
    setSelectedOperation(null);
  };

  const filteredOperations = operations.filter(operation =>
    operation.operationReference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateOperation = () => {
    setShowUpdateForm(true);
  };
  const handleDataRefetch = async () => {
    try {
      const updatedOperation = await getAllOperations(); 
      setOperations(updatedOperation); 
      if (selectedOperation) {
        const updatedSelectedOperation = updatedOperation.find(operation => operation.operationId === selectedOperation.operationId);
        setSelectedOperation(updatedSelectedOperation); 
      }
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };
  const handleDeleteOperation = async () => {
    try {
      console.log(selectedOperation.operationId);
      await deleteOperation(selectedOperation.operationId);
      setOperations(operations.filter(operation => operation.operationId !== selectedOperation.operationId));
      setSelectedOperation(null);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };


  return (
    <div className="mt-4 relative">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by operation reference"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
      </div>
      <div ref={operationRef} />
      {selectedOperation && (
        <div className="bg-white mb-10 dark:bg-gray-800 shadow-md rounded-lg p-6 col-span-full">
          <h2 className="text-lg font-semibold mb-2 text-blue-400">Operation Details</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Operation ID:</span> {selectedOperation.operationId}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Operation Reference:</span> {selectedOperation.operationReference}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Operation State:</span> {selectedOperation.operationState}
          </p>
          <div className="mt-2">
            <h2 className="text-lg font-semibold mb-1">Order Details :</h2>
            {selectedOperation.orderOperations.map((orderOp, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
                <h2 className="text-lg font-semibold mb-2 text-blue-400">Order Details</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Order ID:</span> {orderOp.order.orderId}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Order Date:</span> {orderOp.order.orderDate}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Reference:</span> {orderOp.order.reference}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Total Price:</span> {orderOp.order.total_price}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Supplier:</span> {orderOp.order.supplier.supplierName}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Paid:</span>
                  <span className={orderOp.paid ? 'text-green-700' : 'text-red-800'}>
                    {orderOp.paid ? 'Yes' : 'No'}
                  </span>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Payment Type:</span> {orderOp.payment_type}
                </p>
              </div>
            ))}
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 mr-5" onClick={handleClosePopUp}>
            Close
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mt-4 mr-5" onClick={handleUpdateOperation}>
            Update
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4 mr-5" onClick={handleDeleteOperation}>
            Delete
          </button>
          {showUpdateForm && <UpdateOperationOrderForm Operation={selectedOperation}  onRefetch={handleDataRefetch}  onClose={() => setShowUpdateForm(false)} />}

        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredOperations.map((operation, operationIndex) => (
          <div key={operationIndex} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Operation Details</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Operation ID:</span> {operation.operationId}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Operation Reference:</span> {operation.operationReference}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Operation State:</span> {operation.operationState}
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4" onClick={() => handleOperationClick(operation)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Operation;
