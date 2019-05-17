import React, { useState, useEffect, useReducer } from "react";

import api from "./services/api";

import RepositoryContext from "./context/Repository";
import UserContext from "./context/User";
import PageContext from "./context/Page";

import Display from "./components/Display";
import Counter from "./components/Counter";

function App() {
  //reducer que altera a página
  function pageReducer(state, action) {
    switch (action.type) {
      case "increment":
        return state + 1;

      case "decrement":
        return state - 1;

      default:
        return state;
    }
  }

  const [page, pageDispatch] = useReducer(pageReducer, 1);

  //estado de repos
  const [repos, setRepos] = useState();

  //efeito em quando alterar a página com o reducer, para fazer o request novamente e atualizar os repos
  useEffect(() => {
    async function getRepos() {
      const response = await api.get(
        `/users/Maikeaerosmith/repos?page=${page}`
      );

      setRepos(response.data);
    }

    getRepos();
  }, [page]);

  return (
    // provider do reducer, para todos components poderem acessar o estado page e chamarem o pageDispatch para trocar de página
    <PageContext.Provider value={{ page, pageDispatch }}>
      {/* provider do usuário do repositório, para todos componentes acessarem o usuário atual */}
      <UserContext.Provider value={repos && repos[0].owner.login}>
        {/*  provider dos repositórios, para todos componentes acessarem os repositórios */}
        <RepositoryContext.Provider value={repos}>
          <Display />
          <Counter />
        </RepositoryContext.Provider>
      </UserContext.Provider>
    </PageContext.Provider>
  );
}

export default App;
