type Props = {
    name: string;
    email: string;
    phone: string;
    state: string;
    city: string;
    message: string;
}
export default function EmailTemplate({name, email, phone, state, city, message}: Props) {
    return (
        <div style={{maxWidth: '860px', margin: '0 auto', backgroundColor: '#f3f9ff', padding: '10px 20px', color: 'black'}}>
            <h2>Você recebeu um email de contato enviado atráves do formulário pelo site: {process.env.NEXT_PUBLIC_SITE_URL+'/contato'}</h2>
            <ul style={{listStyleType: "none", padding: '0',}}>
                <li><strong>Nome: </strong>{name}</li>
                <li><strong>E-mail: </strong>{email}</li>
                <li><strong>Telefone: </strong>{phone}</li>
                <li><strong>Estado: </strong>{state}</li>
                <li><strong>Cidade: </strong>{city}</li>
                <li><strong>Mensagem: </strong>{message}</li>
            </ul>
        </div>
    )
}