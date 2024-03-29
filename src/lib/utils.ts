import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUrl(url: string): string {
  if(process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_WORDPRESS_URL) {
      url = url.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, process.env.NEXT_PUBLIC_SITE_URL)
      return url;
  }
  return '/';
}
export function getLastPartUrl(url: string): string {
  const partsUrl = url.split("/");
  const lastPart = partsUrl[partsUrl.length - 2];
  return lastPart;
}

export function useQueryParams<T = {}>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(
    Array.from(searchParams.entries()),
  );

  function setQueryParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, String(value));
      }
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  function removeQueryParams() {
    router.push(pathname);
  }

  return { urlSearchParams, setQueryParams, removeQueryParams };
}

export function getNameField( slug: string ) {
  switch (slug) {
    case 'ano':
      return 'Ano';
    case 'preco':
      return 'Preço';
    case 'quilometros':
      return 'Quilomêtros';
    case 'tipo':
      return 'Tipo';
    case 'combustivel':
      return 'Combustível';
    case 'condicao':
      return 'Condição';
    case 'cor':
      return 'Cor';
    case 'direcao':
      return 'Direção';
    case 'motor':
      return 'Motor';
    case 'portas':
      return 'Portas';
    case 'transmissao':
      return 'Transmissão';
    default:
      break;
  }
}