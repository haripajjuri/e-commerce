type props = {
    params: { section: string; category: string }
}

export default async function CategoryPage({ params }: props) {
    const { section, category } = await params

    return (
        <div>
            <h1>{section} / {category}</h1>
        </div>
    )
}
