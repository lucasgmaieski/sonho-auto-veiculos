import BoxContact from "@/Components/FormContact/BoxContact";
import FormContact from "@/Components/FormContact/FormContact";
import { InfoExtras } from "@/Types/InfoExtras";
import api from "@/api";

export default async function Contato() {
    const infoExtras:InfoExtras = await api.getOptionsInfoExtrasGQL();

    return (
        <div className="mt-[140px] container pt-10">
            <h1 className="text-4xl font-bold text-center mb-10">Página de contato</h1>
            <div className="flex flex-wrap gap-6">
                <div className="w-full lg:w-1/3">
                    <h2 className="font-medium text-xl mb-3">Tem alguma dúvida?</h2>
                    <p>Entre em contato com a nossa equipe, estamos a disposição para atende-lo.</p>
                    <BoxContact infoExtras={infoExtras}/>
                </div>
                <div className="flex-1">
                    {/* <form action="/api/email/send" method="post">
                        <input type="text" name="name"/> <br /> <br />
                        <input type="email" name="email"/>
                        <button type="submit">Enviar</button>
                    </form> */}
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
