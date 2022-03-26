import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAppSelector((state) => state.account);
  let location = useLocation();

  if (!!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
