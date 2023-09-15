'use client'
import React, { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useRouter } from 'next/navigation'
import { Button } from '../Button/Button';
import { motion } from 'framer-motion';
import { slideUpVariants } from '@/utils/animationVariants';
import styles from './SearchForm.module.scss'

export const SearchForm = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const router = useRouter()

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
    }

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        router.push(`/search/${encodeURIComponent(searchValue.trim())}`)
    }
    return (
        <div className={styles.searchInputWrap}>
            <form onSubmit={submitHandler} >
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={slideUpVariants(0.6)}
                    className={styles.formGroup}
                >
                    <div className={styles.searchInputGroup}>
                        <input
                            className={styles.input}
                            type="text"
                            name='search'
                            onChange={changeHandler}
                            placeholder='Search products'
                            value={searchValue}
                            required
                        />
                        <svg className={styles.inputBorder}>
                            <rect rx="5" ry="5" />
                        </svg>
                        <SearchOutlinedIcon className={styles.searchIcon} />
                    </div>
                    <Button
                        variant='button'
                        border={true}
                        loading={false}
                        className='btn transparent inline'
                    >
                        Search
                    </Button>
                </motion.div>

            </form>
        </div>
    )
}
