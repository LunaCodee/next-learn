import styles from '@/styles/Home.module.css';
import { useState } from "react";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [library, setLibrary] = useState(['']);
  const [filterInputText, setFilterInputText] = useState("");

  const handleFilterInputChange = (event:any) => {
    const enteredText = event.target.value;
    setFilterInputText(enteredText);

    if (library.includes(enteredText)) {
      setLibrary((prevState) => prevState.filter((word) => word !== enteredText));
    }

    if (enteredText.length >= 3) {
      setLibrary((prevState) => {
        const filteredArray = prevState.filter((word) => {
          const commonLetters = [...enteredText].filter((letter) => word.includes(letter));
          return commonLetters.length < 3;
        });
        return filteredArray;
      });
    }
  };

  const handleAddWord = () => {
    if (inputText.trim() !== "") {
      setLibrary((prevState) => [...prevState, inputText.trim()]);
      setInputText("");
    }
  };

  const handleWordRemoval = (word:any) => {
    setLibrary((prevState) => prevState.filter((listWord) => listWord !== word));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <input
          onChange={(event) => setInputText(event.target.value)}
          value={inputText}
        />
        <button onClick={handleAddWord}>Add word</button>
        <div>
          {library.map((word) => (
            <div
              onClick={() => handleWordRemoval(word)}
              className={styles.item}
              key={word}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      <input
        value={filterInputText}
        placeholder="Filter"
        onChange={handleFilterInputChange}
      />
    </>
  );
};

export default Home;