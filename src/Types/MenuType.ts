export type MenuTypes = {
    id: string,
    nome: string,
    itens: Itens[]
}

type Itens = { [tag: string]: string }