<template>
  <div v-if="movie" class="banner" :style="{ backgroundImage: 'url(' + backdropUrl + ')' }">
    <div class="banner-content">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.overview }}</p>
      <button class="play-btn title-btn">재생</button>
      <button class="info-btn title-btn">상세 정보</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  computed: {
    backdropUrl() {
      return this.movie ? `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}` : '';
    }
  }
};
</script>

<style scoped>
.banner {
  height: 60vh;
  max-width: 97.5vw;
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: flex-end;
  margin-top: 50px;
}

.banner-content {
  padding: 50px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.banner h1 {
  font-size: 3rem;
  padding-top: 00px;
  margin-bottom: 0.5rem;
}

.banner p {
  font-size: 1rem;
  max-width: 500px;
  margin-bottom: 1rem;
  text-align: left;
}

.play-btn, .info-btn {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.play-btn {
  background-color: white;
  color: black;
}

.info-btn {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
}

@media (max-width: 768px) {
  .banner p {
    display: none;
  }
}
</style>
