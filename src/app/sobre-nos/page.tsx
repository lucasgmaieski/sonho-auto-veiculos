import api from "@/api"

export default async function SobreNos() {
    const page = await api.getPage(39);

    return (
        <div>
            <h1>{page.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>
        </div>
    )
}
