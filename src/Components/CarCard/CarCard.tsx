"use client"
import { VehicleCustomType } from "@/Types/VehicleCustomType";
import SliderCard from "../SliderCard/SliderCard"
import { getUrl } from "@/lib/utils";
import { useEffect, useState } from 'react'
import { thousandsMask } from "@/lib/masks/thousandsMask";
import dynamic from "next/dynamic";

const DynamicFavoriteToggleButton = dynamic(() => import('@/Components/Favorites/FavoriteToggleButton'), {
    ssr: false,
}) 

type Props = {
    vehicle: VehicleCustomType;
    home?: boolean
}
export default function CarCard({vehicle, home}: Props) {
    let galeriaArray = []
    if(home) {
        vehicle.acf.galeriaDeImagens?.nodes.forEach(element => {
            galeriaArray.push(element.mediaItemUrl)
        });
        galeriaArray.push(vehicle.featuredImage?.node.mediaItemUrl);
    } else {
        (vehicle.acf.galeria_de_imagens as string[]).forEach(element => {
            galeriaArray.push(element)
        });
        galeriaArray.push(vehicle.imagemDestacada)
    }
    const [galeria, setGaleria] = useState<string[]>()
    useEffect(() => {
        setGaleria(galeriaArray)
        console.log(galeriaArray)
    }, [vehicle]);
    console.log(vehicle);

    return(
        <div className="flex items-center justify-center bg-transparent p-2 slider-card">
            <div className="mx-auto w-full h-full">
                <div className="border-[1px] dark:border-blue-900 border-blue-200 rounded-lg dark:bg-slate-800 bg-slate-100 p-2 shadow duration-150 hover:scale-[102%] hover:shadow-md h-full flex flex-col">
                    <div className="flex items-start justify-between p-1 gap-1">
                        <a href={getUrl(vehicle.link)} className="font-bold dark:text-neutral-200 text-slate-900 line-clamp-1" title={vehicle.title}>{vehicle.title}</a>
                        {/* <FavoriteToggleButton vehicle={vehicle}/> */}
                        <DynamicFavoriteToggleButton vehicle={vehicle} extraClass="bg-transparent text-2xl"> </DynamicFavoriteToggleButton>
                    </div>
                    {/* <img className="w-full rounded-lg object-cover object-center" src="../../../car.png" alt="product" /> */}
                    <SliderCard images={galeria as string[]}/>
                    <div className="flex flex-col flex-1">
                        <div className="my-4 flex flex-wrap content-start justify-start px-2 gap-y-2 gap-x-2 flex-1">
                            {vehicle.acf.combustivel && 
                                <div className="text-sm dark:text-neutral-200 text-slate-900 font-semibold flex items-center gap-1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.34 9.33L20.34 8.33C19.97 8.15 19.51 8.29 19.33 8.66C19.14 9.04 19.29 9.49 19.66 9.67L21.25 10.46V15.25L17.5 15.26V5C17.5 3 16.16 2 14.5 2H6.5C4.84 2 3.5 3 3.5 5V21.25H2C1.59 21.25 1.25 21.59 1.25 22C1.25 22.41 1.59 22.75 2 22.75H19C19.41 22.75 19.75 22.41 19.75 22C19.75 21.59 19.41 21.25 19 21.25H17.5V16.76L22 16.75C22.42 16.75 22.75 16.41 22.75 16V10C22.75 9.72 22.59 9.46 22.34 9.33ZM6 6.89C6 5.5 6.85 5 7.89 5H13.12C14.15 5 15 5.5 15 6.89V8.12C15 9.5 14.15 10 13.11 10H7.89C6.85 10 6 9.5 6 8.11V6.89ZM6.5 12.25H9.5C9.91 12.25 10.25 12.59 10.25 13C10.25 13.41 9.91 13.75 9.5 13.75H6.5C6.09 13.75 5.75 13.41 5.75 13C5.75 12.59 6.09 12.25 6.5 12.25Z" fill="#90A3BF"/>
                                    </svg>
                                    {vehicle.acf.combustivel}
                                </div>
                            }
                            {vehicle.acf.transmissao && 
                                <div className="text-sm dark:text-neutral-200 text-slate-900 font-semibold flex items-center gap-1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.53 2 12 2Z" fill="#90A3BF"/>
                                    <rect x="4" y="4" width="16" height="16" rx="8" fill="white"/>
                                    <path d="M12 6C8.688 6 6 8.688 6 12C6 15.312 8.688 18 12 18C15.312 18 18 15.312 18 12C18 8.688 15.318 6 12 6Z" fill="#90A3BF"/>
                                    <rect x="8" y="8" width="8" height="8" rx="4" fill="white"/>
                                    <rect x="11" y="17" width="2" height="4" fill="#90A3BF"/>
                                    <rect x="17" y="11" width="4" height="2" fill="#90A3BF"/>
                                    <rect x="3" y="11" width="4" height="2" fill="#90A3BF"/>
                                    </svg>
                                    {vehicle.acf.transmissao}
                                </div>
                            }
                            {vehicle.acf.direcao && 
                                <div className="text-sm dark:text-neutral-200 text-slate-900 font-semibold flex items-center gap-1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="#90A3BF"/>
                                    <path d="M15.5801 19.25C15.1701 19.25 14.8301 18.91 14.8301 18.5V14.6C14.8301 14.19 15.1701 13.85 15.5801 13.85C15.9901 13.85 16.3301 14.19 16.3301 14.6V18.5C16.3301 18.91 15.9901 19.25 15.5801 19.25Z" fill="#90A3BF"/>
                                    <path d="M15.5801 8.2C15.1701 8.2 14.8301 7.86 14.8301 7.45V5.5C14.8301 5.09 15.1701 4.75 15.5801 4.75C15.9901 4.75 16.3301 5.09 16.3301 5.5V7.45C16.3301 7.86 15.9901 8.2 15.5801 8.2Z" fill="#90A3BF"/>
                                    <path d="M15.58 13.4C13.73 13.4 12.23 11.9 12.23 10.05C12.23 8.20001 13.73 6.70001 15.58 6.70001C17.43 6.70001 18.93 8.20001 18.93 10.05C18.93 11.9 17.42 13.4 15.58 13.4ZM15.58 8.20001C14.56 8.20001 13.73 9.03001 13.73 10.05C13.73 11.07 14.56 11.9 15.58 11.9C16.6 11.9 17.43 11.07 17.43 10.05C17.43 9.03001 16.59 8.20001 15.58 8.20001Z" fill="#90A3BF"/>
                                    <path d="M8.41992 19.25C8.00992 19.25 7.66992 18.91 7.66992 18.5V16.55C7.66992 16.14 8.00992 15.8 8.41992 15.8C8.82992 15.8 9.16992 16.14 9.16992 16.55V18.5C9.16992 18.91 8.83992 19.25 8.41992 19.25Z" fill="#90A3BF"/>
                                    <path d="M8.41992 10.15C8.00992 10.15 7.66992 9.81 7.66992 9.4V5.5C7.66992 5.09 8.00992 4.75 8.41992 4.75C8.82992 4.75 9.16992 5.09 9.16992 5.5V9.4C9.16992 9.81 8.83992 10.15 8.41992 10.15Z" fill="#90A3BF"/>
                                    <path d="M8.42007 17.3C6.57007 17.3 5.07007 15.8 5.07007 13.95C5.07007 12.1 6.57007 10.6 8.42007 10.6C10.2701 10.6 11.7701 12.1 11.7701 13.95C11.7701 15.8 10.2701 17.3 8.42007 17.3ZM8.42007 12.1C7.40007 12.1 6.57007 12.93 6.57007 13.95C6.57007 14.97 7.40007 15.8 8.42007 15.8C9.44007 15.8 10.2701 14.97 10.2701 13.95C10.2701 12.93 9.45007 12.1 8.42007 12.1Z" fill="#90A3BF"/>
                                    </svg>
                                    {vehicle.acf.direcao}
                                </div>
                            }
                            {vehicle.acf.ano && 
                                <div className="text-sm dark:text-neutral-200 text-slate-900 font-semibold flex items-center gap-1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                    {vehicle.acf.ano}
                                </div>
                            }
                            {vehicle.acf.quilometros && 
                                <div className="text-sm dark:text-neutral-200 text-slate-900 font-semibold flex items-center gap-1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#90A3BF" strokeWidth="0.5"/>
                                    <path d="M5.42215 14.3941C5.04433 13.3561 4.91755 12.2434 5.05218 11.1469C5.1868 10.0505 5.57901 9.00146 6.19674 8.08565C6.81447 7.16983 7.64017 6.41321 8.60634 5.87766C9.57251 5.3421 10.6517 5.04281 11.7557 5.00426C12.8597 4.96571 13.9572 5.18899 14.9583 5.65585C15.9595 6.12271 16.836 6.81989 17.5161 7.69038C18.1962 8.56088 18.6606 9.57998 18.8714 10.6644C19.0822 11.7487 19.0333 12.8676 18.7288 13.9295" stroke="#90A3BF" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5"/>
                                    <path d="M14.5307 10.041L13.0329 10.9455C12.5024 11.2574 11.9407 11.5381 11.4103 11.7876C11.2543 11.85 11.067 11.9435 10.8798 12.0371C10.2245 12.3802 9.88129 13.0975 10.0373 13.8149C10.1621 14.3763 10.6302 14.8441 11.1918 14.9689C11.3166 15 11.4415 15 11.5663 15C12.1592 15 12.6896 14.657 12.9705 14.1268C13.0329 13.9708 13.1265 13.7837 13.2201 13.5965C13.5009 13.0663 13.7506 12.5049 14.0626 11.9747L14.9675 10.4776C15.0299 10.3529 14.9987 10.2281 14.9051 10.1034C14.8115 9.97859 14.6555 9.97859 14.5307 10.041ZM13.5321 11.6316C13.1889 12.193 12.908 12.7544 12.6584 13.3158C12.596 13.503 12.5024 13.6589 12.4088 13.8461C12.2216 14.2515 11.7847 14.4386 11.3479 14.3451C11.0046 14.2827 10.7238 14.002 10.6614 13.6589C10.5678 13.2223 10.755 12.7856 11.1607 12.5985C11.3167 12.5049 11.5039 12.4426 11.6911 12.349C12.2528 12.0683 12.8457 11.7876 13.3761 11.4757L13.7818 11.2262L13.5321 11.6316Z" fill="#90A3BF"/>
                                    </svg>
                                    {vehicle.acf.quilometros} km
                                </div>
                            }
                            {vehicle.acf.localizacao && 
                                <div className="text-sm dark:text-neutral-200 text-slate-900 font-semibold flex items-center gap-1 w-100">
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 4.28576C7.2808 4.28576 6.57774 4.49522 5.97974 4.88766C5.38175 5.2801 4.91567 5.83788 4.64044 6.49048C4.36521 7.14308 4.2932 7.86118 4.43351 8.55398C4.57382 9.24678 4.92015 9.88315 5.4287 10.3826C5.93726 10.8821 6.5852 11.2223 7.29058 11.3601C7.99597 11.4979 8.72712 11.4271 9.39158 11.1568C10.056 10.8865 10.624 10.4287 11.0235 9.84142C11.4231 9.2541 11.6364 8.56359 11.6364 7.85722C11.6364 6.91001 11.2532 6.00159 10.5713 5.33182C9.88935 4.66204 8.96442 4.28576 8 4.28576ZM8 10.0001C7.56848 10.0001 7.14665 9.87442 6.78785 9.63896C6.42905 9.4035 6.1494 9.06883 5.98426 8.67727C5.81913 8.28571 5.77592 7.85484 5.86011 7.43917C5.94429 7.02349 6.15209 6.64166 6.45722 6.34198C6.76235 6.04229 7.15112 5.8382 7.57435 5.75552C7.99758 5.67283 8.43627 5.71527 8.83495 5.87746C9.23362 6.03965 9.57438 6.31431 9.81412 6.6667C10.0539 7.0191 10.1818 7.4334 10.1818 7.85722C10.1818 8.42555 9.95195 8.9706 9.54278 9.37247C9.13361 9.77433 8.57865 10.0001 8 10.0001ZM8 0C5.87901 0.00236318 3.84557 0.830934 2.3458 2.30394C0.846033 3.77694 0.00240612 5.77408 0 7.85722C0 10.6608 1.31909 13.6323 3.81818 16.4511C4.94111 17.7248 6.20496 18.8717 7.58636 19.8707C7.70865 19.9549 7.85433 20 8.00364 20C8.15294 20 8.29863 19.9549 8.42091 19.8707C9.79977 18.8713 11.0612 17.7244 12.1818 16.4511C14.6773 13.6323 16 10.6608 16 7.85722C15.9976 5.77408 15.154 3.77694 13.6542 2.30394C12.1544 0.830934 10.121 0.00236318 8 0ZM8 18.393C6.49727 17.2323 1.45455 12.9689 1.45455 7.85722C1.45455 6.15224 2.14415 4.51709 3.37166 3.31149C4.59918 2.10589 6.26404 1.42859 8 1.42859C9.73596 1.42859 11.4008 2.10589 12.6283 3.31149C13.8558 4.51709 14.5455 6.15224 14.5455 7.85722C14.5455 12.9671 9.50273 17.2323 8 18.393Z" fill="#90A3BF"/>
                                    </svg>
                                    {vehicle.acf.localizacao}
                                </div>
                            }
                        </div>
                        <div className="my-4 flex flex-wrap items-center justify-between px-2 gap-1">
                            {vehicle.acf.preco &&
                                <p className="text-2xl font-semibold dark:text-neutral-200 text-slate-900">R$ {thousandsMask(vehicle.acf.preco.toString())}</p>
                            }
                            <a href={getUrl(vehicle.link)} className="rounded-md bg-blue-600 px-4 py-2 text-xl font-semibold text-white hover:bg-blue-700 transition-colors">Ver mais</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}