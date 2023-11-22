import CarCard from "@/Components/CarCard/CarCard";
import { MenuTypes } from "@/Types/MenuType";
import { VehicleType } from "@/Types/VehicleType"
import api from "@/api";
async function getPosts() {
    try{
        const response = await fetch('http://localhost:888/sonhoautoveiculos.com.br/wp-json/wp/v2/veiculos', { cache: 'no-store' });
        if(!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const posts = await response.json();
        console.log(posts[0]);
        return posts || [];
    
    } catch (err) {
        console.log(err);
    }
    
}
interface ContagemPorCampo {
    [campo: string]: {
    [valor: string]: number;
    };
}

export default async function PageVeiculos() {
    const vehicles: VehicleType[] = await api.getVehicles();
    const marcaFilter: MenuTypes = await api.getMenu(15);
    const vehiclesFilter: ContagemPorCampo | undefined = await api.getQtdVehiclesPerField();
    console.log(vehiclesFilter)
    // useEffect(()=> {
        console.log("marcaFilter: ");
        console.log(marcaFilter);
    // }, []);
    
    return (
        <div className="flex flex-row">
            <aside className="w-1/5">
                <div>
                    <h2>Marca</h2>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-6 sm:gap-y-4">
                    {marcaFilter && marcaFilter.itens.map((item,index) => (
                        <div>
                            <img src={item.logo} alt="" />
                            {item.titulo}({item.contagem})
                        </div>
                    ))}
                    </div>
                    { vehiclesFilter &&
                    Object.keys(vehiclesFilter).map((campo) => (
                        <div key={campo}>
                            <h3>Contagem para o campo "{campo}":</h3>
                            {Object.entries(vehiclesFilter[campo]).map(([valor, contagem]) => (
                                <div key={valor}>
                                {`${valor}: ${contagem}`}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </aside>
            <div className="w-4/5">
                <h1>Página de Veículos</h1>
                <section className="px-2 xl:container xl:mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-0 gap-y-6 sm:gap-y-4">
                    {vehicles && vehicles.map((vehicle: VehicleType, index:number) => (
                        <CarCard vehicle={vehicle} key={index}/>
                    ))}
                    {!vehicles &&
                        <p>Nenhum vaículo para mostrar!</p>
                    }
                        
                    </div>
                </section>
            </div>
            
        </div>
    );
}