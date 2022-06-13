import './RecipeList.css';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipes }) => {

	// ! in case no recipes in database, or if no recipes match search term, message displayed
	if (recipes.length === 0) {
		return <div className="error">No recipes found...</div>
	}
	
	return (
		<div className="recipe-list">
			{recipes.map(recipe => (
				<div key={recipe.id} className="card">
					<h3>{recipe.title}</h3>
					<p>Cooking Time: {recipe.cookingTime}</p>
					<div>{recipe.method.slice(0, 100)}...</div> {/* only retrieves first 100 characters of method */}
					<Link to={`/recipes/${recipe.id}`}>Cook this!</Link>
				</div>
			))}
			
		</div>
	)
}

export default RecipeList;