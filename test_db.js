var Movies = require("./models/moviedata");

// insert data into the database
new Movies({title: "the fate of the furious",director:"gary",reldate:2017}).save();
new Movies({title: "the godfather",director:"francis",reldate:1972}).save();
new Movies({title: "the dark knight",director:"christopher",reldate:2008}).save();
new Movies({title: "forrest gump",director:"robert",reldate:1994}).save();
new Movies({title: "the matrix",director:"lana",reldate:1999}).save();



/*
 //find all movies
    Movies.find({},function(err, movies){              
      if (err) {
        console.log(err);
    } else {        
       console.log(movies);
    }
    });

//find a movie
  Movies.findOne({title: "forrest gump"},function(err, movies){              
      if (err) {
        console.log(err);
    } else {        
       console.log(movies);
    }
    });

//find and delete a movie
Movies.findOneAndRemove({title: "the matrix"},function(err, movies){              
      if (err) {
        console.log(err);
    } else {              
   console.log(movies.title);
    }
});
 */