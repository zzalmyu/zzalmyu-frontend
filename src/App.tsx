import { Fragment } from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import ModalProvider from "@/components/ModalProvider";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

const App = () => {
  return (
    <Fragment>
      <RouterProvider router={router} />
      <ModalProvider />
    </Fragment>
  );
};

export default App;
