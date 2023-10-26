
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
        <header className={`${styles.header} container-fluid d-flex  align-items-center`}>
            <h1><Link href={process.env.NEXT_PUBLIC_SITE_URL || '/'}><img src="/logo.svg" alt="" /></Link></h1>
            <div className="m-auto">input search</div>
            <nav className="row w-50 gap-3 justify-content-between align-items-center">
                <ul className={`${styles.menuHeader} d-flex justify-content-between align-items-center list-unstyled col mb-0`}>
                    {menuPrincipal && menuPrincipal.itens.map((menu: any, index: number) => (
                        <li key={index}><Link href={getUrl(menu.url)}>{menu.title}</Link> </li>
                    ))}
                </ul>
                <div className="col d-flex justify-content-end">
                    <div>Favoritos</div>
                    <div>Light/Dark</div>
                </div>
            </nav>
        </header>
    );
}