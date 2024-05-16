import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState  ,useEffect } from 'react';
import SelectOperationOrder from '../../components/Forms/SelectGroup/SelectOperatinOrder';
import SelectOprationState from '../../components/Forms/SelectGroup/SelectOprationState';
import { createOperation } from '../../components/Backend-api/OperationAPI';
const OperationOrderForm = () => {  
  const initialOrderOperation = {
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
    paid: '', 
    payment_type: '', 
  };
 const initialOperation ={
  orderOperations: [initialOrderOperation],
  operationReference: '',
  operationState: ''

 }
  const [formData, setFormData] = useState(initialOperation);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleOrderchangeChange = (selectedOrder) => {
  
    setFormData(prevFormData => {
      const updatedFormData = { ...prevFormData, orderOperations: selectedOrder };
      return updatedFormData;
    });    
   
  };


  const handleoperationStateChange = (selectedOperationstate :any ) => {
    setFormData(prevFormData => ({ ...prevFormData, operationState: selectedOperationstate }));
  };
  
  const handleoperationRefrenceChange = (e) => {
    const reference = e.target.value;
    setFormData(prevFormData => ({ ...prevFormData, operationReference: reference }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
     console.log(formData)
  
    const response = await createOperation(formData)
    setFormSubmitted(true);
    console.log(response);
    
    try {

    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
 <DefaultLayout>
    <Breadcrumb pageName="Operation-form" />
      <div className=" gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Operation Form
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      reference
                    </label>
                    <input
                      type="text"
                      placeholder="Enter supplier name"
                     name='operationReference'
                 onChange={handleoperationRefrenceChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
        

                  <SelectOprationState onstatechange={handleoperationStateChange} />
                </div>
                </div>
              

                 
                  
        <SelectOperationOrder onOrderChange={handleOrderchangeChange}     formSubmitted={formSubmitted} ></SelectOperationOrder>
  
             
             
            
                <button  onClick={handleSubmit} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                 Uploade Operation
                </button>
              </div>
            </form>
          </div>
        </div>

      
      </div>
      </DefaultLayout>
  );
};

export default OperationOrderForm;
