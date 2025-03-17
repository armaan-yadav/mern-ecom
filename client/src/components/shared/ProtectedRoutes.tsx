import { useAppSelector } from "@/hooks/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  redirect?: string;
  onlyUnauthenticated?: boolean;
  children?: ReactNode;
}

const ProtectedRoutes = ({
  redirect = "/",
  onlyUnauthenticated = false,

  children,
}: Props) => {
  const { user } = useAppSelector((state) => state.user);

  // For login/signup pages: redirect if user IS logged in
  if (onlyUnauthenticated && user) return <Navigate to={redirect} replace />;

  // For protected pages: redirect if user is NOT logged in
  if (!onlyUnauthenticated && !user) return <Navigate to={redirect} replace />;

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoutes;
