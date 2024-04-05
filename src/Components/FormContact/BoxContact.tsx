import { InfoExtras } from "@/Types/InfoExtras";
import { BsWhatsapp } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function BoxContact({infoExtras}: {infoExtras: InfoExtras}) {

    return (
        <div className="space-y-6 mt-6">
            <div>
                {infoExtras.endereco &&
                    <>
                        <h3 className="font-semibold text-xl mb-1">Endereço</h3>
                        <a href={infoExtras.endereco.link} target="_blank" className="text-sm font-semibold flex items-center gap-2 group w-fit">
                            <div className="bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors">
                                <FaMapLocationDot className="text-5xl text-white p-2"/>
                            </div>
                            <span className="font-medium text-lg dark:group-hover:text-blue-500 group-hover:text-blue-600 transition-colors">{infoExtras.endereco.nome}</span>
                        </a>
                    </>
                }
            </div>
            <div>
                {(infoExtras.telefone1 || infoExtras.telefone2) &&
                    <h3 className="font-semibold text-xl mb-1">Telefone/Whatsapp</h3>
                }
                {infoExtras.telefone1 &&
                    <a href={`http://wa.me/${infoExtras.telefone1}`} target="_blank" className="text-sm font-semibold flex items-center gap-2 mb-3 group w-fit">
                        <div className="bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors">
                            <BsWhatsapp className="text-5xl text-white p-2"/>
                        </div>
                        <span className="font-medium text-lg dark:group-hover:text-blue-500 group-hover:text-blue-600 transition-colors">{infoExtras.telefone1}</span>
                    </a>
                }
                {infoExtras.telefone2 &&
                    <a href={`http://wa.me/${infoExtras.telefone2}`} target="_blank" className="text-sm font-semibold flex items-center gap-2 group w-fit">
                        <div className="bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors">
                            <BsWhatsapp className="text-5xl text-white p-2"/>
                        </div>
                        <span className="font-medium text-lg dark:group-hover:text-blue-500 group-hover:text-blue-600 transition-colors break-words">{infoExtras.telefone2}</span>
                    </a>
                }
            </div>
            <div>
                {infoExtras.email &&
                    <>
                        <h3 className="font-semibold text-xl mb-1">E-mail</h3>
                        <a href={`mailto:${infoExtras.telefone1}`} target="_blank" className="text-sm font-semibold flex items-center gap-2 group w-fit">
                            <div className="bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors">
                                <MdEmail className="text-5xl text-white p-2"/>
                            </div>
                            <span className="font-medium text-lg dark:group-hover:text-blue-500 group-hover:text-blue-600 transition-colors break-all">{infoExtras.email}</span>
                        </a>
                    </>
                }
            </div>
        </div>
    );
}