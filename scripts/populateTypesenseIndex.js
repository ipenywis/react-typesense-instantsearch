require("dotenv").config();

const Typesense = require("typesense");

const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w300";

module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: process.env.TYPESENSE_HOST,
        port: process.env.TYPESENSE_PORT,
        protocol: process.env.TYPESENSE_PROTOCOL,
      },
    ],
    apiKey: process.env.TYPESENSE_ADMIN_API_KEY,
  };

  console.log("Config: ", TYPESENSE_CONFIG);

  const typesense = new Typesense.Client(TYPESENSE_CONFIG);

  const schema = {
    name: "movies",
    num_documents: 0,
    fields: [
      {
        name: "title",
        type: "string",
        facet: false,
      },
      {
        name: "overview",
        type: "string",
        facet: false,
      },
      {
        name: "genres",
        type: "string[]",
        facet: true,
      },
      {
        name: "genres.lvl0",
        type: "string[]",
        facet: true,
      },
      {
        name: "genres.lvl1",
        type: "string[]",
        facet: true,
        optional: true,
      },
      {
        name: "genres.lvl2",
        type: "string[]",
        facet: true,
        optional: true,
      },
      {
        name: "release_date",
        type: "string",
        facet: true,
      },
      {
        name: "popularity",
        type: "float",
        facet: true,
      },
      {
        name: "vote_average",
        type: "float",
        facet: true,
      },
      {
        name: "image",
        type: "string",
        facet: true,
      },
    ],
    default_sorting_field: "popularity",
  };

  const movies = require("./data/popular-movies-with-genres.json");

  try {
    const collection = await typesense.collections("movies").retrieve();
    console.log("Found existing collection of movies");
    console.log(JSON.stringify(collection, null, 2));

    if (collection.num_documents !== movies.length) {
      console.log("Collection has different number of documents than data");
      console.log("Deleting collection");
      await typesense.collections("movies").delete();
    }
  } catch (err) {
    console.error(err);
  }

  console.log("Creating schema...");
  console.log(JSON.stringify(schema, null, 2));

  await typesense.collections().create(schema);

  console.log("Populating collection...");

  movies.forEach(async (movie) => {
    movie.image = BASE_IMAGE_PATH + movie.poster_path;

    delete movie.poster_path;
    delete movie.original_language;
    delete movie.original_title;
    delete movie.video;
    delete movie.backdrop_path;
    delete movie.vote_count;
    delete movie.id;
    delete movie.adult;
    delete movie.genre_ids;

    movie.genres.forEach((genre, idx) => {
      movie[`genres.lvl${idx}`] = [movie.genres.slice(0, idx + 1).join(">")];
    });

    //[Science Fiction], [Science Fiction > Action], [Science Fiction > Action > Adventure], [Science Fiction > Action > Adventure > Western]
  });

  try {
    const returnData = await typesense
      .collections("movies")
      .documents()
      .import(movies);

    console.log("Return data: ", returnData);
  } catch (err) {
    console.error(err);
  }
})();
