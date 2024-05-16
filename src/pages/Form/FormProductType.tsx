import React, { useState } from 'react';

import { createProductType } from '../../components/Backend-api/ProductTypeApi';

const ProductTypeForm = () => {
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    createProductType({ name })
   
      .then((response) => {
        console.log("Product type created successfully:", response);
      })
      .catch((error) => {
        console.error("Error creating product type:", error);
      });
      setName("");
  };

  return (
    <>
     
      <div className="gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Product Form
              </h3>
            </div>
            <form >
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 ">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                  name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleChange}
                    placeholder="Enter your new type"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                  <button onClick={handleSubmit} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" type="submit">
                    Create Product Type
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  </>
  );
};

export default ProductTypeForm;
