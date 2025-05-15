import React from "react";
import styles from "./MainLoading.scss";

export type Props = {
  id?: string;
  config?: {
    autoTimeout?: boolean;
    showCounter?: boolean;
    allLoad?: number;
    text?: string;
  };
  counter?: number;
};

const MainLoading = ({
  config = {
    autoTimeout: true,
    showCounter: false,
    allLoad: 0
  },
  counter = 0,
}: Props): JSX.Element => {
  return (
    <div className={styles.LoadingContainer}>
      <div className={styles.LoadingSpriteItem} />
      <div className={styles.TextItems}>
        {config.text && <p>{config.text}</p>}
        {config.showCounter && (
          <p>
            {counter} / {config.allLoad}
          </p>
        )}
      </div>
    </div>
  );
};

export default MainLoading;