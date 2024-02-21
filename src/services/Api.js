import axios from "axios";

//https://api.themoviedb.org/3/movie/now_playing?api_key=feece1d612eac77d92871421b4dcfd68&language=pt-BR

//movie/now_playing?api_key=feece1d612eac77d92871421b4dcfd68&language=pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'

});


const TorrentApi = axios.create({
    baseURL :'https://piratewave.site/api.php'

});


export const buscaTorrentsPorTitulo = async (titulo, max = 10, page = 1) => {
    try {
        const response = await TorrentApi.get('', {
            params: {
                q: titulo,
                max: max,
                page: page,
            }
        });
        return response.data;
        console.log(response)
    } catch (error) {
        console.error('Erro ao buscar torrents:', error);
        throw error;
    }
};




export default api;



