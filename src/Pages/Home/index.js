import {useEffect , useState} from 'react'
import api from '../../services/Api';
import {Link} from 'react-router-dom'
import './home.css';

//movie/now_playing?api_key=feece1d612eac77d92871421b4dcfd68&language=pt-BR


function Home(){


const [filmes ,setfilmes] = useState([]);
const[loading,setloading] = useState(true)
const[currentPage,setcurrentPage] = useState(1)
const [prevPage, setPrevPage] = useState(null);


useEffect(() =>{

    async function loadfilmes(){
        const response  = await api.get("movie/now_playing",{
            params:{
                api_key:"feece1d612eac77d92871421b4dcfd68",
                language:"pt-BR",
                page:currentPage

            }
        })


        console.log(`Filmes na página ${currentPage}:`, response.data.results);

     setfilmes(response.data.results)
     setloading(false)
    }

    loadfilmes();

},[currentPage])


const loadMoreFilmes= () =>{
    console.log("PrevPage:", prevPage);
    setPrevPage(currentPage)
    setcurrentPage(currentPage + 1);
};

const goBack= () =>{
    console.log("PrevPage:", prevPage);
    if (prevPage !== null ){
        setcurrentPage(prevPage);
        setPrevPage(currentPage - 1 )
    }
}


if(loading){
    return(
        <div className='load'>
        <h1>  Carregando filmes....</h1>  
        </div>
    )

}


    return(
      <div className='conteiner'>
     {loading && <div className='load'><h1>Carregando filmes....</h1>
                 </div>}
            {!loading && (
                <div>
                    <button className='advance' onClick={loadMoreFilmes}>Carregar Mais Filmes</button>
                    {prevPage !== null && <button className='goback' onClick={goBack}>Voltar</button>}
                </div>
            )}

        <div className='lista-filmes'>
            {filmes.map((filme)=>{
                return(
                    <article key ={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title}/>
                        <Link to={`/filme/${filme.id}`}>Acessar</Link>
                    </article>

                );

            } )}

</div>
            
        </div>
    )

}

export default Home;