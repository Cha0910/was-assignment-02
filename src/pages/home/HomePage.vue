<template>
  <div class="home">
    <BannerComponent :movie="featuredMovie" />
    <MovieRowComponent title="인기 영화" :fetchUrl="popularMoviesUrl" />
    <MovieRowComponent title="최신 영화" :fetchUrl="newReleasesUrl" />
    <MovieRowComponent title="액션 영화" :fetchUrl="actionMoviesUrl" />
  </div>
</template>

<script>
import BannerComponent from '../../components/home/BannerComponent.vue';
import MovieRowComponent from '../../components/home/MovieRowComponent.vue';
import { fetchFeaturedMovie, getURL4PopularMovies, getURL4ReleaseMovies, getURL4GenreMovies } from '@/utils/URL.js';

export default {
  components: {
    BannerComponent,
    MovieRowComponent
  },
  data() {
    return {
      apiKey: localStorage.getItem('TMDb-Key') || '',
      featuredMovie: null,
      popularMoviesUrl: '',
      newReleasesUrl: '',
      actionMoviesUrl: ''
    };
  },
  async created() {
    // Fetching the URLs for movies
    this.popularMoviesUrl = getURL4PopularMovies(this.apiKey);
    this.newReleasesUrl = getURL4ReleaseMovies(this.apiKey);
    this.actionMoviesUrl = getURL4GenreMovies(this.apiKey, '28'); // '28' is the genre ID for action movies

    // Fetching the featured movie
    this.featuredMovie = await fetchFeaturedMovie(this.apiKey);
  }
};
</script>

<style scoped>
.home {
  background-color: #141414;
  color: white;
  padding: 20px;
}
</style>
