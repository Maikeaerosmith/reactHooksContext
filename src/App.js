import React, { useState, useEffect, useReducer } from "react";

import api from "./services/api";

import RepositoryContext from "./context/Repository";
import UserContext from "./context/User";
import PageContext from "./context/Page";

import Display from "./components/Display";

function App() {
  //reducer que altera a página
  function pageReducer(state, action) {
    switch (action.type) {
      case "increment":
        return state + 1;

      case "decrement":
        return state - 1;

      case "initial":
        return 1;

      default:
        return state;
    }
  }

  //reducer de página
  const [page, pageDispatch] = useReducer(pageReducer, 1);

  //estado de usuário
  const [user, setUser] = useState();

  //estado de repos
  const [repos, setRepos] = useState();

  //efeito para quando alterar a página com o reducer, ou o usuário com o setUser, fazer o request novamente e atualizar os repos
  useEffect(() => {
    async function getRepos() {
      if (!user) return false;
      const response = await api.get(`/users/${user}/repos?page=${page}`);

      setRepos(response.data);
    }

    getRepos();
  }, [page, user]);

  return (
    // provider do reducer, para todos components poderem acessar o estado page e chamarem o pageDispatch para trocar de página
    <PageContext.Provider value={{ page, pageDispatch }}>
      {/* provider do usuário do repositório, para todos componentes acessarem o usuário atual */}
      <UserContext.Provider value={{ user, setUser }}>
        {/*  provider dos repositórios, para todos componentes acessarem os repositórios */}
        <RepositoryContext.Provider value={repos}>
          <Display />
        </RepositoryContext.Provider>
      </UserContext.Provider>
    </PageContext.Provider>
  );
}

export default App;
