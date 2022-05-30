import { useEffect, useMemo, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import { useRecipesContext } from "../../utility/RecipesContext";
import RecipesFilter from "./components/RecipesFilter";
import RecipeTable from "./components/RecipeTable";

const PageSize = 9;

function Recipes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    difficulty: "all",
    tags: [],
    input: "",
  });
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { recipesData } = useRecipesContext();

  const currentGridData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredRecipes.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredRecipes]);

  useEffect(() => {
    let saveFilter = recipesData;
    if (filter.difficulty !== "all") {
      let difRange = [];

      switch (filter.difficulty) {
        case "very hard":
          difRange = ["9", "10"];
          break;
        case "hard":
          difRange = ["7", "8"];
          break;
        case "medium":
          difRange = ["5", "6"];
          break;
        case "easy":
          difRange = ["3", "4"];
          break;
        case "very easy":
          difRange = ["1", "2"];
          break;
        default:
          difRange = ["8"];
      }
      console.log("length" + saveFilter.tags);
      saveFilter = saveFilter.filter((sFilter) => {
        return (
          (sFilter.difficulty === difRange[0]) |
          (sFilter.difficulty === difRange[1])
        );
      });
    }

    if (filter.tags.length > 0) {
      saveFilter = saveFilter.filter((sFilter) => {
        return sFilter.tags.every((element) => {
          return filter.tags.includes(element);
        });
      });
    }

    setFilteredRecipes(saveFilter);
  }, [filter, recipesData]);

  console.log("filteredRecipes:" + JSON.stringify(filteredRecipes));

  return (
    <main className="background-setup">
      <section className="">Filter Section</section>
      <RecipesFilter filter={filter} setFilter={setFilter} />
      <Pagination
        currentPage={currentPage}
        totalCount={filteredRecipes.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <RecipeTable currentGridData={currentGridData} />
      <Pagination
        currentPage={currentPage}
        totalCount={filteredRecipes.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
}

export default Recipes;
