import React, { useEffect } from "react";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";

import { LogoutButton } from "./LogoutButton/LogoutButton";
import { Todo } from "./Todo/Todo";
import { Todos } from "./Todos/Todos";
import { Welcome } from "./Welcome/Welcome";

import "./Home.css";

export function Home() {
  const { path } = useRouteMatch();

  useEffect(() => {
    console.log("home mount");

    return () => {
      console.log("home unmount");
    };
  }, []);

  return (
    <div className="Home">
      <header>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">
                Welcome
              </NavLink>
            </li>
            <li>
              <NavLink to="/todos" activeClassName="active">
                Todos
              </NavLink>
            </li>
          </ul>
        </nav>
        <LogoutButton />
      </header>
      <section>
        <Switch>
          <Route exact path={path}>
            <Welcome></Welcome>
          </Route>
          <Route exact path="/todos">
            <Todos />
          </Route>
          <Route exact path="/todos/:id">
            <Todo />
          </Route>
        </Switch>
      </section>
    </div>
  );
}
