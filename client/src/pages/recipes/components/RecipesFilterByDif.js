function RecipesFilterByDif({ dif, setDif }) {
  const difArray = ["all", "very easy", "easy", "medium", "hard", "very hard"];

  console.log(dif + "test");

  return (
    <div>
      <span>
        <select
          className="py-2 px-4 bg-primaryLight dark:bg-primaryDark 
      text-primaryLightOn dark:text-primaryDarkOn dark:border-darkOutline
       border-lightOutline rounded-lg text-xl font-medium"
          onChange={(e) => {
            setDif(e.target.value);
          }}
          value={dif}
        >
          {difArray.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}

export default RecipesFilterByDif;
