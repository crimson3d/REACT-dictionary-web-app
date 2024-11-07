import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import SearchIcon from "@/assets/icon-search.svg?react";
import PlayIcon from "@/assets/icon-play.svg?react";

const UserInput = () => {
  const { register, handleSubmit } = useForm();
  const [results, setResults] = useState([]);
  const [word, setWord] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [audio, setAudio] = useState("");
  const [source, setSource] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${data.word}`
      );
      const wordsInfo = await response.json();
      if (wordsInfo && wordsInfo.length > 0) {
        setResults(wordsInfo);
        setWord(wordsInfo[0].word);
        setPhonetic(wordsInfo[0].phonetic);
        setAudio(wordsInfo[0].phonetics[0]?.audio || "");
        setSource(wordsInfo[0].sourceUrls);
      } else {
        setResults([{ word: data.word, definition: "No definition found." }]);
      }
    } catch (error) {
      setResults([
        { word: data.word, definition: "Error fetching the definition." },
      ]);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }
  };

  return (
    <div className="main__search">
      <form onSubmit={handleSubmit(onSubmit)} className="search__form">
        <div className="form__container">
          <input
            type="text"
            {...register("word", { required: true })}
            className="container__input"
          />
          <button type="submit" className="container__button">
            <SearchIcon className="button__icon" />
          </button>
        </div>
      </form>

      <div className="search__content">
        <div className="content__top">
          {word && <h2 className="top__title">{word}</h2>}
          {phonetic && <h3 className="top__subtitle">{phonetic}</h3>}
        </div>
        <div className="content__media">
          {audio && (
            <div className="media__player">
              <audio ref={audioRef} src={audio}></audio>
              {!isPlaying && (
                <button className="player__button" onClick={handlePlay}>
                  <PlayIcon height={80} width={80} />
                </button>
              )}
            </div>
          )}
        </div>
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
                  {" "}
                  {meaning.definitions.map((def, dIndex) => (
                    <li key={dIndex} className="list__item">
                      {def.definition}
                    </li>
                  ))}{" "}
                </ul>
                {meaning.synonyms?.length > 0 && (
                  <div className="container__synonyms">
                    <h5 className="synonyms__title">Synonyms</h5>
                    <div className="synonyms__content">
                        <p className="content__item">
                        {meaning.synonyms.join(" ")}
                        </p>
                    </div>
                  </div>
                )}
                {meaning.antonyms?.length > 0 && (
                  <div className="container__antonyms">
                    <h5 className="antonyms__title">Antonyms</h5>
                    <p className="antonyms__item">
                      {meaning.antonyms.join(" ")}
                    </p>
                  </div>
                )}
              </div>
            ))
        )}
      </div>

      {source && <p className="search__source">{source}</p>}
    </div>
  );
};

export default UserInput;
