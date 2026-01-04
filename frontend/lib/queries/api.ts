// lib/api.ts
export async function getPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!res.ok) throw new Error('Failed to fetch posts')
    return res.json()
}

export async function getPost(id: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    if (!res.ok) throw new Error('Failed to fetch post')
    return res.json()
}