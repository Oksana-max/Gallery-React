import React from "react";
import "./index.scss";
import { Pagination } from "./Pagination.jsx";

function Collection({ name, images }) {
  return (
    <div className="collection">
      <img className="collection__big" src={images[0]} alt="Item" />
      <div className="collection__bottom">
        <img className="collection__mini" src={images[1]} alt="Item" />
        <img className="collection__mini" src={images[2]} alt="Item" />
        <img className="collection__mini" src={images[3]} alt="Item" />
      </div>
      <h4>{name}</h4>
    </div>
  );
}

function App() {
  const cats = [
    { name: "Все" },
    { name: "Море" },
    { name: "Горы" },
    { name: "Архитектура" },
    { name: "Города" },
  ];
  const [categoryId, setCategoryId] = React.useState(0);
  const [collections, setCollection] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collectionsPerPage] = React.useState(4);

  const lastCollectionsIndex = currentPage * collectionsPerPage;
  const firstCollectionsIndex = lastCollectionsIndex - collectionsPerPage;
  const currentCollectionsIndex = collections.slice(
    firstCollectionsIndex,
    lastCollectionsIndex,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredCollections =
    categoryId === 0
      ? currentCollectionsIndex
      : collections
          .filter((obj) => obj.category === categoryId)
          .splice(0, currentCollectionsIndex.length);

  React.useEffect(() => {
    setIsLoading(true);
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        setCollection(data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении данных");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((mas, i) => (
            <li
              key={i}
              className={categoryId === i ? "active" : ""}
              onClick={() => setCategoryId(i)}>
              {mas.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          filteredCollections
            .filter((obj) => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase());
            })
            .map((obj, i) => (
              <Collection key={i} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalCollections={collections.length}
        collectionsPerPage={collectionsPerPage}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
