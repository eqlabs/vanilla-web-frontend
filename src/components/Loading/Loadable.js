import OriginalLoadable from "react-loadable";
import { ComponentLoading } from "./ComponentLoading";

export function Loadable(loader, opts) {
  return OriginalLoadable(
    Object.assign(
      {
        loading: ComponentLoading,
        delay: 200,
        timeout: 10
      },
      { loader },
      opts
    )
  );
}
