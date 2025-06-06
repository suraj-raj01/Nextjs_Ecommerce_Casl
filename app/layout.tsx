import type { Metadata } from 'next';
import ReduxProvider from './store/ReduxProvider';
import ClerkWrapper from './ClerkWrapper';
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';


export const metadata: Metadata = {
  title: "GiftShop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkWrapper>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </ClerkWrapper>
      </body>
    </html>
  );
}
