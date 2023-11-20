import CarCard from "@/Components/CarCard/CarCard";
import { VehicleType } from "@/Types/VehicleType"
import api from "@/api";

type Props = {
    params: {
        slug: string
    }
}
export async function generateStaticParams() {
    const vehicles: VehicleType[] = await api.getVehicles();
    const vehiclesSlugs = vehicles.map((item) => ({
        slug: item.slug
    }));

    return vehiclesSlugs;
}

export default async function PageVeiculos({params}: Props) {
    const vehicle: VehicleType = await api.getVehicleBySlug(params.slug);
    const galery = vehicle.acf.galeria_de_imagens as string[]
    return (
        <div className="flex flex-row">
            <aside className="w-1/5">
                <div>
                    <h2>Marca</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-6 sm:gap-y-4">
                        <div>
                            <img src="/logo-bmw.svg" alt="" />
                            Nome
                        </div>
                        <div>
                            <img src="/logo-mitsubishi.svg" alt="" />
                            Nome
                        </div>
                        <div>
                            <img src="/logo-toyota.svg" alt="" />
                            Nome
                        </div>
                    </div>
                </div>
            </aside>
            <div className="w-4/5">
                <h1>{vehicle.title.rendered}</h1>
                <div>
                    {galery && 
                    galery.map((image: string, index: number)=> (
                        <img src={image} alt="" className="w-80 inline-block"/>
                    ))}
                </div>
            </div>
            
        </div>
    );
}