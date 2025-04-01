
import SelectProduct from '../../../components/Forms/SelectGroup/SelectProduct';
import DatePickerOne from '../../../components/Forms/DatePicker/DatePickerOne';
import SelectTransactionType from '../../../components/Forms/SelectGroup/SelectTransactionType';
import { updateTransaction } from '../../../components/Backend-api/TransactionAPi';
import { useState, useEffect } from 'react';
import SelectPaymentType from '../../../components/Forms/SelectGroup/SelectPaymentType';
import SelectClientEmail from '../../../components/Forms/SelectGroup/SelectClientEmail';

const UpdateTransactionForm: React.FC<{
    transaction: any;
    onClose: () => void;
    onRefetch: () => void;
  }> = ({ transaction, onClose, onRefetch }) => {
  const [formData, setFormData] = useState({
    id:'',
    references: '',
    products: [],
    transactionType: '',
    transactionDate: '',
    totalPrice: 0,
    paymentType: '',
    client: '',
  });

  useEffect(() => {
    console.log("Transaction prop:", transaction);
    setFormData(transaction);
  }, [transaction]);
  
  useEffect(() => {
   
    console.log(formData);
}, [formData]);
  

  const [formSubmitted, setFormSubmitted] = useState(false);


  const handleProductChange = (selectedProducts) => {
    setFormData({ ...formData, products: selectedProducts });
  };

  const handleClientChange = (selectedClient) => {
    
    setFormData({ ...formData, client: selectedClient });
  };

  const handleQuantityChange = (productId: any, quantity: any) => {
    const updatedProducts = formData.products.map((product) =>
      product.id === productId ? { ...product, quantity } : product
    );
    setFormData({ ...formData, products: updatedProducts });
  };

 const handleDateChange = (selectedDate: any) => {
  setFormData(prevFormData => ({ ...prevFormData, transactionDate: selectedDate }));
};

  const handlePaymentTypeChange = (selectedType: any) => {
    setFormData({ ...formData, paymentType: selectedType });
  };

  const handleTransactionTypeChange = (selectedType: any) => {
    setFormData({ ...formData, transactionType: selectedType });
  };

  const handleTotalPriceChange = (totalPrice: any) => {
    setFormData({ ...formData, totalPrice });
  };

 const handleReferenceChange = (e) => {
  const { value } = e.target;
  setFormData({ ...formData, references: value });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedProducts = formData.products.map((product) => ({
        product: {
          id: product.id,
          name: product.name,
          price_Unit: product.price_Unit,
          productType: product.productType,
          description: product.description,
          reference: product.reference,
          brand: product.brand,
          stock: product.stock
        },
        total_price: parseInt(product.price_Unit) * parseInt(product.quantity), 
        quantity: product.quantity
      }));
        const data = {
        id:formData.id,
        references:formData.references,
        products: formattedProducts,
        transactionType: formData.transactionType,
        transactionDate: formData.transactionDate,
        client: formData.client,
        payment_method: formData.paymentType,
        totalPrice: formData.totalPrice
      };
      console.log(' created successfully:', data.id);
      onClose()
      onRefetch()
      const response = await updateTransaction(data.id , data);
  
      console.log('Transaction created successfully:', response);
      setFormData({
        id:'',
        references: '',
        products: [],
        transactionType: '',
        transactionDate: '',
        totalPrice: 0,
        paymentType: '',
        client: ''
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
   <>

      <div className=" gap-9 sm:grid-cols-2 mt-10 ">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">update Transaction Form</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">Reference</label>
                    <input
                      type="text"
                      name='reference'
                      placeholder="Enter your Transaction Reference"
                      value={formData.reference}
                      onChange={handleReferenceChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <DatePickerOne onDateChange={handleDateChange} />
                  </div>
                </div>

                <SelectProduct
                  onProductChange={handleProductChange}
                  onQuantityChange={handleQuantityChange}
                  onTotalPriceChange={handleTotalPriceChange}
                  formSubmitted={formSubmitted}
                />
                <SelectTransactionType onTransactionTypeChange={handleTransactionTypeChange} />
                <SelectPaymentType onPaymentTypeChange={handlePaymentTypeChange} />
                <SelectClientEmail onClientChange={handleClientChange} formSubmitted={formSubmitted} />

                <div className="flex justify-between mt-4">
  <button className="flex-1 mr-2 rounded bg-green-500 p-3 font-medium text-white hover:bg-green-600" onClick={handleSubmit}>
    Update Transaction
  </button>
  <button className="flex-1 rounded bg-red-500 p-3 font-medium text-white hover:bg-red-600" onClick={onClose}>
    Cancel
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

export default UpdateTransactionForm;
