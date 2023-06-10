import './App.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import GithubBotao from './components/GithubBotao/GithubBotao';
import Repositorio from './components/Repositorio/Repositorio';

function App() {
	
	const [search, setSearch] = useState("");
	const [user, setUser] = useState([]);
	const [repo, setRepo] = useState([]);

	const handleSearch = (search) => {
		axios
			.get(`https://api.github.com/users/${search}`)
			.then((res) => {
				setUser(res.data);

				axios.get(`https://api.github.com/users/${search}/repos`)
				.then((res) => {
					setRepo(res.data);
				});
			})
			.catch((err) => {
				console.error("ops! ocorreu um erro" + err);
			});
	}

	const inputRef = useRef(null);

	useEffect(() => {
		window.onkeydown = (e) => {
			if (document.activeElement === inputRef.current && e.key === "Enter") {
				handleSearch(inputRef.current.value);
			}
		}
	}, []);

	return (
		<main>
			<div className="perfil">
				<div className="form">
					<h1>Buscar perfil do Github</h1>
					<input
						ref={inputRef} 
						type="text" 
						placeholder="Nome de usuário"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button onClick={() => handleSearch(search)}>Buscar</button>
				</div>
				<div className="content">
					<img className="avatar" src={user.avatar_url ? user.avatar_url : "https://avatars.githubusercontent.com/u/64756172?v=4"} alt="foto de perfil" />
					<p className="nome" >{user.name ? user.name : "(Nome do usuário)"}</p>
					<p>{user.bio ? user.bio : "(Descrição)"}</p>
					<GithubBotao href={user.html_url} texto={"Github"} />
				</div>
			</div>
			<div className="repositorios">
				{repo.map((obj, i) => {
					return (
						<Repositorio key={i} user={user} repo={obj}/>
					)
				})}
			</div>
		</main>
	);
}

export default App;
