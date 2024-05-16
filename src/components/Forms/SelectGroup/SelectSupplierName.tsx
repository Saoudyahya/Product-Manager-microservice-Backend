import React, { useState, useEffect } from 'react';
import { getAllSuppliers } from '../../Backend-api/SupplierAPi';
interface Supplier {
  id: number;
  supplierName: string;
  country: string;  
  region: string;
  productIds: []
}


const SelectSupplierName: React.FC<{
  onSupplierChange: (selectedSupplier: Supplier) => void;
  initialSupplier?: Supplier | null
}> = ({ initialSupplier,onSupplierChange }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  
  
  const fetchSuppliers = async () => {
    try {
      const response = await getAllSuppliers();
      if (Array.isArray(response)) {
        const transformedSuppliers = response.map(supplier => ({
          id: supplier.supplierId,
          supplierName: supplier.supplierName,
          country: supplier.country,
          region: supplier.region,
          productIds: supplier.productIds
        }));
        setSuppliers(transformedSuppliers);
        console.log(suppliers)
      } else {
        console.error('Invalid data returned from API');
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };
  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (initialSupplier) {
      setSelectedSupplier(initialSupplier);
      onSupplierChange(initialSupplier);
    }
  }, [initialSupplier]);

  const handleSupplierChange = (supplierId: number) => {
    const supplier = suppliers.find((supplier) => supplier.id === supplierId);
    if (supplier) {
      setSelectedSupplier(supplier);
      onSupplierChange(supplier);
    }
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">Suppliers</label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
            value=""
            onChange={(e) => {
                const supplierId = parseInt(e.target.value);
                handleSupplierChange(supplierId);
            }}
            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id} className="text-body dark:text-bodydark">
                {supplier.supplierName} {/* Display the supplier name */}
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

      {/* Display selected supplier details */}
      {selectedSupplier && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Supplier Information</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">ID:</span> {selectedSupplier.id}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Name:</span> {selectedSupplier.supplierName}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Location</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Country:</span> {selectedSupplier.country}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">State:</span> {selectedSupplier.state}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectSupplierName;
