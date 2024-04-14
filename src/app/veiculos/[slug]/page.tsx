import { BsWhatsapp } from "react-icons/bs";
import BreadcrumbCustom from "@/Components/Breadcrumb/Breadcrumb";
import SliderVehicle from "@/Components/SliderVehicle/SliderVehicle";
import { VehicleCustomType } from "@/Types/VehicleCustomType"
import api from "@/api";
import { thousandsMask } from "@/lib/masks/thousandsMask";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicShare = dynamic(() => import('@/Components/Share/Share'), {
    ssr: false,
}) 
const DynamicFavoriteToggleButton = dynamic(() => import('@/Components/Favorites/FavoriteToggleButton'), {
    ssr: false,
}) 
type Props = {
    params: {
        slug: string
    }
}
export async function generateStaticParams() {
    const vehicles: VehicleCustomType[] = await api.getSlugAllVehiclesGQL();
    const vehiclesSlugs = vehicles.map((item) => ({
        slug: item.slug
    }));

    return vehiclesSlugs;
}

export default async function PageVeiculos({params}: Props) {
    const vehicle: VehicleCustomType = await api.getVehicleBySlugGQL(params.slug);
    let galeriaArray = []
    vehicle?.acf.galeriaDeImagens?.nodes.forEach(element => {
        galeriaArray.push(element.mediaItemUrl)
    });
    galeriaArray.push(vehicle?.featuredImage?.node.mediaItemUrl);

    return (
        <>
            <div className="mt-[150px] py-12">
                <div className="max-w-7xl w-full mx-auto space-y-10 px-3 sm:px-6">
                    <BreadcrumbCustom itens={[ {url:'veiculos', title:'Veículos'}, {url: vehicle?.slug, title: vehicle?.title}] }/>
                    <div className="flex flex-wrap lg:flex-nowrap gap-10">
                        <div className="w-full lg:w-1/2">
                            <SliderVehicle images={galeriaArray}/>
                        </div>
                        <div className="w-full lg:w-1/2 space-y-6">
                            <h1 className="font-bold text-2xl">{vehicle?.title}</h1>
                            <div className="flex justify-between">
                                <span className="font-semibold text-2xl text-blue-600">R$ {thousandsMask(vehicle?.acf.preco.toString())}</span>
                                <div className="flex items-center gap-1">Compartilhar: <DynamicShare title={vehicle?.title}/></div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 xsm:gap-3">
                            {vehicle?.acf.combustivel &&
                                    <div className="text-sm font-semibold border-2 rounded-lg p-2 xsm:p-3 dark:text-neutral-200 text-slate-900 flex items-center gap-1">
                                        <div className="dark:bg-slate-800 bg-slate-200 rounded-full">
                                            <svg className="w-10 h-10 p-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.34 9.33L20.34 8.33C19.97 8.15 19.51 8.29 19.33 8.66C19.14 9.04 19.29 9.49 19.66 9.67L21.25 10.46V15.25L17.5 15.26V5C17.5 3 16.16 2 14.5 2H6.5C4.84 2 3.5 3 3.5 5V21.25H2C1.59 21.25 1.25 21.59 1.25 22C1.25 22.41 1.59 22.75 2 22.75H19C19.41 22.75 19.75 22.41 19.75 22C19.75 21.59 19.41 21.25 19 21.25H17.5V16.76L22 16.75C22.42 16.75 22.75 16.41 22.75 16V10C22.75 9.72 22.59 9.46 22.34 9.33ZM6 6.89C6 5.5 6.85 5 7.89 5H13.12C14.15 5 15 5.5 15 6.89V8.12C15 9.5 14.15 10 13.11 10H7.89C6.85 10 6 9.5 6 8.11V6.89ZM6.5 12.25H9.5C9.91 12.25 10.25 12.59 10.25 13C10.25 13.41 9.91 13.75 9.5 13.75H6.5C6.09 13.75 5.75 13.41 5.75 13C5.75 12.59 6.09 12.25 6.5 12.25Z" fill="#90A3BF"/>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">Combustível</span>
                                            {vehicle?.acf.combustivel}
                                        </div>
                                    </div>
                                }
                                {vehicle?.acf.transmissao &&
                                    <div className="text-sm font-semibold border-2 rounded-lg p-2 xsm:p-3 dark:text-neutral-200 text-slate-900 flex items-center gap-1">
                                        <div className="dark:bg-slate-800 bg-slate-200 rounded-full">
                                            <svg className="w-10 h-10 p-2" width="11" height="13" viewBox="0 0 110 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M109.935 15.8383C109.935 7.17396 102.879 0.125153 94.2154 0.125153C85.5513 0.125153 78.5027 7.17396 78.5027 15.8383C78.5027 23.271 83.6896 29.494 90.6223 31.124V64.1512H58.9724V31.124C65.9051 29.494 71.0919 23.271 71.0919 15.8383C71.0919 7.17396 64.0432 0.125153 55.3719 0.125153C46.7078 0.125153 39.6664 7.17396 39.6664 15.8383C39.6664 23.271 44.8461 29.494 51.7788 31.124V64.1512H20.129V31.124C27.0617 29.494 32.2485 23.271 32.2485 15.8383C32.2485 7.17396 25.1999 0.125153 16.5359 0.125153C7.87905 0.125153 0.823242 7.17396 0.823242 15.8383C0.823242 23.271 6.01007 29.494 12.9428 31.124V104.285C6.01007 105.908 0.823242 112.138 0.823242 119.571C0.823242 128.228 7.87905 135.277 16.5359 135.277C25.1999 135.277 32.2485 128.228 32.2485 119.571C32.2485 112.138 27.0617 105.908 20.129 104.285V71.3377H51.7788V104.285C44.8461 105.908 39.6664 112.138 39.6664 119.571C39.6664 128.228 46.7078 135.277 55.3719 135.277C64.0432 135.277 71.0919 128.228 71.0919 119.571C71.0919 112.138 65.9051 105.908 58.9724 104.285V71.3377H97.9171V64.1512H97.8085V31.124C104.741 29.494 109.935 23.271 109.935 15.8383ZM46.8455 15.8383C46.8455 11.1366 50.6704 7.30438 55.3719 7.30438C60.0806 7.30438 63.9054 11.1366 63.9054 15.8383C63.9054 20.5471 60.0806 24.3722 55.3719 24.3722C50.6704 24.3722 46.8455 20.5471 46.8455 15.8383ZM8.002 15.8383C8.002 11.1366 11.8344 7.30438 16.5359 7.30438C21.2373 7.30438 25.0694 11.1366 25.0694 15.8383C25.0694 20.5471 21.2373 24.3722 16.5359 24.3722C11.8344 24.3722 8.002 20.5471 8.002 15.8383ZM25.0694 119.571C25.0694 124.265 21.2373 128.098 16.5359 128.098C11.8344 128.098 8.002 124.265 8.002 119.571C8.002 114.862 11.8344 111.037 16.5359 111.037C21.2373 111.037 25.0694 114.862 25.0694 119.571ZM63.9054 119.571C63.9054 124.265 60.0806 128.098 55.3719 128.098C50.6704 128.098 46.8455 124.265 46.8455 119.571C46.8455 114.862 50.6704 111.037 55.3719 111.037C60.0806 111.037 63.9054 114.862 63.9054 119.571ZM85.6815 15.8383C85.6815 11.1366 89.5139 7.30438 94.2154 7.30438C98.9168 7.30438 102.749 11.1366 102.749 15.8383C102.749 20.5471 98.9168 24.3722 94.2154 24.3722C89.5139 24.3722 85.6815 20.5471 85.6815 15.8383Z" fill="#90A3BF"/>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">Transmissão</span>
                                            {vehicle?.acf.transmissao}
                                        </div>
                                    </div>
                                }
                                {vehicle?.acf.direcao &&
                                    <div className="text-sm font-semibold border-2 rounded-lg p-2 xsm:p-3 dark:text-neutral-200 text-slate-900 flex items-center gap-1">
                                        <div className="dark:bg-slate-800 bg-slate-200 rounded-full">
                                            <svg className="w-10 h-10 p-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="#90A3BF"/>
                                            <path d="M15.5801 19.25C15.1701 19.25 14.8301 18.91 14.8301 18.5V14.6C14.8301 14.19 15.1701 13.85 15.5801 13.85C15.9901 13.85 16.3301 14.19 16.3301 14.6V18.5C16.3301 18.91 15.9901 19.25 15.5801 19.25Z" fill="#90A3BF"/>
                                            <path d="M15.5801 8.2C15.1701 8.2 14.8301 7.86 14.8301 7.45V5.5C14.8301 5.09 15.1701 4.75 15.5801 4.75C15.9901 4.75 16.3301 5.09 16.3301 5.5V7.45C16.3301 7.86 15.9901 8.2 15.5801 8.2Z" fill="#90A3BF"/>
                                            <path d="M15.58 13.4C13.73 13.4 12.23 11.9 12.23 10.05C12.23 8.20001 13.73 6.70001 15.58 6.70001C17.43 6.70001 18.93 8.20001 18.93 10.05C18.93 11.9 17.42 13.4 15.58 13.4ZM15.58 8.20001C14.56 8.20001 13.73 9.03001 13.73 10.05C13.73 11.07 14.56 11.9 15.58 11.9C16.6 11.9 17.43 11.07 17.43 10.05C17.43 9.03001 16.59 8.20001 15.58 8.20001Z" fill="#90A3BF"/>
                                            <path d="M8.41992 19.25C8.00992 19.25 7.66992 18.91 7.66992 18.5V16.55C7.66992 16.14 8.00992 15.8 8.41992 15.8C8.82992 15.8 9.16992 16.14 9.16992 16.55V18.5C9.16992 18.91 8.83992 19.25 8.41992 19.25Z" fill="#90A3BF"/>
                                            <path d="M8.41992 10.15C8.00992 10.15 7.66992 9.81 7.66992 9.4V5.5C7.66992 5.09 8.00992 4.75 8.41992 4.75C8.82992 4.75 9.16992 5.09 9.16992 5.5V9.4C9.16992 9.81 8.83992 10.15 8.41992 10.15Z" fill="#90A3BF"/>
                                            <path d="M8.42007 17.3C6.57007 17.3 5.07007 15.8 5.07007 13.95C5.07007 12.1 6.57007 10.6 8.42007 10.6C10.2701 10.6 11.7701 12.1 11.7701 13.95C11.7701 15.8 10.2701 17.3 8.42007 17.3ZM8.42007 12.1C7.40007 12.1 6.57007 12.93 6.57007 13.95C6.57007 14.97 7.40007 15.8 8.42007 15.8C9.44007 15.8 10.2701 14.97 10.2701 13.95C10.2701 12.93 9.45007 12.1 8.42007 12.1Z" fill="#90A3BF"/>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">Direção</span>
                                            {vehicle?.acf.direcao}
                                        </div>
                                    </div>
                                }
                                {vehicle?.acf.ano &&
                                    <div className="text-sm font-semibold border-2 rounded-lg p-2 xsm:p-3 dark:text-neutral-200 text-slate-900 flex items-center gap-1">
                                        <div className="dark:bg-slate-800 bg-slate-200 rounded-full">
                                            <svg className="w-10 h-10 p-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 2V5" stroke="#90A3BF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 2V5" stroke="#90A3BF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M3.5 9.08997H20.5" stroke="#90A3BF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#90A3BF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M15.6947 13.7H15.7037" stroke="#90A3BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M15.6947 16.7H15.7037" stroke="#90A3BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M11.9955 13.7H12.0045" stroke="#90A3BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M11.9955 16.7H12.0045" stroke="#90A3BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M8.29431 13.7H8.30329" stroke="#90A3BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M8.29431 16.7H8.30329" stroke="#90A3BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">Ano</span>
                                            {vehicle?.acf.ano}
                                        </div>
                                    </div>
                                }
                                {vehicle?.acf.quilometros &&
                                    <div className="text-sm font-semibold border-2 rounded-lg p-2 xsm:p-3 dark:text-neutral-200 text-slate-900 flex items-center gap-1">
                                        <div className="dark:bg-slate-800 bg-slate-200 rounded-full">
                                            <svg className="w-10 h-10 p-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10" stroke="#90A3BF" strokeWidth="0.5"/>
                                            <path d="M5.42215 14.3941C5.04433 13.3561 4.91755 12.2434 5.05218 11.1469C5.1868 10.0505 5.57901 9.00146 6.19674 8.08565C6.81447 7.16983 7.64017 6.41321 8.60634 5.87766C9.57251 5.3421 10.6517 5.04281 11.7557 5.00426C12.8597 4.96571 13.9572 5.18899 14.9583 5.65585C15.9595 6.12271 16.836 6.81989 17.5161 7.69038C18.1962 8.56088 18.6606 9.57998 18.8714 10.6644C19.0822 11.7487 19.0333 12.8676 18.7288 13.9295" stroke="#90A3BF" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5"/>
                                            <path d="M14.5307 10.041L13.0329 10.9455C12.5024 11.2574 11.9407 11.5381 11.4103 11.7876C11.2543 11.85 11.067 11.9435 10.8798 12.0371C10.2245 12.3802 9.88129 13.0975 10.0373 13.8149C10.1621 14.3763 10.6302 14.8441 11.1918 14.9689C11.3166 15 11.4415 15 11.5663 15C12.1592 15 12.6896 14.657 12.9705 14.1268C13.0329 13.9708 13.1265 13.7837 13.2201 13.5965C13.5009 13.0663 13.7506 12.5049 14.0626 11.9747L14.9675 10.4776C15.0299 10.3529 14.9987 10.2281 14.9051 10.1034C14.8115 9.97859 14.6555 9.97859 14.5307 10.041ZM13.5321 11.6316C13.1889 12.193 12.908 12.7544 12.6584 13.3158C12.596 13.503 12.5024 13.6589 12.4088 13.8461C12.2216 14.2515 11.7847 14.4386 11.3479 14.3451C11.0046 14.2827 10.7238 14.002 10.6614 13.6589C10.5678 13.2223 10.755 12.7856 11.1607 12.5985C11.3167 12.5049 11.5039 12.4426 11.6911 12.349C12.2528 12.0683 12.8457 11.7876 13.3761 11.4757L13.7818 11.2262L13.5321 11.6316Z" fill="#90A3BF"/>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">Quilometragem</span>
                                            {thousandsMask(vehicle?.acf.quilometros.toString())} km
                                        </div>
                                    </div>
                                }
                                {vehicle?.acf.localizacao &&
                                    <div className="text-sm font-semibold border-2 rounded-lg p-2 xsm:p-3 dark:text-neutral-200 text-slate-900 flex items-center gap-1 w-100">
                                        <div className="dark:bg-slate-800 bg-slate-200 rounded-full">
                                            <svg className="w-10 h-10 p-2" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 4.28576C7.2808 4.28576 6.57774 4.49522 5.97974 4.88766C5.38175 5.2801 4.91567 5.83788 4.64044 6.49048C4.36521 7.14308 4.2932 7.86118 4.43351 8.55398C4.57382 9.24678 4.92015 9.88315 5.4287 10.3826C5.93726 10.8821 6.5852 11.2223 7.29058 11.3601C7.99597 11.4979 8.72712 11.4271 9.39158 11.1568C10.056 10.8865 10.624 10.4287 11.0235 9.84142C11.4231 9.2541 11.6364 8.56359 11.6364 7.85722C11.6364 6.91001 11.2532 6.00159 10.5713 5.33182C9.88935 4.66204 8.96442 4.28576 8 4.28576ZM8 10.0001C7.56848 10.0001 7.14665 9.87442 6.78785 9.63896C6.42905 9.4035 6.1494 9.06883 5.98426 8.67727C5.81913 8.28571 5.77592 7.85484 5.86011 7.43917C5.94429 7.02349 6.15209 6.64166 6.45722 6.34198C6.76235 6.04229 7.15112 5.8382 7.57435 5.75552C7.99758 5.67283 8.43627 5.71527 8.83495 5.87746C9.23362 6.03965 9.57438 6.31431 9.81412 6.6667C10.0539 7.0191 10.1818 7.4334 10.1818 7.85722C10.1818 8.42555 9.95195 8.9706 9.54278 9.37247C9.13361 9.77433 8.57865 10.0001 8 10.0001ZM8 0C5.87901 0.00236318 3.84557 0.830934 2.3458 2.30394C0.846033 3.77694 0.00240612 5.77408 0 7.85722C0 10.6608 1.31909 13.6323 3.81818 16.4511C4.94111 17.7248 6.20496 18.8717 7.58636 19.8707C7.70865 19.9549 7.85433 20 8.00364 20C8.15294 20 8.29863 19.9549 8.42091 19.8707C9.79977 18.8713 11.0612 17.7244 12.1818 16.4511C14.6773 13.6323 16 10.6608 16 7.85722C15.9976 5.77408 15.154 3.77694 13.6542 2.30394C12.1544 0.830934 10.121 0.00236318 8 0ZM8 18.393C6.49727 17.2323 1.45455 12.9689 1.45455 7.85722C1.45455 6.15224 2.14415 4.51709 3.37166 3.31149C4.59918 2.10589 6.26404 1.42859 8 1.42859C9.73596 1.42859 11.4008 2.10589 12.6283 3.31149C13.8558 4.51709 14.5455 6.15224 14.5455 7.85722C14.5455 12.9671 9.50273 17.2323 8 18.393Z" fill="#90A3BF"/>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">Localização</span>
                                            {vehicle?.acf.localizacao}
                                        </div>
                                    </div>
                                }
                                {vehicle?.acf.cor &&
                                    <div className="text-sm font-semibold border-2 rounded-lg p-2 xsm:p-3 dark:text-neutral-200 text-slate-900 flex items-center gap-1 w-100">
                                        <div className="dark:bg-slate-800 bg-slate-200 rounded-full">
                                            <svg className="w-10 h-10 p-2" stroke="currentColor" fill="#90A3BF" strokeWidth="0" viewBox="0 0 512 512" height="160px" width="160px" xmlns="http://www.w3.org/2000/svg"><path d="M416 352c-12.6-.84-21-4-28-12-14-16-14-36 5.49-52.48l32.82-29.14c50.27-44.41 50.27-117.21 0-161.63C389.26 64.14 339.54 48 287.86 48c-60.34 0-123.39 22-172 65.11-90.46 80-90.46 210.92 0 290.87 45 39.76 105.63 59.59 165.64 60h1.84c60 0 119.07-19.5 161.2-56.77C464 390 464 385 444.62 355.56 440 348 431 353 416 352zM112 208a32 32 0 1 1 32 32 32 32 0 0 1-32-32zm40 135a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm40-199a32 32 0 1 1 32 32 32 32 0 0 1-32-32zm64 271a48 48 0 1 1 48-48 48 48 0 0 1-48 48zm72-239a32 32 0 1 1 32-32 32 32 0 0 1-32 32z"></path>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">Cor</span>
                                            {vehicle?.acf.cor}
                                        </div>
                                    </div>
                                }
                                {vehicle?.acf.portas &&
                                    <div className="text-sm font-semibold border-2 rounded-lg p-2 xsm:p-3 dark:text-neutral-200 text-slate-900 flex items-center gap-1 w-100">
                                        <div className="dark:bg-slate-800 bg-slate-200 rounded-full">
                                            <svg className="w-10 h-10 p-2" stroke="currentColor" fill="#90A3BF" strokeWidth="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M149.6 41L42.88 254.4c23.8 24.3 53.54 58.8 78.42 97.4 24.5 38.1 44.1 79.7 47.1 119.2h270.3L423.3 41H149.6zM164 64h230l8 192H74l90-192zm86.8 17.99l-141 154.81L339.3 81.99h-88.5zM336 279h64v18h-64v-18z"></path></svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">Portas</span>
                                            {vehicle?.acf.portas}
                                        </div>
                                    </div>
                                }
                                {vehicle?.acf.motor &&
                                    <div className="text-sm font-semibold border-2 rounded-lg p-2 xsm:p-3 dark:text-neutral-200 text-slate-900 flex items-center gap-1 w-100">
                                        <div className="dark:bg-slate-800 bg-slate-200 rounded-full">
                                        <svg className="w-10 h-10 p-2" fill="#90A3BF" height="80px" width="80px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 491.524 491.524">
                                        <g>
                                            <g>
                                                <g>
                                                    <path d="M368.642,143.36c11.305,0,20.48-9.175,20.48-20.48c0-11.305-9.175-20.48-20.48-20.48c-11.305,0-20.48,9.175-20.48,20.48
                                                        C348.162,134.185,357.337,143.36,368.642,143.36z"/>
                                                    <path d="M102.402,348.16c11.305,0,20.48-9.175,20.48-20.48c0-11.305-9.175-20.48-20.48-20.48c-11.305,0-20.48,9.175-20.48,20.48
                                                        C81.922,338.985,91.097,348.16,102.402,348.16z"/>
                                                    <path d="M368.642,0c-39.348,0-74.379,18.505-96.87,47.282L36.698,249.145c-0.644,0.539-1.281,1.086-1.911,1.641l-0.17,0.146
                                                        c-0.027,0.023-0.05,0.05-0.077,0.073C13.359,269.766,0.002,297.162,0.002,327.68c0,55.827,44.684,101.22,100.235,102.373
                                                        l279.872,55.974c9.154,3.535,19.092,5.493,29.493,5.493c0.007,0,0.013,0,0.02,0c0.107,0,0.212-0.006,0.318-0.008
                                                        c45.09-0.183,81.582-36.779,81.582-81.911V122.88C491.522,55.024,436.498,0,368.642,0z M368.642,40.96
                                                        c45.234,0,81.92,36.685,81.92,81.92s-36.686,81.92-81.92,81.92s-81.92-36.685-81.92-81.92S323.407,40.96,368.642,40.96z
                                                        M331.563,434.547L172.13,402.66c20.096-18.697,32.672-45.369,32.672-74.98c0-48.944-34.346-89.864-80.247-99.989
                                                        l121.216-104.091c0.388,67.524,55.255,122.161,122.871,122.161c31.472,0,60.178-11.842,81.92-31.305v124.211
                                                        c-12.052-6.974-26.033-10.985-40.96-10.985c-45.246,0-81.92,36.674-81.92,81.92C327.682,418.301,329.05,426.679,331.563,434.547z
                                                        M40.962,327.68c0-18.955,8.591-35.9,22.085-47.171l0.303-0.261c10.617-8.751,24.221-14.009,39.052-14.009
                                                        c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44c-0.023,0-0.046-0.002-0.07-0.002
                                                        c-0.018,0-0.036-0.001-0.054-0.001C68.406,389.05,40.962,361.568,40.962,327.68z M411.402,450.514l-19.237-3.847
                                                        c-13.901-6.549-23.523-20.68-23.523-37.067c0-22.625,18.335-40.96,40.96-40.96s40.96,18.335,40.96,40.96
                                                        C450.562,431.621,433.191,449.572,411.402,450.514z"/>
                                                </g>
                                            </g>
                                        </g>
                                        </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">Motor</span>
                                            {vehicle?.acf.motor}
                                        </div>
                                    </div>
                                }
                                {vehicle?.acf.tipo.nodes[0].name &&
                                    <div className="text-sm font-semibold border-2 rounded-lg p-2 xsm:p-3 dark:text-neutral-200 text-slate-900 flex items-center gap-1 w-100">
                                        <div className="dark:bg-slate-800 bg-slate-200 rounded-full">
                                        <svg className="w-10 h-10 p-2" stroke="currentColor" fill="#90A3BF" strokeWidth="0" viewBox="0 0 256 256" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M240,112H211.31L168,68.69A15.86,15.86,0,0,0,156.69,64H44.28A16,16,0,0,0,31,71.12L1.34,115.56A8.07,8.07,0,0,0,0,120v48a16,16,0,0,0,16,16H33a32,32,0,0,0,62,0h66a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V128A16,16,0,0,0,240,112ZM44.28,80H156.69l32,32H23ZM64,192a16,16,0,1,1,16-16A16,16,0,0,1,64,192Zm128,0a16,16,0,1,1,16-16A16,16,0,0,1,192,192Z"></path></svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">Carroceria</span>
                                            {vehicle?.acf.tipo.nodes[0].name}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="flex gap-2 pt-4">
                                <DynamicFavoriteToggleButton vehicle={vehicle} extraClass="flex items-center gap-1 text-xl border-2 border-blue-600 p-3 rounded-lg text-4xl [&_svg]:text-4xl">Favorito</DynamicFavoriteToggleButton>
                                <Link href={``} className="flex items-center w-fit gap-2 text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"> <BsWhatsapp className="text-4xl text-white"/> Fale com o vendedor</Link>
                            </div>
                        </div>
                    </div>
                    {vehicle?.content &&
                        <div className="w-full space-y-4">
                            <h2 className="font-bold text-3xl">Descrição</h2>
                            <div dangerouslySetInnerHTML={{ __html: vehicle?.content }}></div>
                        </div>
                    }
                    <div className="w-full space-y-4">
                        <h2 className="font-bold text-3xl">Adicionais</h2>
                        <div className="flex flex-wrap gap-2 ">
                            {vehicle?.acf.adicionais && vehicle?.acf.adicionais.map((item, index) => (
                                <div className="inline-block dark:bg-slate-800 bg-slate-200 rounded-lg px-2 py-1">{item}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <section className="w-full mx-auto text-center dark:bg-slate-800 bg-blue-200 p-10 space-y-5 mt-16">
                    <h2 className="font-bold text-4xl">Veja mais carros desta <span className="dark:text-blue-500 text-blue-600">marca</span> ou <span className="dark:text-blue-500 text-blue-600">carroceria</span></h2>
                    <div className="flex justify-center gap-4">
                        <Link href={`/veiculos?marca=${vehicle?.acf.marca.nodes[0].name}`} className="text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"> {vehicle?.acf.marca.nodes[0].name}</Link>
                        <Link href={`/veiculos?tipo=${vehicle?.acf.tipo.nodes[0].name}`} className="text-xl bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors">{vehicle?.acf.tipo.nodes[0].name}</Link>
                    </div>
                </section>
            </div>
        </>
    );
}