
async function getPosts() {
    const response = await fetch('http://localhost:888/sonhoautoveiculos.com.br/wp-json/wp/v2/posts?_fields=id,title,content,estrelas', { cache: 'no-store' });
    const posts = await response.json();
    console.log(posts[0]);
    return posts || [];
}

export default async function PageVeiculos() {
    const posts: any = await getPosts();
    
    return (
        <div>
            <h1>Página de Veículos</h1>
            <ul>
                {posts.map((item:any, index:any) => (
                    <li key={index}>{item.title.rendered}</li>
                ))}
            </ul>
        </div>
    );
}