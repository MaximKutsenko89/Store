import type { Metadata } from 'next'
import { ProductsList } from '@/components/ProductsList/ProductsList'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Next test',
}
export default function HomePage() {
  return (
    <main>
      <div className="container">
        <ProductsList />
      </div>
    </main>
  )
}

