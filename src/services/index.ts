import ky from 'ky'

const api = ky.create({ prefixUrl: 'https://dummyjson.com/products/' })

export async function fetchData<T>(path: string) {
        const result: T = await api.get(path).json()
        return result
}
