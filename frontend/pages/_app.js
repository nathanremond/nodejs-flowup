import { AuthProvider } from "../context/AuthContext";

import "../styles/global.css";

import Header from "../layout/header";


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;