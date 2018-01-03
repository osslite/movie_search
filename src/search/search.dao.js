import {
    ToastAndroid
} from 'react-native';

const MOVIE_URL = 'https://mafioso.cz/movies/movie.php?name=';

class SearchDao {

    fetchItems = (name, onSuccess, onError) => {
        const url = MOVIE_URL + name;

        console.log("fetching", url);

        let httpOptions = {
            method: 'GET',
            cache: 'no-store',
            // credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Basic bW92aWVzOmtvcHJvdmth"
            }
        };

        fetch(url, httpOptions)
            .then(response => !response.ok ? null : response.text())
            .then(response => onSuccess(JSON.parse(response)))
            .catch(error => onError(error));
    }
}

export default SearchDao;
