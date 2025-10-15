async function registrarPonto({ id_usuario, meta }: { id_usuario: string, meta: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pontos/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario, meta }),
    });

    if (!response.ok) {
    throw new Error('Erro ao registrar ponto');
  }

  return response.json(); 
}

async function buscarPontoDiario(usuarioId: string, data: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pontos/visualizarPontoDiario?usuarioID=${usuarioId}&data=${data}`, {

    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }); 

  if (!response.ok) {
    throw new Error('Erro ao buscar ponto');
  }

  return response.json();
}

export { registrarPonto, buscarPontoDiario };