<template>
  <v-card elevation="2">
    <v-card-title>
      Это тестовая страница!
    </v-card-title>
    <v-card-subtitle>
      Она содержит пример работы.
    </v-card-subtitle>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.code"
        >
          {{ item.name }}
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import api from '@/api/companies/region'

export default {
  name: "TestPage",
  page: {
    title: "Тестовая страница"
  },
  data() {
    return {
      items: []
    }
  },
  mounted() {
    api.list().then(response => {this.items = response.data;});
  }
}
</script>

<style scoped>
.v-card {
  padding: 0 1%;
}
.v-list-item {
  padding: 0;
  min-height: 20px;
}
</style>