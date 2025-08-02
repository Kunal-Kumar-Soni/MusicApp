import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function useSearchText() {
  return useContext(SearchContext);
}

export default useSearchText;
