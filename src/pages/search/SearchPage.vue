<template>
  <div class="search-page">
    <Search
        :genreCode="genreCode"
        :sortingCode="sortingCode"
        :ageCode="ageCode"
        @filter-changed="updateFilters"
    />
    <InfiniteScrollView :fetch-url="fetchUrl" />
  </div>
</template>

<script>
import Search from "@/components/search/Search.vue";
import InfiniteScrollView from "@/components/views/InfiniteScrollView.vue";

export default {
  name: "SearchPage",
  components: { Search, InfiniteScrollView },
  data() {
    return {
      apiKey: localStorage.getItem("TMDb-Key") || "",
      filters: {
        genre: "0",
        age: "-1",
        sorting: "all",
      },
      genreCode: {
        Action: "28",
        Adventure: "12",
        Comedy: "35",
        Crime: "80",
        Family: "10751",
      },
      sortingCode: {
        영어: "en",
        한국어: "ko",
      },
      ageCode: {
        "9~10": "9",
        "8~9": "8",
        "7~8": "7",
        "6~7": "6",
        "5~6": "5",
        "4~5": "4",
        "4점 이하": -"2",
      },
    };
  },
  computed: {
    fetchUrl() {
      const baseUrl = "https://api.themoviedb.org/3/discover/movie";
      const genreParam = this.filters.genre !== "0" ? `&with_genres=${this.filters.genre}` : "";
      const ageParam =
          this.filters.age !== "-1"
              ? `&vote_average.gte=${this.filters.age}&vote_average.lte=${Number(this.filters.age) + 1}`
              : "";
      const sortingParam =
          this.filters.sorting !== "all" ? `&original_language=${this.filters.sorting}` : "";
      return `${baseUrl}?api_key=${this.apiKey}${genreParam}${ageParam}${sortingParam}`;
    },
  },
  methods: {
    updateFilters(newFilters) {
      this.filters = newFilters;
      this.saveSearchRecord(this.filters)
    },
    saveSearchRecord(filters) {
      const userId = localStorage.getItem("User-Id");
      const searchHistory = JSON.parse(localStorage.getItem(userId + "searchHistory")) || [];
      searchHistory.push({
        genre: filters.genre,
        age: filters.age,
        sorting: filters.sorting,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(userId + "searchHistory", JSON.stringify(searchHistory));
    },
  },
};
</script>

<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  gap: 20px;
}
</style>
