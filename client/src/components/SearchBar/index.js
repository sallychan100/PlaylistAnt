import React, { useState } from "react";
import { QUERY_SEARCHPLAYLISTS } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import "./SearchBar.css";

export default function SearchBar() {
  const [inputState, setInputState] = useState();
  const [getPlaylist, { loading, error, data }] = useLazyQuery(
    QUERY_SEARCHPLAYLISTS
  );

  const [songs, setSongs] = useState([]);

  function handleSearchClick(event) {
    event.preventDefault();

    getPlaylist({ variables: { searchTerm: inputState } });
    // We do fetching here
  }

  console.log(data);

  const handleChange = (event) => {
    const { value } = event.target;
    setInputState(value);
  };

  function handleSongChange(song) {
    const inArray = songs.findIndex((track) => track === song.id);
    console.log();
    if (inArray > -1) {
      songs.splice(inArray, 1);
      console.log(song.id + " was removed from playlist");
      console.log(songs);
    } else {
      // setSongs([...songs, song]);
      songs.push(song.id);
      console.log(song.name + " was added to playlist");
      console.log(songs);
    }
  }

  function savePlaylist() {
    // use graphql mutation to create playlist
    //songs;
  }

  return (
    <div>
      <form className="container">
        <label htmlFor="search" className="form-label mb-4">
          Enter a genre, artist or activity:
        </label>
        <input
          placeholder="What do you want to listen to?"
          onChange={handleChange}
          className="form-input mb-4"
        />
      </form>

      {data?.search ? (
        data.search.map((el, index) => {
          return (
            <div key={index}>
              <h2>{el.name}</h2>
              <h3>{el.popularity}</h3>
              <img src={el.image} style={{ height: "180px" }} />
              {el.preview_url && <iframe src={el.preview_url}></iframe>}
              <input type="checkbox" onChange={() => handleSongChange(el)} />
              <button onClick={() => savePlaylist()}>Save Playlist</button>
            </div>
          );
        })
      ) : (
        <></>
      )}
      <button
        onClick={handleSearchClick}
        className="btn btn-outline-light d-block mb-4 w-100"
      >
        {" "}
        Search{" "}
      </button>
    </div>
  );
}
