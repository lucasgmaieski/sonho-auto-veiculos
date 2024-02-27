export type MarcaFilter = {
    name: string;
    slug: string;
    count: number | null;
    marcas: {
        logo: {
            node: {
                mediaItemUrl: string;
            }
        }
    }
}