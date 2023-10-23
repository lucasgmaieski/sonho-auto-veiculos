
import api from "@/api";
import Link from "next/link";
import styles from './header.module.scss'

export default async function Header() {
    const menuPrincipal: any = await api.getMenu(9);
    console.log(menuPrincipal);

    function getUrl(url: string): string {
        if(process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_WORDPRESS_URL) {
            url = url.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, process.env.NEXT_PUBLIC_SITE_URL)
            return url;
        }
        return '/';
    }
    return (
        <header className={`${styles.header} d-flex justify-content-between align-items-center`}>
            <h1><img src="/logo.svg" alt="" /></h1>
            <div>input search</div>
            <nav>
                <ul>
                    {menuPrincipal && menuPrincipal.itens.map((menu: any, index: number) => (
                        <li key={index}><Link href={getUrl(menu.url)}>{menu.title}</Link> </li>
                    ))}
                </ul>
            </nav>
            <div>
                <div>Favoritos</div>
                <div>Light/Dark</div>
            </div>
        </header>
    );
}