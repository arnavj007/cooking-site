import './Recipe.css';
import { useFetch } from '../../hooks/useFetch';
import { Link, useParams } from 'react-router-dom';

const Recipe = () => {
	const { id } = useParams();
	const { data: recipe, isPending, error } = useFetch(`http://localhost:3000/recipes/${id}`);

	return (
		<div className="recipe">
			{error && <p className="error">{error}</p>}
			{isPending && <p className="loading">Loading...</p>}
			{recipe && (
				<>
					<h2 className="page-title">{recipe.title}</h2>
					<p>Takes {recipe.cookingTime} to make</p>
					<ul>
						{recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
					</ul>
					<p className="method">{recipe.method}</p>
				</>
			)}
		</div>
	)
}

// ! we are using 'ingredient' itself as the key for the individual list items since we will ensure ingredients are UNIQUE

export default Recipe;