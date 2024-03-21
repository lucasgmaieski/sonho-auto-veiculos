import { PageSobre } from "@/Types/PageSobre";
import api from "@/api"
import Image from "next/image";

export default async function SobreNos() {
    const page:PageSobre = await api.getPageByIdGQL(39);

    return (
        <div className="mt-[140px] container pt-10">
            <h1 className="text-4xl font-bold text-center mb-10">{page.title}</h1>
            <div className="flex flex-wrap items-center justify-center">

                <div className="relative flex flex-col w-full lg:w-1/2 h-fit lg:-mt-8">
                    <div className="order-2 lg:order1 mt-4">
                        <h2 className="text-3xl font-semibold text-center text-blue-500">Um Sonho.</h2>
                        <h3 className="text-4xl font-bold text-center mb-5">Nossa História.</h3>
                    </div>
                    <Image
                        src={page.sobre.imagemEmpresa.node.mediaItemUrl}
                        width={600}
                        height={400}
                        alt="Imagem do Veículo"
                        priority={true}
                        className='object-cover h-auto lg:pr-6 mx-auto order-1 lg:order-2'
                        sizes="(max-width: 768px) 50vw, 100vw"
                    />
                </div>
                <div className="pb-16 w-full lg:w-1/2 dark:bg-slate-800 bg-slate-200 p-10 rounded-lg indent-8 text-justify" dangerouslySetInnerHTML={{ __html: page.content }}></div>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14">
                <div className="p-5 rounded-lg text-justify dark:bg-slate-800 bg-slate-200">
                    <h4 className="text-2xl font-semibold text-center">Missão</h4>
                    <p>{page.sobre.missao}</p>
                </div>
                <div className="p-5 rounded-lg text-justify dark:bg-slate-800 bg-slate-200">
                    <h4 className="text-2xl font-semibold text-center">Visão</h4>
                    <p>{page.sobre.visao}</p>
                </div>
                <div className="p-5 rounded-lg text-justify dark:bg-slate-800 bg-slate-200">
                    <h4 className="text-2xl font-semibold text-center">Valores</h4>
                    <p>{page.sobre.valores}</p>
                </div>
            </div>
        </div>
    )
}
