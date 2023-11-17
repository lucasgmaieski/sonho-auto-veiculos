import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
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