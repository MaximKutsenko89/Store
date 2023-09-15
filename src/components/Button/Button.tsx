
import Link from 'next/link'
import type { ButtonProps } from '@/types/types'
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import './button.scss'

const Border = () => (
    <svg className={`btn-border`}>
        <rect rx="5" ry="5" />
    </svg>
)
export const Spinner = () => <SyncOutlinedIcon className='loading-icon' />

export const Button = ({ children, className, variant, href, border, onClick, loading, disabled }
    : ButtonProps) => {
    if (variant === 'link') {
        return (
            <Link
                href={href || ''}
                className={className}
                onClick={onClick}
            >
                {children}
                {border && <Border />}
            </Link>
        )

    }
    return (
        <button
            className={className}
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
