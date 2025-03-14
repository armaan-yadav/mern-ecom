import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TestPage from "./_root/_test/TestPage";
import Loading from "./components/shared/Loading";
import { Toaster } from "./components/ui/sonner";
import { useAppDispatch } from "./hooks/hooks";
import { listenToAuthState } from "./redux/user/userSlice";

// Lazy imports for layouts
const AdminLayout = lazy(() => import("./_admin/AdminLayout"));
const AuthLayout = lazy(() => import("./_auth/AuthLayout"));
const RootLayout = lazy(() => import("./_root/RootLayout"));

// Lazy imports for pages
const Home = lazy(() => import("./_root/homePage/HomePage"));
const Cart = lazy(() => import("./_root/cartPage/CartPage"));
const Search = lazy(() => import("./_root/searchPage/SearchPage"));
const ShippingPage = lazy(() => import("./_root/shippingPage/ShippingPage"));
const LoginPage = lazy(() => import("./_auth/loginPage/LoginPage"));
const SignupPage = lazy(() => import("./_auth/signupPage/SignupPage"));
const MyOrdersPage = lazy(() => import("./_root/myOrdersPage/MyOrdersPage"));
const PaymentPage = lazy(() => import("./_root/paymentPage/PaymentPage"));
const SuccessPaymentPage = lazy(
  () => import("./_root/successPaymentPage/SuccessPaymentPage")
);
const OrderDetailsPage = lazy(
  () => import("./_root/orderDetailsPage/OrderDetailsPage")
);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(listenToAuthState());
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* auth layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          {/* root layout */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/my-orders/:id" element={<OrderDetailsPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/success-payment" element={<SuccessPaymentPage />} />
            <Route path="/test" element={<TestPage />} />
          </Route>
          {/* admin layout */}
          <Route element={<AdminLayout />}></Route>
        </Routes>
        <Toaster />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
