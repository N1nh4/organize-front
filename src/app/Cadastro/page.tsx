export default function Cadastro() {
  return (
    <div className="flex h-screen">

      <div className="flex bg-blue-400 justify-center items-center w-2/5">
        <h1>Seja Bem vindo</h1>
      </div>
      
      <div className="flex items-center w-3/5 justify-center">
        <div className="bg-gray-300 w-1/2 rounded-2xl p-10 flex items-center justify-center h-1/2 ">
          <form action="" className="flex flex-col h-full gap-3 w-full">
            <label htmlFor="">Nome:</label>
            <input 
              type="text" 
              className="rounded-lg border border-black p-2"
              
            />

            <label htmlFor="">Email:</label>
            <input 
              type="text" 
              className="rounded-lg border border-black p-2"
            />

            <label htmlFor="">Senha:</label>
            <input 
              type="password" 
              className="rounded-lg border border-black p-2"
            />

            <button
              type="submit"
              className="mt-auto bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-800 transition-colors cursor-pointer "
            >
              Cadastre-se
            
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
