import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import styles from "./Loader.module.scss";
export const Loader = () => {
   return (
      <div className={styles.loaderWrap}>
         <SyncOutlinedIcon />
      </div>
   );
};
