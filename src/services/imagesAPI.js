import axios from 'axios';


const apiService = async (query, page) => {
    const { data } = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=37745610-94fa81a6ea5e93adfdf3ac469&image_type=photo&orientation=horizontal&per_page=12`,
    );

    return data.hits;
};

export default apiService;