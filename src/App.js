import React, {useState, useEffect} from "react";
import api from "./services/api";
import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
      api.get("repositories").then((response) => {
        setRepositories(response.data);
        console.log(response);
      });
    }, []);



  async function handleAddRepository() {
    const response = await api.post("repositories", {
        title: `New repository ${Date.now()}`,
        url: "www.rep.com",
        techs: ["teste", "teste2"]
    
    });
      
    const rep = response.data;
    setRepositories([...repositories, rep]);
  }

  async function handleRemoveRepository(id) {
      console.log(id);
      console.log(`repositories/$id`);
      const response = await api.delete(`repositories/${id}`);
      console.log(response);
      if (response.status = 204) {
          const repIndex = repositories.findIndex(
            (rep) => rep.id == id
          );
          repositories.splice(repIndex, 1);
          setRepositories([...repositories]);
      }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((rep) => (
          <li key={rep.id}>
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
