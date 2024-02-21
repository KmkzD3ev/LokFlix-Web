import './header.css'
import {Link} from 'react-router-dom'



function Header(){
    return(
        <header>
            
           <Link className='logo' to='/'>Lok Flix</Link>
           <Link className='favoritos' to='/favoritos'>favoritos</Link>
           <search>pergunte algo</search>



        </header>



    );
}

export default Header;