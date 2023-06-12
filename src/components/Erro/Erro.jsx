import React from "react";

export default function Erro ({ erro = false }) {
    return (
        <>
            {
                erro === 404 
                ? <div>Usuário não encontrado</div>
                : <div>Limite de requisições para a API do github atingido</div>
            }
        </>
    )
}