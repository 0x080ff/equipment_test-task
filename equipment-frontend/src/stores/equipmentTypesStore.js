import { defineStore } from 'pinia';
import { fetchEquipmentTypes, createEquipmentType, updateEquipmentType, deleteEquipmentType } from '@/api/equipment-types';

import { useMainStore } from '@/stores/mainStore';

export const useEquipmentTypesStore = defineStore('equipmentTypesStore', {
  state: () => {
    const { setSnackbar } = useMainStore();

    return {
      types: [],
      setSnackbar,
    };
  },

  actions: {
    async getAllEquipmentTypes() {
      try {
        const { data } = await fetchEquipmentTypes();
        this.types = data;
      } catch (error) {
        this.setSnackbar({ state: true, text: 'An error has occurred', color: 'red' });
        throw error;
      }
    },

    async addEquipmentType(data) {
      let response;

      try {
        response = await createEquipmentType(data);
      } catch (error) {
        this.setSnackbar({ state: true, text: 'An error has occurred', color: 'red' });
        throw error;
      }

      this.setSnackbar({ state: true, text: 'The equipment type has been successfully added', color: 'green' });
      return response;
    },

    async editEquipmentType(data) {
      let response;

      try {
        response = await updateEquipmentType(data);
      } catch (error) {
        this.setSnackbar({ state: true, text: 'An error has occurred', color: 'red' });
        throw error;
      }

      this.setSnackbar({ state: true, text: 'The equipment type has been successfully edited', color: 'green' });
      return response;
    },

    async removeEquipmentType(id) {
      let response;

      try {
        response = await deleteEquipmentType(id);
      } catch (error) {
        this.setSnackbar({ state: true, text: 'An error has occurred', color: 'red' });
        throw error;
      }

      this.setSnackbar({ state: true, text: 'The equipment type has been successfully removed', color: 'green' });
      return response;
    },
  },
});
