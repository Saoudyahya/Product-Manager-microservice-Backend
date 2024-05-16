import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import Supplier from '../components/Tables/Supplier';
const SupplierTable = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Supplier Table" />

     
      <Supplier/>
      
    </DefaultLayout>
  );
};

export default SupplierTable;
