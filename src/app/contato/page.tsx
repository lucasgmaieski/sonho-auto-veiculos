import BoxContact from "@/Components/FormContact/BoxContact";
import FormContact from "@/Components/FormContact/FormContact";

export default function Contato() {
    return (
        <div className="mt-[140px] container pt-10">
            <h1 className="text-4xl font-bold text-center mb-10">Página de contato</h1>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/3">
                    <h2 className="font-medium text-xl mb-3">Tem alguma dúvida?</h2>
                    <p>Entre em contato com a nossa equipe, estamos a disposição para atende-lo.</p>
                    <BoxContact />
                </div>
                <div className="w-full lg:w-2/3">
                    {/* <form action="/api/email/send" method="post">
                        <input type="text" name="name"/> <br /> <br />
                        <input type="email" name="email"/>
                        <button type="submit">Enviar</button>
                    </form> */}
                    <FormContact />
                </div>
            </div>
        </div>
    )
}
