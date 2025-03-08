import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/shared/Loading";

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
const MyOrdersPage = lazy(() => import("./_root/myOrdersPage/MyOrdersPage"));
const PaymentPage = lazy(() => import("./_root/paymentPage/PaymentPage"));
const SuccessPaymentPage = lazy(
  () => import("./_root/successPaymentPage/SuccessPaymentPage")
);
const OrderDetailsPage = lazy(
  () => import("./_root/orderDetailsPage/OrderDetailsPage")
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          S{/* auth layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
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
          </Route>
          {/* admin layout */}
          <Route element={<AdminLayout />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
