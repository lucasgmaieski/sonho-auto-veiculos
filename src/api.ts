
export default {
    getMenu: async (id: number) => {
        try{
            const response = await fetch(`http://138.97.9.237:888/sonhoautoveiculos.com.br/wp-json/wp/v2/menu/${id}`);
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const menu = await response.json();
            // console.log(menu[0]);
            return menu || [];
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getPage: async (id: number) => {
        try{
            const response = await fetch(`http://138.97.9.237:888/sonhoautoveiculos.com.br/wp-json/wp/v2/pages/${id}`);
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const menu = await response.json();
            // console.log(menu[0]);
            return menu ;
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    createA: async () => {
        return null;
    },
}