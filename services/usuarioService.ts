async function criarUsuario(usuario: { nome: string, email: string, senha: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar usuário');
  }

  return response.json(); // usuário criado retornado pelo back
}


export { criarUsuario };