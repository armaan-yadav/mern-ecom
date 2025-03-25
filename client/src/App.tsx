import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from "./_root/_test/TestPage";
import Home from "./_root/homePage/HomePage";
import Loading from "./components/shared/Loading";
import ProtectedRoutes from "./components/shared/ProtectedRoutes";
import { Toaster } from "./components/ui/sonner";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { listenToAuthState } from "./redux/user/usersSlice";
import ManageProductPage from "./_admin/manageProduct/ManageProductPage";

// Lazy imports for layouts
const AdminLayout = lazy(() => import("./_admin/AdminLayout"));
const AuthLayout = lazy(() => import("./_auth/AuthLayout"));
const RootLayout = lazy(() => import("./_root/RootLayout"));

// Lazy imports for pages
const Cart = lazy(() => import("./_root/cartPage/CartPage"));
const Search = lazy(() => import("./_root/searchPage/SearchPage"));
const ShippingPage = lazy(() => import("./_root/shippingPage/ShippingPage"));
const LoginPage = lazy(() => import("./_auth/loginPage/LoginPage"));
const SignupPage = lazy(() => import("./_auth/signupPage/SignupPage"));
const MyOrdersPage = lazy(() => import("./_root/myOrdersPage/MyOrdersPage"));
const PaymentPage = lazy(() => import("./_root/paymentPage/PaymentPage"));
const EditProfilePage = lazy(
  () => import("./_root/editProfilePage/EditProfilePage")
);
const SuccessPaymentPage = lazy(
  () => import("./_root/successPaymentPage/SuccessPaymentPage")
);
const OrderDetailsPage = lazy(
  () => import("./_root/orderDetailsPage/OrderDetailsPage")
);

//admin pages
const AdminDashboardPage = lazy(
  () => import("./_admin/dashboard/DashboardPage")
);
const AdminOrdersPage = lazy(() => import("./_admin/orders/OrdersPage"));
const AdminCouponsPage = lazy(() => import("./_admin/coupons/CouponsPage"));
const AdminInventoryPage = lazy(
  () => import("./_admin/inventory/InventoryPage")
);
const AdminProductsPage = lazy(() => import("./_admin/products/ProductsPage"));
const AdminUserssPage = lazy(() => import("./_admin/users/UsersPage"));

function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(listenToAuthState());
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* auth layout */}
          <Route element={<AuthLayout />}>
            {/* only accessible when USER NOT LOGGED IN */}
            <Route
              element={<ProtectedRoutes onlyUnauthenticated redirect="/" />}
            >
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>
          </Route>

          {/* root layout */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />

            {/* protected routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/my-orders" element={<MyOrdersPage />} />
              <Route path="/my-orders/:id" element={<OrderDetailsPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/success-payment" element={<SuccessPaymentPage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
            </Route>

            {/* testting routes //todo : remove krna baad me */}
            <Route path="/test" element={<TestPage />} />
          </Route>

          {/* admin layout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/inventory" element={<AdminInventoryPage />} />
            <Route path="/admin/coupons" element={<AdminCouponsPage />} />
            <Route path="/admin/users" element={<AdminUserssPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route
              path="/admin/manage-product/:productId"
              element={<ManageProductPage />}
            />
          </Route>
        </Routes>
        <Toaster />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
