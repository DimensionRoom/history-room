"use client";
import React, { useState, useEffect } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { usePathname } from "next/navigation";
import { Quicksand, Mitr } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/Provider/TranslationsProvider";
import mainLoad from "./../../../public/jsons/mainload.json";
import MainLoading from "@/components/Loading/MainLoading";
import styles from "./page.module.scss";

const i18nNamespaces = ["homeScreen"];
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});
export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [offsetY, setOffsetY] = useState(0);
  const currentPathname = usePathname();

  useEffect(() => {
    async function fetchTranslations() {
      const { t, resources } = await initTranslations(locale, i18nNamespaces);
      setT(() => t);
      setResources(resources);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
    fetchTranslations();
  }, [locale]);

  if (loading) {
    return <MainLoading />;
  }

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className={styles.Container}>
        <div className={styles.MainPannel}>
          <div className={styles.LeftMediumPannel}>
            <div className={styles.RowPannel}>
              <div className={styles.Window}>
                <div className={styles.Content}></div>
              </div>
            </div>
            <div className={styles.RowPannel}>
              <div className={styles.Frame}>
                <div className={styles.Content}></div>
              </div>
              <div className={styles.Frame}>
                <div className={styles.Content}></div>
              </div>
              <div className={styles.Frame}>
                <div className={styles.Content}></div>
              </div>
              <div className={styles.Frame}>
                <div className={styles.Content}></div>
              </div>
              <div className={styles.Frame}>
                <div className={styles.Content}></div>
              </div>
            </div>
          </div>
          <div className={styles.SmallPannel}>
            <div className={styles.ColumnPannel}>
              <div className={styles.Frame}>
                <div className={styles.Content}></div>
              </div>
              <div className={styles.Frame}>
                <div className={styles.Content}></div>
              </div>
              <div className={styles.Frame}>
                <div className={styles.Content}></div>
              </div>
            </div>
          </div>
          <div className={styles.LargePannel}>
            <div className={`${styles.RowPannel} ${styles.FullRowPannel}`}>
              <div className={styles.LargeWindow}>
                <div className={styles.Content}></div>
              </div>
            </div>
          </div>
          <div className={styles.RightMediumPannel}>
            <div className={styles.RowPannel}>
            <div className={styles.LargeShelf}>
                <div className={styles.Content}></div>
              </div>
            </div>
            <div className={styles.RowPannel}>
              <div className={styles.LargeShelf}>
                <div className={styles.Content}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TranslationsProvider>
  );
}
