import{ useEffect,useState} from 'react'
import { useParams, useNavigate}from 'react-router-dom'
import api, { buscaTorrentsPorTitulo } from '../../services/Api';
import './filme-info.css';
import { toast } from "react-toastify";


function Filme (){
 const {id} = useParams();
 const navigate = useNavigate();
 const [filme,setfilme] = useState({});
 const [loading,setloading] = useState(true);


 useEffect(()=>{
  async function loadfilmes(){
  await api.get(`/movie/${id}` ,{
    params:{
        api_key:"feece1d612eac77d92871421b4dcfd68",
        language:"pt-BR",
    }
  })
  .then((response) =>{
    setfilme(response.data)
    setloading(false)

  })

  .catch(() =>{
   navigate(-1)

    
  })

  }
    loadfilmes();
    return()=>{
        console.log("desmontando tela")
    }

 },[navigate,id])


function salvarFilme(){
const listafilmes = localStorage.getItem("@lokflix")

let filmesSalvos  = JSON.parse(listafilmes) || [];

const hasfilmes = filmesSalvos.some((filmesalvo) => filmesalvo.id === filme.id);

if (hasfilmes){
toast.warn("Filme ja foi salvo")
}else{

filmesSalvos.push(filme)

localStorage.setItem("@lokflix" , JSON.stringify(filmesSalvos))
toast.success("filme salvo em favoritos")
}
}


const handleBuscarTorrent = async () =>{
  try{
    const torrents = await buscaTorrentsPorTitulo(filme.title);
    console.log('Arquivos Encontrados :', torrents)
  }
  catch (error){
    console.error('Error'.error)
  }
};




if(loading){
    return(
        <div className='filme-info'>
           <h1> Carregando Detalhes do Filme...</h1> 
        </div>

    );
} 



    return(
    <div className='filme-info'>

        <h1>{filme.title}</h1>

         <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt = {filme.title} />


         <h3>Sinopse</h3>
         <spam>{filme.overview}</spam>

         <strong>Avaliaçao: {filme.vote_average} / 10 </strong>

         <div className='area-button'>
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target ="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title}`}> Trailer</a>
            </button>

         </div>
         <button onClick={handleBuscarTorrent}>Buscar Torrent</button>
    </div>

    )

}

export default Filme;