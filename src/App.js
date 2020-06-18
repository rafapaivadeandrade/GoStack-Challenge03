import React,{useEffect,useState} from "react";
import api from './services/api';
import "./styles.css";

function App() {
    const[repo,setRepo] = useState([]);
    const[newRepository,setNewRepository] = useState({
      title:"",
      url: "",
      techs: [],
    })

    useEffect(()=> {
      api.get('/repositories').then(response => {
        setRepo(response.data);
      })
    },[]);

    function addTitle(event){
      setNewRepository({...newRepository,title:event.target.value})
    }
    function addUrl(event){
      setNewRepository({...newRepository,url:event.target.value})
    }
    function addTechs(event){
      setNewRepository({...newRepository,techs:[event.target.value]})
    }

  async function handleAddRepository() {
    const response = await api.post('/repositories',newRepository)
    setRepo([...repo,response.data]);
  }

  async function handleRemoveRepository(id) {
    
    const response =  await api.delete(`/repositories/${id}`);
    const newRepo = repo.filter((repository) => repository.id != id)

    setRepo(newRepo);
  }

  return (
    <div id ="container">
      <form>
      <input
      type = "text"
      placeholder = "titulo"
      value= {newRepository.title}
      onChange={addTitle}
      />
      <input
      type = "text"
      placeholder = "url"
      value= {newRepository.url}
      onChange={addUrl}
      />
      <input
      type = "text"
      placeholder = "techs"
      value= {newRepository.techs}
      onChange={addTechs}
      />
      <button onClick={handleAddRepository}>Adicionar</button>
      </form>
      <ul data-testid="repository-list">
        
        {repo.map(repository =>  <li key={repository.id}> {repository.title}  <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button> </li> )}  
      </ul>

    </div>
  );
}

export default App;
