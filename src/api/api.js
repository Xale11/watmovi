export const searchMovie = async (movie, region) => {
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=749143172af59e585141e6c1c0adc7a0&query=${movie}&region=${region}`)
    let movies = await res.json()
    return movies.results
}

export const similarMovies = async (id) =>{
    let res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=749143172af59e585141e6c1c0adc7a0`)
    let movies = await res.json()
    return movies.results
}

export const getImages = async (id, region) =>{
    let res = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=749143172af59e585141e6c1c0adc7a0}`)
    let movies = await res.json()
    return movies.results
}

export const topMovies = async () => {
    let res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=749143172af59e585141e6c1c0adc7a0&`)
    let movies = await res.json()
    return movies.results
}

export const genreMovies = async (genre, region) => {
    const genres = {
        'Action': 28,
        'Adventure': 12,
        'Animation': 16,
        'Comedy': 35,
        'Crime': 80,
        'Documentary': 99,
        'Drama': 18,
        'Family': 10751,
        'Fantasy': 14,
        'History': 36,
        'Horror': 27,
        'Music': 10402,
        'Mystery': 9648,
        'Romance': 10749,
        'Science Fiction': 878,
        'Thriller': 53,
        'War': 10752,
        'Western': 37
      };
      let movies;
      let movies1
      let res
      let res1
      let data
      if (genre !== "Popular" || genre !=="Latest" || genre !=="Top Rated"){
            let genreId = genres[`${genre}`]
            res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=749143172af59e585141e6c1c0adc7a0&with_genres=${genreId}`)
            res1 = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=749143172af59e585141e6c1c0adc7a0&with_genres=${genreId}&page=2`)
            movies = await res.json()  
            movies1 =await res1.json()
            data = [...movies.results, ...movies1.results]
            data = data
      }
      else if(genre =="Popular"){
            res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=749143172af59e585141e6c1c0adc7a0`)
            movies = await res.json()
            data = movies.results
      }
    //   else if(genre =="Top Rated"){
    //         res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=749143172af59e585141e6c1c0adc7a0`)
    //         movies = await res.json()
    //  } 
    //  else{
    //         res = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=749143172af59e585141e6c1c0adc7a0`)
    //         movies = await res.json()
    //  } 
     
    return data
}

export const movieProviders = async (id) => {
    let providers = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=749143172af59e585141e6c1c0adc7a0`)
    providers = await providers.json()
    let  data = await providers.results.GB
    let dataArray = []
    if (data.rent){
        dataArray = [...data.rent]
    }
    if(data.flatrate){
        dataArray = [...dataArray, ...data.flatrate]
    }
    if(data.buy){
        dataArray = [...dataArray, ...data.buy]
    }
    data = [...dataArray]
    return data
}

export const specificMovie = async (id) => {
    let data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=749143172af59e585141e6c1c0adc7a0`)
    data = await data.json()
    const {backdrop_path, overview, original_title, vote_average} = data
    return {backdrop_path, overview, original_title, vote_average}
}

export const queryMovies = async (name) => {
    let data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=749143172af59e585141e6c1c0adc7a0&query=${name}&region=GB`)
    data = await data.json()
    return data.results
}

export const idMovie = async (id) => {
    let data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=749143172af59e585141e6c1c0adc7a0`)
    data = await data.json()
    return data
}

export const randomMovie = async (id) => {
    const genres = [
        28,   // Action
        12,   // Adventure
        16,   // Animation
        35,   // Comedy
        80,   // Crime
        99,   // Documentary
        18,   // Drama
        10751, // Family
        14,   // Fantasy
        36,   // History
        27,   // Horror
        10402, // Music
        9648, // Mystery
        10749, // Romance
        878,  // Science Fiction
        10770, // TV Movie
        53,   // Thriller
        10752, // War
        37    // Western
        ];
        let movies;
        let movies1
        let res
        let res1
        let data
        if (id == 0){
            res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=749143172af59e585141e6c1c0adc7a0`)
            res1 = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=749143172af59e585141e6c1c0adc7a0&page=2`)
            movies = await res.json()  
            movies1 =await res1.json()
        }
        else{
            res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=749143172af59e585141e6c1c0adc7a0&with_genres=${genres[id]}`)
            res1 = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=749143172af59e585141e6c1c0adc7a0&with_genres=${genres[id]}&page=2`)
            movies = await res.json()  
            movies1 =await res1.json()
        }
        data = [...movies.results, ...movies1.results]
        let index = Math.round(Math.random() * data.length)
        return data[index]
}