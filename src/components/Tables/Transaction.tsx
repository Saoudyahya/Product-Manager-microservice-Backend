import React, { useState, useEffect } from 'react';
import { getAllTransaction, deleteTransaction } from '../Backend-api/TransactionAPi';
import ReactCountryFlag from "react-country-flag";
import UpdateTransactionForm from '../../pages/Form/update-forms/updateTransactionForm';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsData = await getAllTransaction();
        setTransactions(transactionsData);
        setFilteredTransactions(transactionsData); 
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowUpdateForm(false);
  };

  const handleCloseDetails = () => {
    setSelectedTransaction(null);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = transactions.filter(transaction =>
      transaction.references.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };
  const handleDeleteTransaction = async () => {
    try {
      const updatedTransactions = transactions.filter(trans => trans.id !== selectedTransaction.id);
      setTransactions(updatedTransactions);
      setSelectedTransaction(null);
      await deleteTransaction(selectedTransaction.id);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      setTransactions(prevTransactions => [...prevTransactions, selectedTransaction]);
      setSelectedTransaction(null);
    }
  };
  const handleUpdateTransaction = () => {
    setShowUpdateForm(true);
  };

  const handleDataRefetch = async () => {
    try {
      const updatedTransactions = await getAllTransaction(); 
      setTransactions(updatedTransactions); 
      if (selectedTransaction) {
        const updatedSelectedTransaction = updatedTransactions.find(trans => trans.id === selectedTransaction.id);
        setSelectedTransaction(updatedSelectedTransaction); 
      }
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };
  
  return (
    <div className="mt-4 relative">
        <input
        type="text"
        className="border border-gray-300 rounded-md px-3 py-1 w-full mb-4"
        placeholder="Search by reference..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {selectedTransaction && (
        <div className="bg-white mb-10 dark:bg-gray-800 shadow-md rounded-lg p-6 col-span-full">
       
          <h2 className="text-lg font-semibold mb-2 text-blue-400">Transaction Details</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Transaction Type:</span> {selectedTransaction.transactionType}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Transaction Date:</span> {selectedTransaction.transactionDate}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Client:</span> {selectedTransaction.client}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Payment Method:</span> {selectedTransaction.payment_method}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Total Price:</span> {selectedTransaction.totalPrice}$
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">References:</span> {selectedTransaction.references}
          </p>
          <h2 className="text-lg font-semibold mb-2 text-blue-400">Products</h2>
          {selectedTransaction.products.map((product, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 mt-2">
              <h3 className="font-semibold">Product {index + 1}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Name:</span> {product.product.name}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Price:</span> {product.product.price_Unit}$
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Quantity:</span> {product.quantity}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Total Price:</span> {product.total_price}$
              </p>
            </div>
          ))}
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 mr-5"  onClick={handleCloseDetails}>
            Close
          </button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mt-4 mr-5" onClick={handleUpdateTransaction}>
        Update
      </button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4 mr-5" onClick={handleDeleteTransaction}>
        Delete
      </button>
      {showUpdateForm && <UpdateTransactionForm transaction={selectedTransaction}  onClose={() => setShowUpdateForm(false)} onRefetch={handleDataRefetch} />
}

        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {filteredTransactions.map((transaction, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Transaction Details</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Transaction Type:</span> {transaction.transactionType}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Transaction Date:</span> {transaction.transactionDate}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Client:</span> {transaction.client}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Payment Method:</span> {transaction.payment_method}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Total Price:</span> {transaction.totalPrice}$
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">References:</span> {transaction.references}
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4" onClick={() => handleShowDetails(transaction)}>
              Show Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
