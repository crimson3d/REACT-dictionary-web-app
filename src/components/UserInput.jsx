import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import SearchIcon from "@/assets/icon-search.svg?react";
import PlayIcon from "@/assets/icon-play.svg?react";
import NewWindow from "@/assets/icon-new-window.svg?react";

const UserInput = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const audioRef = useRef(null);

  const onSubmit = async (data) => {
    setError(""); // Limpiar errores anteriores

    if (!data.word) {
      setError("Please enter a word.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${data.word}`
      );
      const wordsInfo = await response.json();
      if (wordsInfo && wordsInfo.length > 0) {
        setResults(wordsInfo);
        setError("");
      } else {
        setResults([]);
        setError("Sorry pal, we couldn't find definitions for the word you were looking for.");
      }
    } catch (error) {
      setResults([]);
      setError("Error fetching the definition.");
    }
  };

  const handlePlay = (audioUrl) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }
  };

  return (
    <div className="main__search">
      <form onSubmit={handleSubmit(onSubmit)} className="search__form">
        <div className="form__container">
          <input
            type="text"
            {...register("word", { required: "Please enter a word." })}
            className={`container__input ${error ? 'container__error' : ''}`}
            placeholder="Search for any word..."
          />
          <button type="submit" className="container__button">
            <SearchIcon className="button__icon" />
          </button>
        </div>
        {errors.word && <p className="search__error">{errors.word.message}</p>}
      </form>

      {error && <p className="search__error">{error}</p>}

      <div className="search__content">
        {results.length > 0 && (
          <>
            <div className="content__top">
              {results[0].word && <h2 className="top__title">{results[0].word}</h2>}
              {results[0].phonetic && <h3 className="top__subtitle">{results[0].phonetic}</h3>}
            </div>
            <div className="content__media">
              {results[0].phonetics[0]?.audio && (
                <div className="media__player">
                  <audio ref={audioRef}></audio>
                  <button className="player__button" onClick={() => handlePlay(results[0].phonetics[0].audio)}>
                    <PlayIcon height={80} width={80} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="search__meanings">
        {results.map(
          (entry, index) =>
            entry.meanings &&
            entry.meanings.map((meaning, mIndex) => (
              <div key={`${index}-${mIndex}`} className="meanings__container">
                <div className="container__type">
                  <h4 className="type__category">{meaning.partOfSpeech}</h4>
                  <hr className="type__line" />
                </div>
                <h5 className="container__title">Meaning</h5>
                <ul className="container__list">
                  {meaning.definitions.map((def, dIndex) => (
                    <li key={dIndex} className="list__item">
                      {def.definition}
                      {def.example && (
                        <span className="item__example">"{def.example}"</span>
                      )}
                    </li>
                  ))}
                </ul>
                {meaning.synonyms?.length > 0 && (
                  <div className="container__synonyms">
                    <h5 className="synonyms__title">Synonyms</h5>
                    <div className="synonyms__content">
                      <p className="content__item">{meaning.synonyms.join(" ")}</p>
                    </div>
                  </div>
                )}
                {meaning.antonyms?.length > 0 && (
                  <div className="container__antonyms">
                    <h5 className="antonyms__title">Antonyms</h5>
                    <p className="antonyms__item">{meaning.antonyms.join(" ")}</p>
                  </div>
                )}
              </div>
            ))
        )}
      </div>

      {results[0]?.sourceUrls && (
        <div className="search__source">
          <hr className="source__line" />
          <div className="source__files">
            <h6 className="files__title">Source</h6>
            <a href={results[0].sourceUrls[0]} className="files__url" target="_blank" rel="noopener noreferrer">
              {results[0].sourceUrls[0]}
            </a>
            <NewWindow className="files__icon" />
          </div>
          <p className='signature'>Coded with ❤️‍🔥 and listening to doom metal, by José Antonio Sánchez Fuentes.</p>
        </div>
      )}
    </div>
  );
};

export default UserInput;
