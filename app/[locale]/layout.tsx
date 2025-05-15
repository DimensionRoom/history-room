import React, { ReactNode } from 'react';
import type { Metadata } from "next";
import { Quicksand, DotGothic16 } from "next/font/google";
import { dir } from 'i18next';
import { ToastProvider , useToast} from '@/context/ToastContext';
import i18nConfig from '@/i18nConfig';
import "../globals.scss";


const GlobalFont = DotGothic16({
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Dimension Rooms",
  description: "Template Portfolio",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale} dir={dir(locale)} style={{ scrollBehavior: 'smooth' }}>
      <body className={GlobalFont.className}>
        <ToastProvider>   
        {children}
        </ToastProvider>
      </body>
    </html>
  );
}
