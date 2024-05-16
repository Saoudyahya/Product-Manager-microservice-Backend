import  { useState , useEffect } from 'react';
import SelectGroupTwo from '../../../components/Forms/SelectGroup/SelectContrySupplier';
import FormProductSupplier from '.././FormProductSupplier';
import { createProduct } from '../../../components/Backend-api/ProductAPI';
import { updateSupplier } from '../../../components/Backend-api/SupplierAPi';

const UpdateSupplierForm: React.FC<{
    Supplier: any;
    onClose: () => void;
    onRefetch: () => void;
  }> = ({ Supplier, onClose, onRefetch }) => {
  const [uploadedProducts, setUploadedProducts] = useState([]);
  const [supplierData, setSupplierData] = useState({
    supplierId:'',
    supplierName: '',
    country: '',
    region: '',
    productIds: [],
  });
  
  useEffect(() => {
    setSupplierData(Supplier)
    console.log(Supplier);
    
  }, []);

  const handleProductUpload = (productData) => {
    setUploadedProducts([...uploadedProducts, productData]);
    console.log(uploadedProducts);
  };



  const handleCountryChange = (country) => {
    setSupplierData({
      ...supplierData,
      country: country
    });
  };
  const handlesupplierNameChange = (e) => {
    const name = e.target.value;
    setSupplierData({
      ...supplierData,
      supplierName: name
    });
  };
  
  const handleRegionChange = (region) => {
    setSupplierData({
      ...supplierData,
      region: region
    });
  };

  const handleCancelProduct = (productId) => {
    const updatedProducts = uploadedProducts.filter(product => product.id !== productId);
    setUploadedProducts(updatedProducts);
  };



  const handleSubmitSupplier = async (e) => {
    e.preventDefault();
    try {
      const productCreationPromises = uploadedProducts.map(async (productData) => {
        const createdProduct = await createProduct(productData);
        console.log('Product created successfully:', createdProduct);
        return createdProduct.id;
      });
      const productIds = await Promise.all(productCreationPromises);
      const updatedSupplierData = {
        ...supplierData,
        productIds: productIds
      };
      const UpdateSupplier = await updateSupplier(updatedSupplierData.supplierId, updatedSupplierData);
      onClose()
      onRefetch()
      console.log('Supplier created successfully:', UpdateSupplier);
      console.log('Supplier created successfully:', updatedSupplierData);
      setUploadedProducts([]);
      setSupplierData({
        supplierId:'',
        supplierName: '',
        country: '',
        region: '',
        productIds: [],
      });
    } catch (error) {
      console.error('Error creating supplier product:', error);
    }
  };
  
  return (
    <>

      <div className="gap-9 sm:grid-cols-2 mt-10">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              update   Supplier Form
              </h3>
            </div>
            <form>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter supplier name"
                     name='supplierName'
                      onChange={handlesupplierNameChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <SelectGroupTwo
                      onCountryChange={handleCountryChange}
                      onRegionChange={handleRegionChange}
                    />
                  </div>
                </div>
                <div>
                  <FormProductSupplier onProductUpload={handleProductUpload} />
                </div>

                <div className="flex justify-center flex-wrap gap-4">
                  {uploadedProducts.map((selectedProduct) => (
                    <div key={selectedProduct.id} className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800">
                      <h2 className="text-lg font-semibold mb-2 text-center">Selected Product Details</h2>
                      <div className="grid grid-cols-2 gap-8">
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
                        </div>
                      </div>
                      <button type='button'
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
                        onClick={() => handleCancelProduct(selectedProduct.id)}
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
           
                <button onClick={handleSubmitSupplier} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-10">
                  update Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
  );
};

export default UpdateSupplierForm;
