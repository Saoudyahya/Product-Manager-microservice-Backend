import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import Operation from '../components/Tables/Operation';
const OperationTable = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Operation Table" />

      <div className="flex flex-col gap-10">
      <Operation/>
      </div>
    </DefaultLayout>
  );
};

export default OperationTable;
