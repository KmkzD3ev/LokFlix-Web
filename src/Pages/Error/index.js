import{Link}from'react-router-dom'
import './erro.css';


function Error(){
    return(
        <div className="not-found">
           <h1>ERRO 404</h1> 
           <h2>Pagina nao encontrada !</h2>
           <Link to='/'>Ir para Home</Link>

        </div>
    )
    
}
export default Error;