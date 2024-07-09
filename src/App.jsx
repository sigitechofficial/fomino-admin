import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Home from "./pages/home/Home";
import routes from "./routes/routes";
import { Suspense } from "react";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";

function App() {
  return (
    <>
      <ToastContainer />
      <ChakraProvider>
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Home />} />
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
