import { createRouter, createWebHistory } from 'vue-router'
import EquipmentView from '@/views/EquipmentView.vue'
import EquipmentTypesView from '@/views/EquipmentTypesView.vue'

const router = createRouter({
  history: createWebHistory(), 
  routes: [
    {
      path: '/equipment/equipment',
      component: EquipmentView,
    },
    {
      path: '/equipment/equipment-types',
      component: EquipmentTypesView,
    }
  ]
})

export default router