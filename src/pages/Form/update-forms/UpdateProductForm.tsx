
import React, { useState, useEffect  } from 'react';
import { getAllProductTypes } from '../../../components/Backend-api/ProductTypeApi';
import { updateProduct } from '../../../components/Backend-api/ProductAPI';
import ProductTypeForm from '.././FormProductType';
import Modal from '../../../components/alerts/model';
const UpdateProductForm = ({product,onClose,onRefetch }) => {
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<{ id: number; name: string } | null>({ id: 1, name: '' });
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [showProductTypeForm, setShowProductTypeForm] = useState<boolean>(false); 


  const [formData, setFormData] = useState({
    id: '',
    name: '',
    reference: '',
    brand: '',
    stock: '',
    productType:{
      id: selectedOption.id ,
      name: selectedOption.name
    },
    price_Unit: '',
    description: ''
  });

  const fetchProductTypes = async () => {
    try {
      const types = await getAllProductTypes();
      setProductTypes(types);
    } catch (error) {
      console.error('Error fetching product types:', error);
    }
  };

  useEffect(() => {
    fetchProductTypes();
    console.log(product);
    setFormData(product)
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await updateProduct(formData.id, formData);
      console.log(formData);
      onClose(); 
      onRefetch();
      console.log('Product updated successfully:', response);
     
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
 

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
   <>

   
        <div className="flex flex-col gap-9 mt-10">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                update Product  Form
              </h3>
            </div>
           <form >
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                       name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      name="name"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                    Reference
                    </label>
                    <input
                      type="text"
                      value={formData.reference}
                      onChange={handleChange}
                      name="reference"
                      placeholder="Enter Product reference"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                  Brand <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={handleChange}
                    name="brand"
                    placeholder="Enter Product Brand"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                  Stock
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    name="stock"
                    placeholder="Stock"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                  price_Unite
                  </label>
                  <input
                    type="number"
                    value={formData.price_Unit}
                    name="price_Unit"
                    onChange={handleChange}
                    placeholder="Enter Unite price"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 flex items-center"> 
  <div className="w-full"> 
                    <label className="mb-2.5 block text-black dark:text-white">
                      Product Type
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                    
<select
    value={selectedOption ? selectedOption.id : ''} // Set the value to selectedOption.id
    onChange={(e) => {
        // Find the selected option object from productTypes based on the selected id
        const selectedType = productTypes.find(type => type.id === parseInt(e.target.value));
        
        // Set the selected option object
        setSelectedOption(selectedType || null);

        console.log(selectedType); // Log the selected option object
        changeTextColor();
    }}
    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
        isOptionSelected ? 'text-black dark:text-white' : ''
    }`}
>
    <option value="" disabled className="text-body dark:text-bodydark">
        Select product type
    </option>
    {productTypes.map((type) => (
        <option key={type.id} value={type.id} className="text-body dark:text-bodydark">
            {type.name}
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
                  </div>
                  
                  <div className="flex items-center">
                  <button type="button" onClick={() => setShowProductTypeForm(true)} className="bg-primary text-white rounded-md px-4 py-2 ml-4 hover:bg-opacity-90 mt-7">Add Product type</button>
      
   
      {showProductTypeForm && (
        <Modal onClose={() => setShowProductTypeForm(false)}>
          <ProductTypeForm  />
        </Modal>
      )}
    </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                  Description
                  </label>
                  <textarea
                    rows={6}
                    value={formData.description}
                    name="description"
                    onChange={handleChange}
                    placeholder="Type your Product description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="flex justify-between mt-4">
  <button className="flex-1 mr-2 rounded bg-green-500 p-3 font-medium text-white hover:bg-green-600" onClick={handleSubmit}>
    Update Product
  </button>
  <button className="flex-1 rounded bg-red-500 p-3 font-medium text-white hover:bg-red-600" onClick={onClose}>
    Cancel
  </button>
</div>

              </div>
            </form>
            
          </div>
        </div>

      
        </>
  );
};

export default  UpdateProductForm;
