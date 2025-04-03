import { AuthProvider } from "../context/AuthContext";
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