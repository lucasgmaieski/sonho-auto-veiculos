'use client'
import { useEffect } from "react"

export default function GlobalError({
    error, reset,
}: {
    error: Error & { digest?: string}
    reset: () => void
}) {
    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <html>
            <body>
                <div>
                    <h2>Aconteceu um erro na geração da página HTML!</h2>
                    <button onClick={() => reset()}>Tentar novamente</button>
                </div>
            </body>
        </html>
    )
}