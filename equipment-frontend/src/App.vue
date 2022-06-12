<template>
  <v-app>
    <v-layout>
      <v-snackbar
        v-model="snackbar.state"
        location="top"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        content-class="text-white"
        class="mt-14"
      >
        {{ snackbar.text }}
      </v-snackbar>

      <v-navigation-drawer theme="dark" rail permanent>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-format-list-bulleted-triangle" value="dashboard" to="/equipment/equipment"></v-list-item>
          <v-list-item prepend-icon="mdi-cog-outline" value="messages"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer permanent>
        <v-list>
          <v-list-item title="Equipment" to="/equipment/equipment"></v-list-item>
          <v-list-item title="Equipment types" to="/equipment/equipment-types"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 300px">
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/mainStore';

export default {
  setup() {
    const drawer = ref(true);
    const rail = ref(true);
    const { snackbar } = storeToRefs(useMainStore());

    return {
      drawer,
      rail,
      snackbar,
    };
  },
};
</script>
