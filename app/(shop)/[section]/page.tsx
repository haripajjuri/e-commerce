type props = {
    params: { section: string }
}

export default async function SectionPage({ params }: props) {
    const { section } = await params

    return (
        <div>
            <h1>{section}</h1>
        </div>
    )
}
