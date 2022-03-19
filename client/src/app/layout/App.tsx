import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  const initApp = useCallback(async () => {
    try {
      dispatch(fetchCurrentUser());
      dispatch(fetchBasketAsync());
    } catch (error) {
      console.log("error", error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  if (loading) return <LoadingComponent message="Initialising App..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            element={<ProtectedRoute redirectTo="/login" isAllowed={!!user} />}
          >
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
