import React from "react";

export default function Erro ({ erro = false }) {

    if (erro === 404) {
        return (
            <div>Usuário não encontrado</div>    
        );
    } else if (erro === 403) {
        return (
            <div>Limite de requisições na API do github</div>
        );
    } else {
        return (
            <div>Ocorreu um erro, tente novamente</div>
        );
    }
}