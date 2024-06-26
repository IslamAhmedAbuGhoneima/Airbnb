import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import LoginModel from "./components/model/LoginModel";
import { FormProvider } from "./context/FormContext";
import SingupModel from "./components/model/SingupModel";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Airbnb",
    description: "Airbnb clone for booking and reserve house",
};

export default function RootLayout({ children }) {

    return (
        <html lang="en" >
            <body className={inter.className} >
                <FormProvider>
                    <Navbar />
                    <div className="pt-24">
                        {children}
                    </div>
                    <SingupModel />
                    <LoginModel />
                </FormProvider>
            </body>
        </html>
    );
}