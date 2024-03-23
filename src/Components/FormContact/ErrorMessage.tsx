
type Props = {
    color?: string
    message?: string
}
export const ErrorMessage= ({color, message}: Props) => {
    return (
        <p className={`text-lg pl-2 font-normal ${color ? color : 'text-red-300'}`}>
            {message}
        </p>
    )
} 