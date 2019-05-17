import React, { useContext } from "react";

import RepositoryContext from "../../context/Repository";
import UserContext from "../../context/User";

export default function Counter() {
  // contextos
  const repos = useContext(RepositoryContext);
  const user = useContext(UserContext);

  return (
    <>
      <h4>
        {user && repos ? `User ${user} has ${repos.length} repositories!` : ""}
      </h4>
    </>
  );
}
