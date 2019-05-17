import React, { useContext, useState } from "react";

import RepositoryContext from "../../context/Repository";
import UserContext from "../../context/User";
import PageContext from "../../context/Page";

export default function Display() {
  // contextos
  const repos = useContext(RepositoryContext);
  const { user, setUser } = useContext(UserContext);
  const { page, pageDispatch } = useContext(PageContext);

  // diminuir página com validação de página mínima
  function handlePageDown() {
    if (page === 1) return false;

    pageDispatch({ type: "decrement" });
  }

  // aumentar página com validação de página máxima
  function handlePageUp() {
    if (!repos || repos.length < 30) return false;

    pageDispatch({ type: "increment" });
  }

  // estado de usuário temporária para setar o usuário principal apenas quando clicar no botão
  const [tempUser, setTempUser] = useState();

  //atualiza o user no componente principal e volta pra página 1
  function handleChangeUser() {
    setUser(tempUser);
    pageDispatch({ type: "initial" });
  }

  return (
    <>
      <h3>{user && repos ? `Current User: ${user}` : ""}</h3>
      <input type="text" onChange={text => setTempUser(text.target.value)} />
      &nbsp;
      <button onClick={() => handleChangeUser()}>Pesquisar</button>
      <p>Página Atual: {page}</p>
      <button onClick={() => handlePageDown()}>Diminuir Página</button>
      &nbsp;
      <button onClick={() => handlePageUp()}>Aumentar Página</button>
      <ul>{repos && repos.map(repo => <li key={repo.id}>{repo.name}</li>)}</ul>
    </>
  );
}
