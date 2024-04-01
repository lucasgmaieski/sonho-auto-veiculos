export type MarcaFilter = {
    name: string;
    slug: string;
    count: number | null;
    logoposts: {
        logo: {
            node: {
                mediaItemUrl: string;
            }
        }
    }
}