import { Center, Spinner } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { AdminRoute, ClientRoute, PublicClientRoute } from "./PrivateRoute";

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const RotasPage = lazy(() =>
  import("@/pages/RotasPage").then((m) => ({ default: m.RotasPage })),
);
const RotaDetailPage = lazy(() =>
  import("@/pages/RotaDetailPage").then((m) => ({ default: m.RotaDetailPage })),
);
const AdminDashboardPage = lazy(() =>
  import("@/pages/AdminDashboardPage").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
const ClienteLoginPage = lazy(() =>
  import("@/pages/ClienteLoginPage").then((m) => ({
    default: m.ClienteLoginPage,
  })),
);
const ClienteDashboardPage = lazy(() =>
  import("@/pages/ClienteDashboardPage").then((m) => ({
    default: m.ClienteDashboardPage,
  })),
);

const PageLoader = () => (
  <Center minH="100vh">
    <Spinner size="xl" color="blue.500" />
  </Center>
);

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<HomePage />),
  },
  {
    path: "/rotas",
    element: withSuspense(<RotasPage />),
  },
  {
    path: "/rotas/:id",
    element: withSuspense(<RotaDetailPage />),
  },
  {
    element: <PublicClientRoute />,
    children: [
      {
        path: "/login",
        element: withSuspense(<ClienteLoginPage />),
      },
    ],
  },
  {
    element: <ClientRoute />,
    children: [
      {
        path: "/minha-conta",
        element: withSuspense(<ClienteDashboardPage />),
      },
    ],
  },
  {
    path: "/admin/login",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: "/admin",
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "/admin/dashboard",
        element: withSuspense(<AdminDashboardPage />),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
