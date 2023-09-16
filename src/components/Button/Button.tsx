
import Link from 'next/link'
import type { ButtonProps } from '@/types/types'
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import clsx from 'clsx';
import styles from './button.module.scss'

const Border = () => (
    <svg className={styles.btnBorder}>
        <rect rx="5" ry="5" />
    </svg>
)
export const Spinner = () => <SyncOutlinedIcon className={styles.loadingIcon} />

export const Button = ({
    children,
    variant,
    href,
    border,
    onClick,
    loading,
    disabled, 
    icon,
    fullWidth,
    cartBtn,
    center,
    centerBottom,
    transparent
}: ButtonProps) => {
    
    const buttonClassNames = clsx(styles.btn, {
        [styles.icon] : icon,
        [styles.fullWidth]: fullWidth,
        [styles.cartBtn]: cartBtn,
        [styles.center]:center,
        [styles.centerBottom]:centerBottom,
        [styles.transparent]:transparent,
    })
    
    if (variant === 'link') {
        return (
            <Link
                href={href || ''}
                className={buttonClassNames}
                onClick={onClick}
            >
                {children}
                {border && <Border />}
            </Link>
        )

    }
    return (
        <button
            className={buttonClassNames}
            onClick={onClick}
            disabled={disabled}
        >
            {loading
                ?
                <span>Loading... <Spinner /></span>
                :
                children}
            {border && <Border />}
        </button>
    )
}
