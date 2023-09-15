import { NotFoundComponent } from "@/components/NotFoundComponent/NotFoundComponent";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Not found',
    description: 'Next test',
}
export default function NotFoundPage() {
    return <NotFoundComponent title=" 404 Page not found" link={true} />
}