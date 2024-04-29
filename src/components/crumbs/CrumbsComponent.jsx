import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
const CrumbsComponent = () => {
  const location = useLocation();

  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink = +`/${crumb}`;

      return (
        <Button key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </Button>
      );
    });

  return <Flex>
    {crumbs}
  </Flex>;
};

export default CrumbsComponent;
