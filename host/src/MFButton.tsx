import React from "react";

const ButtonModule = React.lazy(async () => import("vite_provider/Button"))

export const MFButton = () => {
  return <ButtonModule />
}
