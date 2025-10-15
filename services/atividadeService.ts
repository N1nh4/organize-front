async function criarAtividade() {
    const response = await fetch('http://localhost:8081/criarAtividade',
        {
            
            method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify({})
        }


    ) 
    return response.json();
}

export { criarAtividade }