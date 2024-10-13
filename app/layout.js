import "./css/card.scss";
import "./css/globals.scss";
import Navbar from "./components/navbar";
import { Inter } from "next/font/google";
import Footer from "./components/footer";
const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/helper/scroll-to-top";
import { GoogleTagManager } from "@next/third-parties/google";


export const metadata = {
    title: "Portfolio of Wajahat Ullah - Computer Vision Engineer",
    description:
        "Wajahat Ullah is a Computer Vision Engineer with a passion for developing innovative solutions. Explore his portfolio to learn more about his work.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body className={inter.className}>
                <ToastContainer />
                <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
                    <Navbar />
                    {children}
                    <ScrollToTop />
                </main>
                <Footer />
            </body>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
        </html>
    );
}
