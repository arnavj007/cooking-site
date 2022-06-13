import './Searchbar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
	const [term, setTerm] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		
		navigate(`/search?q=${term}`); // ! redirects to search page with search term as query parameter 'q'
	};

	return (
		<div className="searchbar">
			<form onSubmit={handleSubmit}>
				<label htmlFor="search"></label>
				<input 
					type="text" 
					id="search"
					placeholder="Search"
					onChange={(e) => setTerm(e.target.value)}
					value={term}
					required 
				/>
			</form>
		</div>
	)
}

export default SearchBar; 