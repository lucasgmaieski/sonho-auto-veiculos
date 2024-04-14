import BoxContact from "@/Components/FormContact/BoxContact";
import FormContact from "@/Components/FormContact/FormContact";
import { InfoExtras } from "@/Types/InfoExtras";
import api from "@/api";

export default async function Contato() {
    const infoExtras:InfoExtras = await api.getOptionsInfoExtrasGQL();

    return (
        <div className="mt-[150px] container pt-10 p-4 sm:p-8">
            <h1 className="text-4xl font-bold text-center mb-14">Contato</h1>
            <div className="flex flex-wrap gap-10 lg:gap-6">
                <div className="w-full lg:w-1/3">
                    <h2 className="font-medium text-xl mb-3">Tem alguma dúvida?</h2>
                    <p>Entre em contato com a nossa equipe, estamos a disposição para atende-lo.</p>
                    <BoxContact infoExtras={infoExtras}/>
                </div>
                <div className="flex-1">
                    <FormContact />
                </div>
                <div className="w-full my-8">
                    <h3 className="font-semibold text-xl mb-2">Localização</h3>
                    <div className="w-full" dangerouslySetInnerHTML={{ __html: infoExtras.endereco.iframe }}></div>
                </div>
            </div>
        </div>
    )
}
