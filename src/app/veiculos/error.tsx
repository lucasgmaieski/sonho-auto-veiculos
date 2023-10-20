'use client'

import Link from "next/link"
import { useEffect } from "react"

 
export default function Error({
    error, reset,
}: {
    error: Error & { digest?: string}
    reset: () => void
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Ocorreu um erro no carregamento da página!</h2>
            <button onClick={() => reset()}>Tentar novamente</button>
            <Link href={'/'}>Voltar para a página inicial</Link>
        </div>
    )
}