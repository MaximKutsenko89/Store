import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/components/ThemeSwitcher/ThemeProvider";
import { Metadata } from "next";
import "@/styles/global.scss";

export const metadata: Metadata = {
   viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};
export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body data-theme="dark">
            <ThemeProvider>
               <Providers>
                  <Header />
                  {children}
                  <Footer />
               </Providers>
            </ThemeProvider>
         </body>
      </html>
   );
}
