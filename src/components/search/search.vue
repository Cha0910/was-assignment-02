<template>
  <div class="search-filter">
    <label>
      장르:
      <select v-model="filters.genre" @change="emitFilters">
        <option value="0">장르 (전체)</option>
        <option v-for="(value, key) in genreCode" :key="key" :value="value">{{ key }}</option>
      </select>
    </label>
    <label>
      평점:
      <select v-model="filters.age" @change="emitFilters">
        <option value="-1">평점 (전체)</option>
        <option v-for="(value, key) in ageCode" :key="key" :value="value">{{ key }}</option>
      </select>
    </label>
    <label>
      언어:
      <select v-model="filters.sorting" @change="emitFilters">
        <option value="all">언어 (전체)</option>
        <option v-for="(value, key) in sortingCode" :key="key" :value="value">{{ key }}</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      filters: {
        genre: "0",
        age: "-1",
        sorting: "all",
      },
    };
  },
  props: {
    genreCode: Object,
    sortingCode: Object,
    ageCode: Object,
  },
  methods: {
    emitFilters() {
      this.$emit("filter-changed", this.filters);
    },
  },
};
</script>

<style scoped>
.search-filter {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
