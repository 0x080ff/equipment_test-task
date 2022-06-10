import { defineStore } from 'pinia'
import {
  fetchEquipmentTypes,
  createEquipmentType,
  updateEquipmentType,
  deleteEquipmentType
} from '@/api/equipment-types'

export const useEquipmentTypesStore = defineStore('equipmentTypesStore', {
  state: () => {
    return {
      types: []
    }
  },

  actions: {
    async getAllEquipmentTypes() {
      try {
        const { data } = await fetchEquipmentTypes()
        this.types = data.data
      } catch (error) {
        console.error(error);
      }
    },

    async addEquipmentType(data) { 
      try {
        return await createEquipmentType(data)
      } catch (error) {
        console.error(error);
      }
    },

    async editEquipmentType(data) { 
      try {
        return await updateEquipmentType(data)
      } catch (error) {
        console.error(error);
      }
    },

    async removeEquipmentType(id) { 
      try {
        return await deleteEquipmentType(id)
      } catch (error) {
        console.error(error);
      }
    },
  },
})