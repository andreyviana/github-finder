import React from 'react';
import GithubIcon from '../../assets/github.svg';
import './GithubBotao.css';


export default function GithubBotao({href, texto}) {


	return (		
		<a href={href} target="_blank" rel="noreferrer">
			<img src={GithubIcon} alt="" />
			{texto}
		</a>
	)
}