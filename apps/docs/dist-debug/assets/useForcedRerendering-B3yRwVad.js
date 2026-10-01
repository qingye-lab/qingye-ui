import { r as reactExports } from "./index-DM02Iz28.js";
function useForcedRerendering() {
  const [, setState] = reactExports.useState({});
  return reactExports.useCallback(() => {
    setState({});
  }, []);
}
export {
  useForcedRerendering as u
};
