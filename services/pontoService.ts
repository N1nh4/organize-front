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

export { registrarPonto };