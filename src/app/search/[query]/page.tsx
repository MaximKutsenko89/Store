import type { Metadata } from 'next'
import { ProductCard } from '@/components/ProductCard/ProductCard'
import { fetchData } from '@/services/index'
import { Response } from '@/types/types'
import styles from '@/components/ProductsList/productList.module.scss'
import { NotFoundComponent } from '@/components/NotFoundComponent/NotFoundComponent'
import { AnimatedTitle } from '@/components/AnimatedTitle/AnimatedTitle'

export const metadata: Metadata = {
    title: 'Results',
    description: 'Next test',
}
export default async function Page({ params }: { params: { query: string } }) {
    const data = await fetchData<Response>(`search?q=${params.query}`)
    const length = data.products.length

    if (length === 0) {
        return (
            <main className={styles.home}>
                <div className="container">
                    <NotFoundComponent title={`No results for ${params.query}`} link={true} />
                </div>
            </main>
        )
    }

    return (
        <main className={styles.home}>
            <div className='container'>
                <AnimatedTitle tagName='h1'>Found {length} product{length > 1 ? 's' : ''}</AnimatedTitle>
                <div className={styles.homeInner}>
                    {data && data.products.map((item) => {
                        return (
                            <ProductCard
                                key={item.id}
                                {...item}
                            />
                        )
                    })}
                </div>
            </div>
        </main>
    )
}