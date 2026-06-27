import { Provider } from "@/components/ui/Provider";
import { router } from "@/routes";
import { RouterProvider } from "react-router-dom";

export const App = () => {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
};
