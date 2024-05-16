import { useEffect, useState } from 'react';
import { Route, Routes, useLocation , Navigate } from 'react-router-dom';

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
import { isAdmin , isUser , isAuthenticated } from './components/jwt/jwt';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
                <Route
            index
            element={
              isAdmin() ? (
                <>
                  <PageTitle title="eCommerce Dashboard " />
                  <ECommerce />
                </>
              ) : (
                <Navigate to="/auth/login" replace />
              )
            }
          />
            <Route
          path="/calendar"
          element={
            isAdmin() ? (
              <>
                <PageTitle title="Calendar " />
                <Calendar />
              </>
            ) : (
              <Navigate to="/auth/Signin" replace />
            )
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile " />
              <Profile />
            </>
          }
        />
        
            <Route
          path="/forms/Product"
          element={
            <>
              <PageTitle title="Product" />
           <ProductForm/>
            </>
          }
        />
         <Route
          path="/forms/Transactions"
          element={
            <>
              <PageTitle title="Transactions" />
           <TransactionForm/>
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements " />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout " />
              <FormLayout />
            </>
          }
        />
         <Route
          path="/forms/Supplier"
          element={
            <>
              <PageTitle title="Form Layout " />
              <SupplierForm />
            </>
          }
        />
           <Route
          path="/forms/Operations"
          element={
            <>
              <PageTitle title="Form Layout " />
              <OperationOrderForm />
            </>
          }
        />
         <Route
          path="/forms/Orders"
          element={
            <>
              <PageTitle title="Form Layout " />
              <OrderForm />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables " />
              <Tables />
            </>
          }
        />
            <Route
          path="/Product"
          element={
            <>
              <PageTitle title="Tables " />
              <ProductTables />
            </>
          }
        />
         <Route
          path="/Transaction"
          element={
            <>
              <PageTitle title="Tables " />
              <TransactionsTables />
            </>
          }
        />
           <Route
          path="/Supplier"
          element={
            <>
              <PageTitle title="Tables " />
              <SupplierTable />
            </>
          }
        />
         <Route
          path="/Orders"
          element={
            <>
              <PageTitle title="Tables " />
              <OrderTables />
            </>
          }
        />
           <Route
          path="/Operations"
          element={
            <>
              <PageTitle title="Tables " />
              <OperationTable />
            </>
          }
        />
        
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings " />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart " />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts " />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons " />
              <Buttons />
            </>
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
