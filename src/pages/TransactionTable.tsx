import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import Transactions from '../components/Tables/Transaction';
const TransactionsTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Transactions Table" />

     
      <Transactions/>
   
    </DefaultLayout>
  );
};

export default TransactionsTables;
