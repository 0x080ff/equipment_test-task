import { defineStore } from 'pinia'
import {
  fetchAllEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  searchEquipment
} from '@/api/equipment'

export const useEquipmentStore = defineStore('equipmentStore', {
  state: () => {
    return {
      equipment: []
    }
  },

  actions: {
    async getAllEquipment() {
      try {
        const { data } = await fetchAllEquipment()
        this.equipment = data.data
      } catch (error) {
        console.error(error);
      }
    },

    async addEquipment(data) { 
      try {
        return await createEquipment(data)
      } catch (error) {
        console.error(error);
      }
    },

    async editEquipment(data) { 
      try {
        return await updateEquipment(data)
      } catch (error) {
        console.error(error);
      }
    },

    async removeEquipment(id) { 
      try {
        return await deleteEquipment(id)
      } catch (error) {
        console.error(error);
      }
    },

    async searchBySNAndNoteEquipment(query) {
      try {
        const { data } = await searchEquipment(query)
        this.equipment = data.data
      } catch (error) {
        console.error(error);
      }
    }
  }
})