import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import Products from '../components/Tables/Products';
const ProductTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Table" />

   
      <Products/>
    
    </DefaultLayout>
  );
};

export default ProductTables;
