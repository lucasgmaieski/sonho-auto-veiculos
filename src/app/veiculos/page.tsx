import AsideFilters from "@/Components/Filters/AsideFilters";
import CarCard from "@/Components/CarCard/CarCard";
import ListVehicles from "@/Components/ListVehicles/ListVehicles";
import { MarcaFilter } from "@/Types/MarcaFilter";
import { MenuTypes } from "@/Types/MenuType";
import { VehicleCustomType } from "@/Types/VehicleCustomType"
import api from "@/api";
import Footer from "@/Components/Footer/Footer";
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
    const vehicles: VehicleCustomType[] = await api.getVehicles();
    // const marcaFilter: MenuTypes = await api.getMenu(15);
    const marcaFilter: MarcaFilter[] = await api.getMarcaFilterGQL();
    const vehiclesFilter: ContagemPorCampo | undefined = await api.getQtdVehiclesPerFieldGQL();
    // console.log(vehiclesFilter);
    // console.log("marcaFilter: ");
    // console.log(marcaFilter);
    
    
    return (
        <div className="flex flex-row mt-[140px] ">
            <AsideFilters vehiclesFilter={vehiclesFilter} marcaFilter={marcaFilter} />
            <div className=" flex flex-col flex-1">
                <section className="px-2 xl:container xl:mx-auto flex-1">
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 gap-y-6 sm:gap-y-4"> */}
                    {/* {vehicles && vehicles.map((vehicle: VehicleType, index:number) => (
                        <CarCard vehicle={vehicle} key={index}/>
                    ))}
                    {!vehicles &&
                        <p>Nenhum vaículo para mostrar!</p>
                    } */}
                    <ListVehicles vehicles={vehicles}/>
                        
                    {/* </div> */}
                </section>
            </div>
            
        </div>
    );
}