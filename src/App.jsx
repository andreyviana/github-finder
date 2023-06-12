import './App.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import GithubBotao from './components/GithubBotao/GithubBotao';
import Repositorio from './components/Repositorio/Repositorio';
import Erro from './components/Erro/Erro';

function App() {
	
	const [search, setSearch] = useState("");
	const [user, setUser] = useState([]);
	const [repo, setRepo] = useState([]);
	const [searchRepo, setSearchRepo] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [errorStatus, setErrorStatus] = useState(false);;
	const [error, setError] = useState("");

	const filteredRepos = searchRepo.length > 0 
		? repo.filter(repo => repo.name.toLowerCase().includes(searchRepo.toLowerCase()))
		: [];

	const handleSearch = async (search) => {
		setErrorStatus(false);
		setUser([]);
		setRepo([])
		

		await axios
			.get(`https://api.github.com/users/${search}`)
			.then((res) => {
				
				setUser(res.data);
				setIsLoading(true);

				axios.get(`https://api.github.com/users/${search}/repos`)
				.then((res) => {
					setRepo(res.data);
					setIsLoading(false);
				});
			})
			.catch((err) => {
				console.error("ops! ocorreu um erro" + err);
				if (err.response.status === 404) {
					setErrorStatus(true);
					setError(404);
					return;
				} else if (err.response.status === 403) {
					setErrorStatus(true);
					setError(403);
					return;
				}
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

	useEffect(() => {
		setSearchRepo(0);
	}, [user]);

	return (
		<main>
			<div className="perfil">
				<div className="form">
					<h1>Buscar perfil do Github</h1>
					<input
						ref={inputRef} 
						type="text" 
						placeholder="ex: andreyviana"
						onChange={e => setSearch(e.target.value)}
					/>
					<button onClick={() => handleSearch(search)}>Buscar</button>
				</div>
				<div className="content">
					<img className="avatar" src={user.avatar_url ? user.avatar_url : "https://avatars.githubusercontent.com/u/64756172?v=4"} alt="foto de perfil" />
					<p className="nome" >
						{
							user.name ? user.name : "(Nome do usuário)"
						}
					</p>
					<p>{user.bio ? user.bio : "(Descrição)"}</p>
					{
						user.name && 
							<GithubBotao 
								href={user.html_url}
								texto={"Github"}
							/>
					}
				</div>
			</div>
			{
				errorStatus && <Erro erro={error} />
			}
			{
				!isLoading &&
					user.public_repos > 0 &&
						<div className="search_repo">
							<input
								className="search_repo"
								type="text" 
								placeholder="Buscar repositório" 
								onChange={e => setSearchRepo(e.target.value)}
							/>
						</div>
			}
			<div className="repositorios">
				{
					isLoading ? <div className="loading"></div> :
					searchRepo.length > 0 
					? filteredRepos.map((obj, i) => {
						return (
							<Repositorio 
								key={i}
								repo={obj}
							/>
						);
					})
					: repo.map((obj, i) => {
						return (
							<Repositorio 
								key={i}
								repo={obj}
							/>
						);
					}) 		
				}
			</div>
		</main>
	);
}

export default App;
