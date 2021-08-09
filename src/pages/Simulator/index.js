import React from 'react';
import { GraphComponent } from '../../components/Graph';

import './styles.css';

export function SimulatorPage() {
    return (
        <div
            className='container'
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    padding: 25,
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <p style={{ textAlign: 'center' }}>Clique em um nó para mudar seu estado e sua cor.</p>
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
                        textAlign: 'center',
                        marginTop: 15,
                        marginBottom: 15,
                        width: 300,
                    }}
                >
                    Clique duas vezes na área em branco dentro do container
                    do grafo para ver o resultado. Quanto mais vermelho um nó
                    aparecer após o resultado, maior a chance de ter sido infectado,
                    e quanto mais branco ele estiver menor será esta chance.
                </p>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <p>100%</p>
                    <span
                        style={{
                            height: 20,
                            width: 250,
                            background: 'linear-gradient(to right, red , white)',
                            marginLeft: 15,
                            marginRight: 15,
                            border: '1px solid black',
                        }}
                    ></span>
                    <p>0%</p>
                </div>
            </div>
            <GraphComponent />
        </div>
    );
}