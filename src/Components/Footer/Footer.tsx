import Link from "next/link";
import { FaMapLocationDot, FaSquareFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";

export default function Footer() {
    return (
        <footer className="flex flex-col gap-4 p-4">
            <div className="flex justify-between items-center">
            <Link href={process.env.NEXT_PUBLIC_SITE_URL || '/'} className="w-fit block"><img className="w-32" src="/logo.svg" alt="" /></Link>
                <address className="flex items-center gap-2">
                    <FaMapLocationDot className="w-[28px] h-[28px]"/>
                    <span>Avenida das Missões, 1396 - Centro  <br /> CEP: 85640-000 - Ampére - PR</span>
                </address>
                <div className="flex gap-2">
                    <BsInstagram />
                    <FaSquareFacebook />
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                    &copy; {new Date().getFullYear()} Sonho Auto Veículos. Todos os direitos reservados.
                </div>
                <div className="flex gap-2 items-center">
                    Desenvolvido por:
                    <Link href="https://portfolio-lucasgmaieski.vercel.app/" title="Lucas Maieski Developer">
                        <svg className="w-8 dark:fill-white fill-black" id="Camada_1" data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365.75 333"><path d="M322.47,215.29l97.74-116.9a1.05,1.05,0,0,1,.84-.39h54.7a.44.44,0,0,1,.5.5v9.65a1.78,1.78,0,0,1-.41,1.15C424.77,170.86,374,232.64,322.45,293.74c-.19.23-.39.24-.58,0L168.32,112.67a1.32,1.32,0,0,1-.32-.87V98.5a.44.44,0,0,1,.5-.5h54.31a1.34,1.34,0,0,1,1,.48l98,116.81a.39.39,0,0,0,.54.05Z" transform="translate(-110.5 -98)"/><path d="M476.17,151.73s0,0,.06,0a.05.05,0,0,1,0,0v219a.38.38,0,0,1-.37.38.32.32,0,0,1-.29-.13L425.9,312.63a1.64,1.64,0,0,1-.4-1.08V214.22a3.43,3.43,0,0,1,.8-2.21Q451.11,182.21,476.17,151.73Z" transform="translate(-110.5 -98)"/><path d="M156.55,385h90.16a.3.3,0,0,1,.3.3.32.32,0,0,1-.07.19l-37.56,45.4a.3.3,0,0,1-.23.11H110.8a.29.29,0,0,1-.3-.3V157.8a.29.29,0,0,1,.3-.3H156a.29.29,0,0,1,.3.3h0V384.7A.29.29,0,0,0,156.55,385Z" transform="translate(-110.5 -98)"/><path d="M169.9,370.71A1.07,1.07,0,0,1,168,370V158.21a.31.31,0,0,1,.31-.31.32.32,0,0,1,.24.11l49.18,57.79a3.07,3.07,0,0,1,.77,2.07q0,45.64,0,92c0,2.73-1.09,3.47-2.71,5.42Q193.37,342.42,169.9,370.71Z" transform="translate(-110.5 -98)"/><path d="M285.26,385h44.4a.34.34,0,0,1,.34.34v45.32a.34.34,0,0,1-.34.34H247.73a.34.34,0,0,1-.34-.34.35.35,0,0,1,.08-.22L285,385.12A.32.32,0,0,1,285.26,385Z" transform="translate(-110.5 -98)"/></svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}