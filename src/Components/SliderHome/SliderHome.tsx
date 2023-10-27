'use client'

import api from "@/api";
import styles from './sliderhome.module.scss'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default async function SliderHome() {
    // const menuTipos: any = await api.getMenu(8);
    // console.log(menuTipos);

    // function getUrl(url: string): string {
    //     if(process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    //         url = url.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, process.env.NEXT_PUBLIC_SITE_URL)
    //         return url;
    //     }
    //     return '/';
    // }

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex:any) => {
        setIndex(selectedIndex);
    };
    
    return (
        <div className="container-fluid">
            {/* <ul className={`${styles.menuTipos} container-fluid w-100 d-flex justify-content-between align-items-center list-unstyled`}>
                {menuTipos && menuTipos.itens.map((menu: any, index: number) => (
                    <li key={index}><Link href={getUrl(menu.url)}>{menu.title}</Link> </li>
                ))}
            </ul> */}
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img src="/banner-home1.jpg" alt="" />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/banner-home1.jpg" alt="" />
                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/banner-home1.jpg" alt="" />
                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}