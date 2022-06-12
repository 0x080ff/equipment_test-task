import { defineStore } from 'pinia';
import { fetchAllEquipment, createEquipment, updateEquipment, deleteEquipment, searchEquipment } from '@/api/equipment';

import { useMainStore } from '@/stores/mainStore';

export const useEquipmentStore = defineStore('equipmentStore', {
  state: () => {
    const { setSnackbar } = useMainStore();

    return {
      equipment: [],
      setSnackbar,
    };
  },

  actions: {
    async getAllEquipment() {
      try {
        const { data } = await fetchAllEquipment();
        this.equipment = data;
      } catch (error) {
        this.setSnackbar({ state: true, text: 'An error has occurred', color: 'red' });
        throw error;
      }
    },

    async addEquipment(data) {
      let response;

      try {
        response = await createEquipment(data);
      } catch (error) {
        this.setSnackbar({ state: true, text: 'An error has occurred', color: 'red' });
        throw error;
      }

      this.setSnackbar({ state: true, text: 'The equipment has been successfully added', color: 'green' });
      return response;
    },

    async editEquipment(data) {
      let response;

      try {
        response = await updateEquipment(data);
      } catch (error) {
        this.setSnackbar({ state: true, text: 'An error has occurred', color: 'red' });
        throw error;
      }

      this.setSnackbar({ state: true, text: 'The equipment has been successfully edited', color: 'green' });
      return response;
    },

    async removeEquipment(id) {
      let response;

      try {
        response = await deleteEquipment(id);
      } catch (error) {
        this.setSnackbar({ state: true, text: 'An error has occurred', color: 'red' });
        throw error;
      }

      this.setSnackbar({ state: true, text: 'The equipment has been successfully removed', color: 'green' });
      return response;
    },

    async searchBySNAndNoteEquipment(query) {
      try {
        const { data } = await searchEquipment(query);
        this.equipment = data;
      } catch (error) {
        this.setSnackbar({ state: true, text: 'An error has occurred', color: 'red' });
        throw error;
      }
    },
  },
});
