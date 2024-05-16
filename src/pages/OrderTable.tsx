import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import Orders from '../components/Tables/Order';
const OrderTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order Table" />

      <div className="flex flex-col gap-10">
      <Orders/>
      </div>
    </DefaultLayout>
  );
};

export default OrderTables;
