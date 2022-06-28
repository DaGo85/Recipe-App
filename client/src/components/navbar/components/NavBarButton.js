function NavBarButton({ handler, text }) {
  return (
    <button
      className="px-4 py-1 border-2 bg-primaryLight dark:bg-primaryDark hover:bg-primaryLight/60
     dark:hover:bg-primaryDark/60 text-primaryLightOn dark:text-primaryDarkOn dark:border-darkOutline
      text-lg border-lightOutline rounded-lg"
      onClick={() => handler()}
    >
      {text}
    </button>
  );
}

export default NavBarButton;
