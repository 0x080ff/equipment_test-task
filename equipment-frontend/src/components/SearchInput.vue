<template>
  <v-card flat class="mt-8">
    <v-card-text>
      <v-text-field
        v-model="searchInput"
        hint="Search by SN or note"
        label="Search"
        @update:modelValue="search"
        :loading="loading"
        clearable
        variant="underlined"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from 'vue';
import { useEquipmentStore } from '@/stores/equipmentStore';

export default {
  setup() {
    const { searchBySNAndNoteEquipment } = useEquipmentStore();

    const searchInput = ref('');
    const loading = ref(false);

    const search = query => {
      loading.value = true;
      setTimeout(() => {
        searchBySNAndNoteEquipment(query);
        loading.value = false;
      }, 1000);
    };

    return {
      searchInput,
      loading,
      search,
    };
  },
};
</script>
