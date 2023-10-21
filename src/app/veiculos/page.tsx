
async function getPosts() {
    try{
        const response = await fetch('http://localhost:888/sonhoautoveiculos.com.br/wp-json/wp/v2/veiculos', { cache: 'no-store' });
        if(!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const posts = await response.json();
        console.log(posts[0]);
        return posts || [];
    
    } catch (err) {
        console.log(err);
    }
    
}

export default async function PageVeiculos() {
    const posts: any = await getPosts();
    
    return (
        <div>
            <h1>Página de Veículos</h1>
            <ul>
                {posts && posts.map((item:any, index:any) => (
                    <li key={index}>{item.title.rendered} - {item.acf.combustivel}</li>
                ))}
                {!posts &&
                    <p>Nenhum vaículo para mostrar!</p>
                }
            </ul>
        </div>
    );
}