import { Card, CardContent } from "@material-ui/core/";

import React from "react";

export default function index(props) {
  return (
    <div>
      <Card>
        <CardContent>{props.children}</CardContent>
      </Card>
    </div>
  );
}
