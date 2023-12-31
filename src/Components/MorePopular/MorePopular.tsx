import { VehicleType } from "@/Types/VehicleType";
import CarCard from "../CarCard/CarCard";
import api from "@/api";

export default async function MorePopular() {
    const vehicles: VehicleType[] = await api.getVehicles();

    return (
        <section className="px-2 xl:container xl:mx-auto">
            <h2 className="text-center text-3xl font-bold mb-7">Mais Populares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 gap-y-6 sm:gap-y-4">
                {vehicles && vehicles.map((vehicle: VehicleType, index:number) => (
                    <CarCard vehicle={vehicle} key={index}/>
                ))}
                {!vehicles &&
                    <p>Nenhum vaículo para mostrar!</p>
                }
            </div>
        </section>
    );
}