# :clapper: Fave Movies

> This is my personel hobby project. You can browse most liked and highest rated movies and create your custom watchlist.

## :hammer_and_wrench: Tech Stack

* React
* Node.js
* Express
* MongoDB
* Mongoose
* Axios
* Formik
* Yup
* React Router

## :video_camera: Project Video

https://user-images.githubusercontent.com/73464481/221350276-ed6cf7ba-94f1-488c-9fdc-c55bb8d7bbdb.mp4

## :zap: Features

* I created database with highest rated movies and their details in MongoDB.
* Search movies by title or category.
* Display details of movies.
* Add & remove movie to your watchlist.
* Get random movies in discover section.
* Register & login user.

## :floppy_disk: Database

Movies Collection

```
{
  no: Number,
  poster_url: String,
  title: String,
  year: Number,
  runtime: String,
  genre: String,
  rate: Number,
  overview: String,
  director: String,
}
```

Users Collection

```
{
  username: String,
  password: String,
}
```

Watchlists Collection

```
{
  createdBy: Object,
  movies: Object,
}
```

