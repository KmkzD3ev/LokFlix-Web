import './favoritos.css'; // Importa o arquivo CSS para estilização
import { useEffect, useState } from 'react'; // Importa useEffect e useState do React
import { Link } from 'react-router-dom'; // Importa Link do React Router para navegação entre páginas
import { toast } from 'react-toastify'; // Importa a função toast do react-toastify para exibir mensagens de notificação

function Favoritos() { // Define o componente Favoritos

    // Define um status para armazenar os filmes favoritos
    const [filmes, setFilmes] = useState([]);

    // Define um efeito que é executado uma vez, quando o componente é montado
    useEffect(() => {
        // Obtém a lista de filmes favoritos do localStorage
        const listaFilmes = localStorage.getItem("@lokflix");
        // Atualiza o status com os filmes favoritos, convertendo-os de JSON para objeto JavaScript
        setFilmes(JSON.parse(listaFilmes) || []);
    }, []);

    // Função para excluir um filme da lista de favoritos
    function excluirFilme(id) {
        // Filtra os filmes, removendo o filme com o ID fornecido
        let filtroFilmes = filmes.filter((filme) => {
            return (filme.id !== id);
        });
        // Atualiza o status com a lista filtrada de filmes
        setFilmes(filtroFilmes);

        // Atualiza o localStorage com a lista filtrada de filmes, convertendo-os para JSON
        localStorage.setItem("@lokflix", JSON.stringify(filtroFilmes));

        // Exibe uma mensagem de sucesso usando toastify
        toast.success("Filme removido");
    }

    // Retorna o JSX para renderizar na tela
    return (
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>
            {/* Verifica se não há filmes salvos e exibe uma mensagem */}
            {filmes.length === 0 && <span>Você não tem filmes salvos</span>}
            <ul>
                {/* Mapeia os filmes e renderiza cada um como um item de lista */}
                {filmes.map((filme) => {
                    return (
                        <li key={filme.id}>

                            <div className='aling'>

                            <span>{filme.title}</span>

                            <img className='fav-filmes' src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title}/>
                            </div>

                            <div>
                                {/* Renderiza um Link para acessar detalhes do filme */}
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                                
                                {/* Renderiza um botão para excluir o filme */}
                                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Favoritos; // Exporta o componente Favoritos para uso em outros arquivos
