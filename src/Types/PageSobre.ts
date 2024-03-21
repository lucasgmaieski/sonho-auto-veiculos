export type PageSobre = {
    title: string;
    content: string;
    sobre: {
        visao: string;
        valores: string;
        missao: string;
        imagemEmpresa: {
            node: {
                mediaItemUrl: string;
            }
        }
    }
}