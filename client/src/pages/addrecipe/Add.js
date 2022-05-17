import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import RecipeService from "../../services/recipeService";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../utility/AuthContext";

function Add() {
  const [files, setFiles] = useState([]);
  const { userCreds } = useAuthContext();
  const [difficulty, setDifficulty] = useState(5);
  const [difficultyText, setDifficultyText] = useState("medium");
  const [tags, setTags] = useState([]);
  const [existingTags, setExistingTags] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState([]);

  const navigate = useNavigate();

  const fileRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;

    const newRecipe = {
      username: userCreds.name,
      title: title.value,
      difficulty: difficulty,
      description: description.value,
      tags: "test",
      ingredients: ingredients.join(", "),
    };

    try {
      await RecipeService.create(newRecipe)
        .then((response) => {
          newRecipe.id = response.body.data.id;
          console.log(JSON.stringify(response.body.data.id));
        })
        .catch((err) => {});
    } catch {}

    files.forEach((file) => {
      try {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file.data);
        axios.post("http://localhost:5000/api/recipes/upload", data);
      } catch {}
    });

    navigate(`/recipe${newRecipe.title}`);
  };

  const handleImageInput = (e) => {
    const tempArr = [];
    [...e.target.files].forEach((file) => {
      tempArr.push({
        data: file,
        url: URL.createObjectURL(file),
      });
    });

    setFiles((prevState) => [...prevState, ...tempArr]);
  };

  const handleAddTag = () => {
    RecipeService.addTag(existingTags[existingTags.length - 1]);
  };

  const handleAddIngredient = () => {
    if (!ingredient) {
      return;
    }
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    setIngredient("");
  };

  const handleRemoveIngredient = (ingr) => {
    const newIngredients = ingredients.filter((rIngred) => rIngred !== ingr);
    setIngredients(newIngredients);
  };

  useEffect(() => {
    RecipeService.getTags()
      .then((response) => setExistingTags(response))
      .catch((err) => {});
  }, [existingTags]);

  useEffect(() => {
    const handleDifficulty = () => {
      if (difficulty > 8) return setDifficultyText("very hard");
      if (difficulty > 6) return setDifficultyText("hard");
      if (difficulty > 4) return setDifficultyText("medium");
      if (difficulty > 2) return setDifficultyText("easy");
      if (difficulty > 0) return setDifficultyText("very easy");
    };
    handleDifficulty();
  }, [difficulty]);

  return (
    <main className="background-setup">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className=""
          id="title"
          required
          placeholder="Title"
        />
        <button
          onClick={() => {
            fileRef.current.click();
          }}
        >
          add image
        </button>
        {files.map((fileSrc) => (
          <img
            key={fileSrc.url}
            src={fileSrc.url}
            alt="not found"
            width={"250px"}
          />
        ))}
        <input
          accept="image/jpg,image/png,image/jpeg"
          className="hidden"
          type="file"
          onChange={handleImageInput}
          multiple
          ref={fileRef}
        />
        <p>
          {tags.map((tag) => {
            return <div>tag</div>;
          })}
        </p>
        <div>
          ingredients:
          <ul>
            {ingredients.map((ingredient) => {
              return (
                <li key={ingredient}>
                  {ingredient}
                  <button onClick={() => handleRemoveIngredient(ingredient)}>
                    remove
                  </button>
                </li>
              );
            })}
            <li>
              <input
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
              />
            </li>
          </ul>
          <button onClick={() => handleAddIngredient()}>
            add this ingredient+++
          </button>
        </div>
        <div>
          <ul>
            {existingTags.map((tag) => {
              return <li>tag</li>;
            })}
            <li>
              <button onClick={handleAddTag}>Add a new tag</button>
            </li>
          </ul>
        </div>
        <div>
          <h4>
            Difficulty: {difficulty}/10 {difficultyText}
          </h4>
          <input
            id="difficulty"
            type="range"
            min="1"
            max="10"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="slider-button"
            required
            placeholder="Difficulty"
          />
        </div>
        <textarea id="description" placeholder="Description" required />
        <button className="button-setup" type="submit">
          submit
        </button>
      </form>
    </main>
  );
}

export default Add;
