
import SelectProductSupplier from '../../../components/Forms/SelectGroup/SelectProductSupplier';
import DatePickerOne from '../../../components/Forms/DatePicker/DatePickerOne';
import SelectTypeOrder from '../../../components/Forms/SelectGroup/SelectTypeOrder';
import SelectSupplierName from '../../../components/Forms/SelectGroup/SelectSupplierName';
import { useState,useEffect } from 'react';
import { updateOrder } from '../../../components/Backend-api/OrderAPI';
const UpdateOrderForm: React.FC<{
    Order: any;
    onClose: () => void;
    onRefetch: () => void;
  }> = ({ Order, onClose, onRefetch }) => {

  const [productIds, setProductIds] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
 

  useEffect(() => {
   setFormData(Order)
  }, []);
  const [formData, setFormData] = useState({
    orderId:'',
    reference: '',
    products: [],
    OrderType: 'LOCAL',
    OrderDate: '',
    totalPrice: 0,
    supplier: {
      supplierId: '',
      supplierName: '',
      country: '',
      region: '',
      productIds: [],
    },

  });

  const handleProductChange = (selectedProducts) => {
    setFormData({ ...formData, products: selectedProducts });
  };

  const handlesupplierChange = (selectedsupplier) => {
    setFormData(prevFormData => ({ ...prevFormData, supplier: selectedsupplier }));
    setProductIds(selectedsupplier.productIds);
    console.log(selectedsupplier)
  };
   

  const handleQuantityChange = (productId, quantity) => {
    const updatedProducts = formData.products.map((product) =>
      product.id === productId ? { ...product, quantity } : product
    );
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleDateChange = (selectedDate) => {
    setFormData({ ...formData, OrderDate: selectedDate });
  };

  const handleOrderTypeChange = (selectedType) => {
    setFormData({ ...formData, OrderType: selectedType });
  
  };
  const handleOrderReferenceChange = (e) => {
    const reference = e.target.value;
    setFormData({
      ...formData,
        reference: reference
    });
    console.log(formData.reference);

  };

  const handleTotalPriceChange = (totalPrice) => {
    setFormData({ ...formData, totalPrice });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const orderData = {
        orderId: formData.orderId,
        supplier: {
          supplierId: formData.supplier.supplierId,
          supplierName: formData.supplier.supplierName,
          country: formData.supplier.country,
          region: formData.supplier.region, 
          productIds: formData.supplier.productIds
        },
        orderItems: formData.products.map(product => ({
          productId: product.id,
          quantity: product.quantity,
          order_price: product.price_Unit * product.quantity
        })),
        orderType: formData.OrderType,
        orderDate:formData.OrderDate, 
        reference: formData.reference, 
        total_price: formData.totalPrice 
      };
      
      console.log('Product created successfully:', formData.products);
      console.log('Product created successfully:', formData.orderId);
      console.log('Product created successfully:', orderData.orderId);
      console.log('Product created successfully:', orderData);
      console.log('Product created successfully:', orderData.supplier);
      const response = await updateOrder(orderData.orderId,orderData);
      console.log('Product created successfully:', response);
      onClose()
      onRefetch();
      setFormSubmitted(true);
      setFormData({
        orderId:'',
        reference: '',
        products: [],
        OrderType: '',
        OrderDate: '',
        totalPrice: 0,
        supplier: {
          supplierId: '',
          supplierName: '',
          country: '',
          region: '',
          productIds: [],
        }
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  
  <div className="mb-4.5">
  <label className="mb-2.5 block text-black dark:text-white">
  Supplier
  </label>
  <input
    type="text"
    placeholder="Select subject"
    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
  />
</div>


  return (
    <>

      <div className=" gap-9 sm:grid-cols-2 mt-10">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Order Form
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
                     name='reference'
                      onChange={handleOrderReferenceChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
        

                  <DatePickerOne onDateChange={handleDateChange} />
                </div>
                </div>
                <SelectSupplierName  onSupplierChange={handlesupplierChange} initialSupplier={Order.supplier} />
                <SelectProductSupplier
                  onProductChange={handleProductChange}
                  onQuantityChange={handleQuantityChange}
                  onTotalPriceChange={handleTotalPriceChange}
                  productIds={productIds}
                  formSubmitted={formSubmitted}
                />
                 <SelectTypeOrder  onchangeOrderType={handleOrderTypeChange} />
                 


             
            
                 <div className="flex justify-between mt-4">
  <button className="flex-1 mr-2 rounded bg-green-500 p-3 font-medium text-white hover:bg-green-600" onClick={handleSubmit}>
    Update Order
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

export default UpdateOrderForm;
