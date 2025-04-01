import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import ProductForm from './pages/Form/FormProduct';
import TransactionForm from './pages/Form/FormTransaction';
import ProductTables from './pages/ProductTable';
import SupplierForm from './pages/Form/FormSupplier';
import OperationOrderForm from './pages/Form/FormOperation';
import OrderForm from './pages/Form/FormOrder';
import TransactionsTables from './pages/TransactionTable';
import SupplierTable from './pages/SupplierTable';
import OrderTables from './pages/OrderTable';
import OperationTable from './pages/OperationTable';
import { isAdmin, isUser } from './components/jwt/jwt';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const isAuthorized = () => isAdmin() || isUser();

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="eCommerce Dashboard " />
                <ECommerce />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/calendar"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Calendar " />
                <Calendar />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Profile " />
                <Profile />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/Product"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Product" />
                <ProductForm />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/Transactions"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Transactions" />
                <TransactionForm />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Form Elements " />
                <FormElements />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Form Layout " />
                <FormLayout />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/Supplier"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Supplier" />
                <SupplierForm />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/Operations"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Operations" />
                <OperationOrderForm />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/Orders"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Orders" />
                <OrderForm />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Tables " />
                <Tables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/Product"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Product Tables " />
                <ProductTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/Transaction"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Transaction Tables " />
                <TransactionsTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/Supplier"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Supplier Tables " />
                <SupplierTable />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/Orders"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Order Tables " />
                <OrderTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/Operations"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Operation Tables " />
                <OperationTable />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Settings " />
                <Settings />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/chart"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Basic Chart " />
                <Chart />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/ui/alerts"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Alerts " />
                <Alerts />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/ui/buttons"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Buttons " />
                <Buttons />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup " />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
