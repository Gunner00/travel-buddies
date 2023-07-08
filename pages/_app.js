import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import "../styles/styles.css";

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Toaster />
            <Component {...pageProps} />;
        </div>
    );
}

export default MyApp;
