//Generic NavBar input

function NavBarInput({ type, value, set, placeholder }) {
  return (
    <input
      className="px-1 py-1 border-2 shadow-lg w-64 border-lightOutline dark:border-darkOutline
    text-primaryLightContainerOn dark:text-primaryDarkContainerOn
     placeholder-primaryLightContainerOn/40 dark:placeholder-primaryDarkContainerOn/40 
     bg-lightVariantSurface dark:bg-darkSurface"
      type={type}
      value={value}
      onChange={(e) => set(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export default NavBarInput;
