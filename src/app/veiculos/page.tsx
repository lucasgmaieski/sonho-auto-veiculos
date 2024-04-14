import AsideFilters from "@/Components/Filters/AsideFilters";
import ListVehicles from "@/Components/ListVehicles/ListVehicles";
import { MarcaFilter } from "@/Types/MarcaFilter";
import { VehicleCustomType } from "@/Types/VehicleCustomType"
import api from "@/api";

interface ContagemPorCampo {
    [campo: string]: {
    [valor: string]: number;
    };
}

export default async function PageVeiculos() {
    const vehicles: VehicleCustomType[] = await api.getVehiclesByParamsGQL('');
    const marcaFilter: MarcaFilter[] = await api.getMarcaFilterGQL();
    const vehiclesFilter: ContagemPorCampo | undefined = await api.getQtdVehiclesPerFieldGQL();
    
    return (
        <div className="flex flex-row mt-[150px] ">
            <AsideFilters vehiclesFilter={vehiclesFilter} marcaFilter={marcaFilter} />
            <div className=" flex flex-col flex-1">
                <section className="px-2 xl:container xl:mx-auto flex-1">
                    <ListVehicles vehicles={vehicles}/>
                </section>
            </div>
        </div>
    );
}