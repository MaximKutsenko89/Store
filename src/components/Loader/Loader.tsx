
import styles from './Loader.module.scss'
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';

export const Loader = () => {
    return (
        <div className={styles.loaderWrap}>
            <SyncOutlinedIcon/>
        </div>
    )
}
