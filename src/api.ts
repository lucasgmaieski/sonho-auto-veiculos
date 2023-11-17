// const URL_BASE = 'http://138.97.9.237:888';
const URL_BASE = 'http://localhost:888';
export default {
    getMenu: async (id: number) => {
        try{
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/menu/${id}`, { cache: 'no-store' });
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
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/pages/${id}`);
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
    getVehicles: async () => {
        try{
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/veiculos`, { next: { revalidate: 3600 } });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const vehicles = await response.json();
            console.log(vehicles[0]);
            return vehicles || [];
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getVehicleBySlug: async (slug: string) => {
        try{
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/veiculos?slug=${slug}`, { next: { revalidate: 3600 } });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const vehicle = await response.json();
            console.log("vehicle: ")
            console.log(vehicle);
            return vehicle[0];
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    createA: async () => {
        return null;
    },
}