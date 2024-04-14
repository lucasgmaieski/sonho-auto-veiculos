import CarCard from "../CarCard/CarCard";
import api from "@/api";
import { VehicleCustomType } from "@/Types/VehicleCustomType";
import Link from "next/link";

export default async function MorePopular() {
    const vehicles: VehicleCustomType[] = await api.getVehiclesMorePopularGQL();

    return (
        <section className="px-2 xl:container xl:mx-auto mb-10">
            <h2 className="text-center text-3xl font-bold mb-7">Mais Populares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 gap-y-6 sm:gap-y-4">
                {vehicles && vehicles.map((vehicle: VehicleCustomType, index:number) => (
                    <CarCard vehicle={vehicle} key={index} home/>
                ))}
                {!vehicles &&
                    <p>Nenhum veículo para mostrar!</p>
                }
            </div>
            <Link href="/veiculos" className="rounded-md bg-blue-600 block w-fit mx-auto mt-8 px-4 py-2 text-1xl font-semibold text-white hover:bg-blue-700 transition-colors">VER TODOS</Link>
        </section>
    );
}