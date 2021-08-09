import React from 'react';

export function HomePage() {
    return (
        <div className='container'>
            <h1 style={{ fontSize: '1.5rem' }}>Bem Vindo ao Covid Simulator</h1>
            <p
                style={{
                    fontSize: '1rem',
                    width: '90%',
                    maxWidth: '700px',
                    textAlign: 'center',
                }}
            >
                O nosso projeto tem como objetivo demonstrar visualmente
                como a covid se espalharia entre pessoas levando em conta
                o uso de máscara das mesmas, utilizando o algoritmo de BFS
                para demonstrar o quanto a doença consegue se alastrar.
                <br />
                <br />
                Você como usuário pode selecionar quem está infectado e quem
                não está, quem está de máscar e quem não está, basta clicar
                em cada nó do grafo e ver sua cor mudar. Cada cor representa
                algo diferente:
            </p>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 15,
                }}
            >
                <b>Sem Covid</b>
                <span
                    style={{
                        height: 20,
                        width: 20,
                        borderRadius: 500,
                        background: 'gray',
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                ></span>
                <b>Sem Máscara</b>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 15,
                }}
            >
                <b>Sem Covid</b>
                <span
                    style={{
                        height: 20,
                        width: 20,
                        borderRadius: 500,
                        background: 'black',
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                ></span>
                <b>Com Máscara</b>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 15,
                }}
            >
                <b>Com Covid</b>
                <span
                    style={{
                        height: 20,
                        width: 20,
                        borderRadius: 500,
                        background: 'red',
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                ></span>
                <b>Sem Máscara</b>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 15,
                }}
            >
                <b>Com Covid</b>
                <span
                    style={{
                        height: 20,
                        width: 20,
                        borderRadius: 500,
                        background: 'pink',
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                ></span>
                <b>Com Máscara</b>
            </div>
            <p
                style={{
                    fontSize: '1rem',
                    width: '90%',
                    maxWidth: '700px',
                    textAlign: 'center',
                    marginTop: 15,
                    marginBottom: 15,
                }}
            >
                Após fazer as alterções de cor que preferir, basta clicar
                duas vezes em uma aresta para ver o resultado da simulação.
                O vírus será espalhado através do grafo e o resultado se dará
                através da mudança de cor dos nós para um gradiente entre o vermelho
                e o branco, quanto mais branco menor a possibilidade de ter pego covid.
            </p>
            <a 
                href='/simulator'
                style={{
                    textDecoration: 'none',
                    outline: 'none',
                    background: 'var(--red-500)',
                    padding: 15,
                    color: 'white',
                    borderRadius: 10,
                }}
            >
                Ir Para o Simulador
            </a>
        </div>
    )
}