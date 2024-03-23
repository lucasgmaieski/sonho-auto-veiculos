import { BsWhatsapp } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";

export default function BoxContact() {

    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold text-2xl">Telefone/Whatsapp</h3>
                <div className="text-sm font-semibold flex items-center gap-1">
                    <div className="dark:bg-slate-700 bg-slate-200 rounded-lg">
                        <BsWhatsapp className="text-5xl dark:text-neutral-200 text-slate-600 p-2"/>
                    </div>
                    <span className="font-medium text-lg">(46) 99544-8854</span>
                </div>
                <div className="text-sm font-semibold flex items-center gap-1">
                    <div className="dark:bg-slate-700 bg-slate-200 rounded-lg">
                        <BsWhatsapp className="text-5xl dark:text-neutral-200 text-slate-600 p-2"/>
                    </div>
                    <span className="font-medium text-lg">(46) 99544-8854</span>
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-2xl">E-mail</h3>
                <div className="text-sm font-semibold flex items-center gap-1">
                    <div className="dark:bg-slate-700 bg-slate-200 rounded-lg">
                        <BsWhatsapp className="text-5xl dark:text-neutral-200 text-slate-600 p-2"/>
                    </div>
                    <span className="font-medium text-lg">sonhoauto@veiculos.com.br</span>
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-2xl">Endereço</h3>
                <div className="text-sm font-semibold flex items-center gap-1">
                    <div className="dark:bg-slate-700 bg-slate-200 rounded-lg">
                        <FaMapLocationDot className="text-5xl dark:text-neutral-200 text-slate-600 p-2"/>
                    </div>
                    <span className="font-medium text-lg">Avenida das Missões, 1396 - Centro CEP: 85640-000 - Ampére - PR</span>
                </div>
            </div>
        </div>
    );
}