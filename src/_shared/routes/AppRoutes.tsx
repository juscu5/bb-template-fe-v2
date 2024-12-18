import { createHashRouter } from "react-router-dom";
import PublicRoutesWrapper from "../components/PublicRoutesWrapper";
import Login from "@/Login/Login";
import PageNotFound from "@/PageNotFound/PageNotFound";
import Dashboard from "@/Dashboard/Dashboard";
import PrivateRoutesWrapper from "../components/PrivateRoutesWrapper";
import Departments from "@/Departments/";
import Employees from "@/Employees/";
import Customers from "@/Customers/";
import Items from "@/Items/";
import ItemClass from "@/ItemClass/";
import SetPassword from "@/SetPassword/";
import UserActivityLog from "@/UserActivityLog/";
import Syspar from "@/SystemParameters/";
import SecurityCode from "@/SecurityCode/";
import Users from "@/Users";
import Sales from "@/Sales/";

export const AppRoutes = createHashRouter([
  {
    path: "/login",
    element: <PublicRoutesWrapper element={<Login />} />,
  },
  {
    path: "/",
    element: <PrivateRoutesWrapper />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "departments",
        element: <Departments />,
      },
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "customer",
        element: <Customers />,
      },
      {
        path: "item",
        element: <Items />,
      },
      {
        path: "itemclass",
        element: <ItemClass />,
      },
      {
        path: "setpassword",
        element: <SetPassword />,
      },
      {
        path: "useractivitylog",
        element: <UserActivityLog />,
      },
      {
        path: "syspar",
        element: <Syspar />,
      },
      {
        path: "securitycode",
        element: <SecurityCode />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);
