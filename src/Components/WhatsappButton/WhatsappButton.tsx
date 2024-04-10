import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";

export function WhatsappButton({number}: {number: string}) {
    return(
        <a href={`http://wa.me/${number}`} className="fixed right-2 bottom-8 z-20 hover:-translate-y-1 transition-transform" target="_blank" title="Fale conosco pelo Whatsapp" aria-label="Botão do whatsapp">
            <Image 
                src="/iconewhatsapp.png"
                width="60"
                height="60"
                alt="Icone do Whatsapp"
            />
        </a>
    );
}