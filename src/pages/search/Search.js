import './Search.css';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList';

const Search = () => {
	const queryString = useLocation().search;
	const queryParameters = new URLSearchParams(queryString);
	const query = queryParameters.get('q');

	// ! with query parameter included in API endpoint, JSON server will return all recipes that INCLUDE the query parameter
	const url = `http://localhost:3000/recipes?q=${query}`;
	const { data: matchingRecipes , isPending, error} = useFetch(url);

	return (
		<div>
			<h2 className="page-title">Recipes including "{query}"</h2>
			{error && <p className="error">{error}</p>}
			{isPending && <p className="loading">Loading...</p>}
			{matchingRecipes && <RecipeList recipes={matchingRecipes} />}
		</div>
	)
}

export default Search;