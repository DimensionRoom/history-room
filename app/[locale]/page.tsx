"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Quicksand, Mitr } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import initTranslations from "./i18n";
import TranslationsProvider from "@/components/Provider/TranslationsProvider";
import MainLoading from "@/components/Loading/MainLoading";
import { getMoonPhase } from "@/utils/DateAndTime/MoonPhase";
import styles from "./home/page.module.scss";
import { get } from "http";

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
  const [timeOfDay, setTimeOfDay] = useState<string>("daytime");
  const currentPathname = usePathname();
  const { phase, phaseName, phaseNameTH } = getMoonPhase();

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      // const hour = 21;

      if (hour >= 6 && hour < 11) {
        setTimeOfDay("morning");
      } else if (hour >= 11 && hour < 17) {
        setTimeOfDay("daytime");
      } else if (hour >= 17 && hour < 21) {
        setTimeOfDay("evening");
      } else {
        setTimeOfDay("night");
      }
    };
    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    console.log(phaseName);
  }, [phaseName]);

  if (loading) {
    return <MainLoading />;
  }

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className={`${styles.Container} ${styles[timeOfDay]}`}>
        <div className={styles.MainPannel}>
          <div className={styles.LeftMediumPannel}>
            <div className={styles.RowPannel}>
              <div className={`${styles.Window} ${styles[timeOfDay]}`}>
                <div
                  className={`${styles.Content} ${styles[timeOfDay]} ${styles.FrameContent}`}
                >
                  <div className={styles.ContentText}>Coming Soon</div>
                </div>
              </div>
            </div>
            <div className={styles.RowPannel}>
              <div className={styles.Frame}>
                <div className={styles.Content}>Coming Soon</div>
              </div>
              <div className={styles.Frame}>
                <div className={styles.Content}>Coming Soon</div>
              </div>
              <div className={styles.Frame}>
                <div className={styles.Content}>Coming Soon</div>
              </div>
              <div className={styles.Frame}>
                <div className={styles.Content}>Coming Soon</div>
              </div>
              <div className={styles.Frame}>
                <div className={styles.Content}>Coming Soon</div>
              </div>
            </div>
          </div>
          <div className={styles.SmallPannel}>
            <div className={styles.ColumnPannel}>
              <div className={styles.LargeFrame}>
                <div className={styles.Content}>Coming Soon</div>
              </div>
              <div className={styles.LargeFrame}>
                <div className={styles.Content}>Coming Soon</div>
              </div>
              <div className={styles.LargeFrame}>
                <div className={styles.Content}>Coming Soon</div>
              </div>
            </div>
          </div>
          <div className={styles.LargePannel}>
            <div className={`${styles.RowPannel} ${styles.FullRowPannel}`}>
              <div className={`${styles.LargeWindow} ${styles[timeOfDay]}`}>
                <div
                  className={`${styles.Content} ${styles[timeOfDay]} ${styles.FrameContent}`}
                >
                  {timeOfDay === "night" && (
                    <div className={styles.MoonPhaseContainer}>
                      <Image
                        className={styles.MoonPhases}
                        fill
                        src={`/images/sprite/moonphases/${phaseName}.png`}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.RightMediumPannel}>
            <div className={styles.RowPannel}>
              <div className={styles.LargeShelf}>
                <div className={styles.Content}>Coming Soon</div>
              </div>
            </div>
            <div className={styles.RowPannel}>
              <div className={styles.LargeShelf}>
                <div className={styles.Content}>Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TranslationsProvider>
  );
}
