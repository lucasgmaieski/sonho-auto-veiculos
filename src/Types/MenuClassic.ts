type MenuClassic = {
    label: string;
    url: string;
    id: string;
    parentId: string;
    childItems: {
        nodes: {
            label: string;
            url: string;
        }[]
    }
}