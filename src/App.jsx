import './App.css';
import axios from 'axios';
import { useState } from 'react';



function App() {

	const [search, setSearch] = useState("");
	const [user, setUser] = useState([]);

	const handleSearch = () => {
		axios
			.get(`https://api.github.com/users/${search}`)
			.then((res) => setUser(res.data))
			.catch((err) => {
				console.error("ops! ocorreu um erro" + err)
			});
	}

	return (
		<main>
			<div className="form">
				<h1>Buscar perfil do Github</h1>
				<input 
					type="text" 
					placeholder="Nome de usuário"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button onClick={handleSearch}>Buscar</button>
			</div>
			<div className="content">
				<img src={user.avatar_url ? user.avatar_url : "https://avatars.githubusercontent.com/u/64756172?v=4"} alt="" />
				<p>{user.name ? user.name : "(Nome do usuário)"}</p>
				<p>{user.bio ? user.bio : "(Descrição)"}</p>
				{user.html_url && <a href={user.html_url}>Github</a>}
			</div>
		</main>
	);
}

export default App;
