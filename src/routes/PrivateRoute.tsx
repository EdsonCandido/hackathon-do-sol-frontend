import { useAuth } from "@/hooks/useAuth";
import { Center, Spinner } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";

const LoadingScreen = () => (
  <Center minH="100vh">
    <Spinner size="xl" color="blue.500" />
  </Center>
);

export const AdminRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <LoadingScreen />;

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const ClientRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <LoadingScreen />;

  if (!isAuthenticated || user?.role !== "cliente") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const PublicClientRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <LoadingScreen />;

  if (isAuthenticated && user?.role === "cliente") {
    return <Navigate to="/minha-conta" replace />;
  }

  if (isAuthenticated && user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};
