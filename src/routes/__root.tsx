import { Fragment } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import TagAutoComplete from "../components/common/TagAutoComplete";
import NotFound from "./-NotFound";

const RootComponent = () => {
  const DummyData = ["스티치", "스티커", "스위치", "스키", "스위스", "스타크래프트", "스케치북"];

  const onSelectTagName = (tagName: string) => {
    console.log(tagName);
  };

  return (
    <Fragment>
      <Outlet />
      <TagAutoComplete tags={DummyData} onSelectTagName={onSelectTagName} />
    </Fragment>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
