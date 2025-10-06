"use client";
import { useState } from "react";
import { criarUsuario } from "../../services/usuarioService";


export default function Home() {
  const [ nome, setNome ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const usuarioCriado = await criarUsuario({ nome, email, senha });
      console.log(usuarioCriado);
      alert('Usuário criado com sucesso!');
    } catch (err) {
      alert('Erro ao criar usuário');
    }
  }


  return (
    <div className="flex h-screen">

      <div className="flex bg-blue-400 justify-center items-center w-2/5">
        <h1>Seja Bem vindo</h1>
      </div>
      
      <div className="flex items-center w-3/5 justify-center">
        <div className="bg-gray-300 w-1/2 rounded-2xl p-10 flex items-center justify-center h-2/5 ">
          <form action="" className="flex flex-col h-full gap-3 w-full" onSubmit={handleSubmit}>
          

            <label htmlFor="">Email:</label>
            <input 
              type="text" 
              className="rounded-lg border border-black p-2"
              onChange={e => setEmail(e.target.value)}
            />

            <label htmlFor="">Senha:</label>
            <input 
              type="password" 
              className="rounded-lg border border-black p-2"
              onChange={e => setSenha(e.target.value)}
            />
            
            <div>
              <input type="checkbox" name="" id="" /> Lembrar-me
            </div>

            <button
              type="submit"
              className="mt-auto bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-800 transition-colors cursor-pointer "
              
            >
              Login
            
            </button>

            <span>
              Não possui conta? <a href="/Cadastro" className="text-blue-600 hover:underline">Cadastre-se aqui</a>
            </span>

          </form>
        </div>
      </div>

    </div>
  );
}
