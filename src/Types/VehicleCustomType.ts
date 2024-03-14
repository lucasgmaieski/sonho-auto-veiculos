
type ACF = {
    [tag: string]: string | string[] | any;
}


export type VehicleCustomType = {
    id: number;
    link: string;
    title: string;
    slug: string;
    acf: ACF;
    imagemDestacada: string;
    featuredImage: { node :{ mediaItemUrl : string } };
    count: number;
}
