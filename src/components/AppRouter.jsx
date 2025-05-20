import { Routes, Route } from "react-router-dom";
import Shop from "../pages/Shop.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Basket from "../pages/Basket.jsx";
import Checkout from "../pages/Checkout.jsx";
import Product from "../pages/Product.jsx";
import Delivery from "../pages/Delivery.jsx";
import NotFound from "../pages/NotFound.jsx";
// import User from "../pages/User.jsx";
import UserOrders from "../pages/UserOrders.jsx";
import UserOrder from "../pages/UserOrder.jsx";
import Admin from "../pages/Admin.jsx";
import AdminOrders from "../pages/AdminOrders.jsx";
import AdminOrder from "../pages/AdminOrder.jsx";
import AdminCategories from "../pages/AdminCategories.jsx";
import AdminBrands from "../pages/AdminBrands.jsx";
import AdminProducts from "../pages/AdminProducts.jsx";
import { AppContext } from "./AppContext.jsx";

import { useContext } from "react";
import { observer } from "mobx-react-lite";
import Success from "../pages/Success.jsx";
import Cancel from "../pages/Cancel.jsx";

const publicRoutes = [
  { path: "/", Component: Shop },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "/product/:id", Component: Product },
  { path: "/basket", Component: Basket },
  { path: "/checkout", Component: Checkout },
  { path: "/delivery", Component: Delivery },
  { path: "/success", Component: Success },
  { path: "/cancel", Component: Cancel },
  { path: "*", Component: NotFound },
];

const authRoutes = [
  // { path: "/user", Component: User },
  { path: "/user/orders", Component: UserOrders },
  { path: "/user/order/:id", Component: UserOrder },
];

const adminRoutes = [
  { path: "/admin", Component: Admin },
  { path: "/admin/orders", Component: AdminOrders },
  { path: "/admin/order/:id", Component: AdminOrder },
  { path: "/admin/categories", Component: AdminCategories },
  { path: "/admin/brands", Component: AdminBrands },
  { path: "/admin/products", Component: AdminProducts },
];

const AppRouter = observer(() => {
  const { user } = useContext(AppContext);
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {user.isAdmin &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
    </Routes>
  );
});

export default AppRouter;
