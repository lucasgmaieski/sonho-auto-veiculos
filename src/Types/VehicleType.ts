// type Guid = {
//     rendered: string;
// }

type Title = {
    rendered: string;
}

type Content = {
    rendered: string;
    protected: boolean;
}

type ACF = {
    [tag: string]: string | string[];
}

type Links = {
    self: any[]; // Substitua "any" pelo tipo apropriado, dependendo da estrutura real dos seus links.
    collection: any[];
    about: any[];
    "wp:featuredmedia": any[];
    "wp:attachment": any[];
    "wp:term": any[];
    curies: any[];
}

export type VehicleType = {
    id: number;
    date: string;
    date_gmt: string;
    permalink: string;
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: Title;
    post_title: string;
    content: Content;
    featured_media: number;
    template: string;
    meta: any[]; // Substitua "any" pelo tipo apropriado, dependendo da estrutura real dos seus metadados.
    tipos: number[];
    acf: ACF;
    _links: Links;
}
