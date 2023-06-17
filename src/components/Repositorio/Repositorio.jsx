import { React, memo } from 'react';
import './Repositorio.css';
import GithubBotao from '../GithubBotao/GithubBotao';

function Repositorio({ repo }) {

    const dataCriacao = new Date(repo.created_at);



    return (
        <div className="container">
            <h1 className="name">{repo.name}</h1>
            <p className="created_at">data de criação: {dataCriacao.toLocaleDateString("pt-br", {
                day: "numeric",
                month: "numeric",
                year: "numeric"
            })}</p>
            <p className="description" style={!repo.description ? {color: "#ff0080"} : null}>
                {repo.description ? repo.description : "sem descrição" }
            </p>
            <div className="topics">
                {
                    repo.topics.map((e, i) => {
                        return (
                            <p className="topic" key={i}>{e}</p>
                        )
                    })
                }
            </div>
            <div className="button">
                <GithubBotao className="aquilo" href={repo.html_url} texto={"repositório"} />
            </div>
        </div>
    )
}

export default memo(Repositorio);