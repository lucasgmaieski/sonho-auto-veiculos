import CarCard from "@/Components/CarCard/CarCard";
import BreadcrumbCustom from "@/Components/Breadcrumb/Breadcrumb";
import SliderVehicle from "@/Components/SliderVehicle/SliderVehicle";
import { VehicleCustomType } from "@/Types/VehicleCustomType"
import api from "@/api";

type Props = {
    params: {
        slug: string
    }
}
export async function generateStaticParams() {
    const vehicles: VehicleCustomType[] = await api.getVehicles();
    const vehiclesSlugs = vehicles.map((item) => ({
        slug: item.slug
    }));

    return vehiclesSlugs;
}

export default async function PageVeiculos({params}: Props) {
    const vehicle: VehicleCustomType = await api.getVehicleBySlug(params.slug);
    // const galery = vehicle?.acf.galeria_de_imagens as string[]
    return (
        <div className="flex flex-row mt-[140px] py-12">
            {/* <aside className="w-1/5">
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
            </aside> */}
            <div className="max-w-7xl mx-auto">
                <BreadcrumbCustom itens={[ {url:'veiculos', title:'Veículos'}, {url: 'nissan-sentra-advance-cvt-2', title: 'Nissan Sentra Advance'}] }/>
                {/* <h1>{vehicle?.title}</h1> */}
                <div>
                    {/* {galery && 
                    galery.map((image: string, index: number)=> (
                        <img src={image} key={index} alt="" className="w-80 inline-block"/>
                    ))} */}
                </div>
                <div className="w-1/2 max-h-[600px]">
                    <SliderVehicle />
                </div>
            </div>
            
        </div>
    );
}