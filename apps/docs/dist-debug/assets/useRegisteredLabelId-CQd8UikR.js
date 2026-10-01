import { a1 as useBaseUiId, a3 as useIsoLayoutEffect } from "./index-DM02Iz28.js";
function useRegisteredLabelId(idProp, setLabelId) {
  const id = useBaseUiId(idProp);
  useIsoLayoutEffect(() => {
    setLabelId(id);
    return () => {
      setLabelId((currentId) => currentId === id ? void 0 : currentId);
    };
  }, [id, setLabelId]);
  return id;
}
export {
  useRegisteredLabelId as u
};
