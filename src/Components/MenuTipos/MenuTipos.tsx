
import api from "@/api";
import Link from "next/link";
import styles from './menutipos.module.scss'

export default async function MenuTipos() {
    const menuTipos: any = await api.getMenu(8);
    console.log(menuTipos);

    function getUrl(url: string): string {
        if(process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_WORDPRESS_URL) {
            url = url.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, process.env.NEXT_PUBLIC_SITE_URL)
            return url;
        }
        return '/';
    }
    return (
        <div className="container-fluid">
            <ul className={`${styles.menuTipos} container-fluid w-100 d-flex justify-content-between align-items-center list-unstyled`}>
                {menuTipos && menuTipos.itens.map((menu: any, index: number) => (
                    <li key={index}><Link href={getUrl(menu.url)}>{menu.title}</Link> </li>
                ))}
            </ul>
        </div>
    );
}