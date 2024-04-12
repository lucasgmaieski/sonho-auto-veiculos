"use client"
import CarCard from "@/Components/CarCard/CarCard";
import { Context } from "@/Contexts/Context";
import { PageSobre } from "@/Types/PageSobre";
import { VehicleCustomType } from "@/Types/VehicleCustomType";
import { TbHeartX } from "react-icons/tb";
import api from "@/api"
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";

export default  function Favoritos() {
    const { favorites } = useContext(Context);
    const vehicles = favorites;
    return (
        <main className="mt-[140px] pt-10 min-h-[55vh]">
            <section className="px-2 xl:container xl:mx-auto">
                <h2 className="text-center text-3xl font-bold mb-7">Meus favoritos</h2>
                {vehicles.length > 0 &&
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 gap-y-6 sm:gap-y-4">
                        {vehicles && vehicles.map((vehicle: VehicleCustomType, index:number) => (
                            <CarCard vehicle={vehicle} key={index} home/>
                        ))}
                    </div>
                }
                    {vehicles.length === 0 &&
                        <div className="text-center mx-auto">
                            <TbHeartX size={80} className="opacity-60 mx-auto"/>
                            <p>Sua lista de veículos favoritos está vázia!</p>
                        </div>
                    }
                {/* <a href="/veiculos" className="rounded-md bg-blue-600 block w-fit mx-auto mt-8 px-4 py-2 text-1xl font-semibold text-white hover:bg-blue-700 transition-colors">VER TODOS</a> */}
            </section>
            <section className="w-full mx-auto text-center dark:bg-slate-800 bg-blue-200 md:px-10 py-10 mt-16">
                <div className="container space-y-5">
                    <h3 className="font-bold text-4xl">Talvez você possa se interessar por veículos destas <span className="text-blue-600">marcas</span> ou <span className="text-blue-600">carrocerias</span></h3>
                    <div className="flex justify-center flex-wrap gap-4">
                        <Link href={`/veiculos?marca=Fiat`} className="text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"> Fiat</Link>
                        <Link href={`/veiculos?marca=Nissan`} className="text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"> Nissan</Link>
                        <Link href={`/veiculos?marca=Chevrolet`} className="text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"> Chevrolet</Link>
                        <Link href={`/veiculos?marca=Volkswagem`} className="text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"> Volkswagem</Link>
                        <Link href={`/veiculos?marca=Toyota`} className="text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"> Toyota</Link>
                        <Link href={`/veiculos?tipo=Sedan`} className="text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors">Sedan</Link>
                        <Link href={`/veiculos?tipo=Hatch`} className="text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors">Hatch</Link>
                        <Link href={`/veiculos?tipo=Picape`} className="text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors">Picape</Link>
                        <Link href={`/veiculos?tipo=SUV`} className="text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors">SUV</Link>
                        <Link href={`/veiculos?tipo=Coupe`} className="text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors">Coupe</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
