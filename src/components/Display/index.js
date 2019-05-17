import React, { useContext } from "react";

import RepositoryContext from "../../context/Repository";
import UserContext from "../../context/User";
import PageContext from "../../context/Page";

export default function Display() {
  // contextos
  const repos = useContext(RepositoryContext);
  const user = useContext(UserContext);
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

  return (
    <>
      <h3>{user && repos ? `Current User: ${user}` : ""}</h3>
      <button onClick={() => handlePageUp()}>Aumentar Página</button>
      &nbsp;
      <button onClick={() => handlePageDown()}>Diminuir Página</button>
      <ul>{repos && repos.map(repo => <li key={repo.id}>{repo.name}</li>)}</ul>
    </>
  );
}
