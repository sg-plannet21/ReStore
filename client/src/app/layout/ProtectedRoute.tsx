import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isAllowed: boolean;
  redirectTo: string;
  children?: JSX.Element;
}
export default function ProtectedRoute({
  isAllowed,
  redirectTo,
  children,
}: Props) {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;

  return children ? children : <Outlet />;
}
