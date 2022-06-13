import './Create.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

const Create = () => {
	const [title, setTitle] = useState('');
	const [method, setMethod] = useState('');
	const [cookingTime, setCookingTime] = useState('');
	const [newIngredient, setNewIngredient] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const ingredientInput = useRef(null); // ! getting reference to ingredient input field to focus on it after each entry
	const navigate = useNavigate();

	// ! notice here, we recieve postData function which we then use by passing in the new recipe to post
	// ! 'POST' is specifed as 2nd argument, and API endpoint remains same
	const { postData, data, error, isPending } = useFetch('http://localhost:3000/recipes', 'POST');

	const handleSubmit = (e) => {
		e.preventDefault();
		
		postData({ title, ingredients, method, cookingTime: `${cookingTime} minutes` }); // * id not needed as JSON server assigns

		setTitle('');
		setMethod('');
		setCookingTime('');
		setIngredients('');
	};

	// * redirects back to home once recipe added, kept in useEffect to trigger on updation of 'data'
	// ! we must keep redirecting code here and NOT in submit handler as post request is asyncrhounous
	useEffect(() => {
		data && navigate('/');
	}, [data]);

	const handleAdd = (e) => {
		e.preventDefault();

		const ingredient = newIngredient.trim();
		if (ingredient && !ingredients.includes(ingredient)) { // ! ensures not blank ingredient, ensures not duplicate ingredient
			setIngredients(prevIngredients => [...prevIngredients, ingredient]);
		}

		setNewIngredient(''); // ! 2-way linking using 'value' in form will clear the input field to enter new ingredient
		ingredientInput.current.focus(); // * focus on ingredient input field after each entry added
	};

	return (
		<div className="create">
			<h2 className="page-title">Add a New Recipe</h2>

			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Recipe title:</label>
				<input 
					type="text" 
					name="title"
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					required 
				/>

				{/* ingredients form element slightly different as here we take input ingredient-by-ingredient */}
				<label htmlFor="ingredients">Recipe ingredients:</label>
				<div className="ingredients">
					<input 
						type="text" 
						name="ingredient" 
						onChange={(e) => setNewIngredient(e.target.value)}
						value={newIngredient}
						ref={ingredientInput}
					/>
					<button className="btn" onClick={handleAdd}>add</button>
				</div>
				<p>Current ingredients: {ingredients && ingredients.map(ing => <em key={ing}>{ing}, </em>)}</p>

				<label htmlFor="method">Recipe method:</label>
				<textarea
					name="method"
					onChange={(e) => setMethod(e.target.value)}
					value={method}
					required 
				/>

				<label htmlFor="cookingTime">Cooking time (minutes):</label>
				<input 
					type="number"
					name="cookingTime" 
					onChange={(e) => setCookingTime(e.target.value)}
					value={cookingTime}
					required 
				/>

				<button className="btn">submit</button>
			</form>
		</div>
	)
}

export default Create;