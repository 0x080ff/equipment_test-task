<template>
  <v-card flat>
    <v-card-actions>
      <span class="text-h5">Equipment types</span>
      <v-spacer></v-spacer>
      <v-btn variant="contained-text" color="primary" @click="create()"> Add type </v-btn>
    </v-card-actions>
  </v-card>

  <v-table>
    <thead>
      <tr>
        <th class="text-left">Id</th>
        <th class="text-left">Name</th>
        <th class="text-left">Mask</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in types" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.attributes.name }}</td>
        <td>{{ item.attributes.mask }}</td>
        <td>
          <v-btn icon size="x-small" variant="contained-text" color="primary" @click="edit(item)"
            ><v-icon>mdi-pencil</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

  <EquipmentTypeDialog v-model="dialog" :item="item" @close="closeDialog" @send="sendData" @remove="removeItem" />
</template>

<script>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useEquipmentTypesStore } from '@/stores/equipmentTypesStore';

import EquipmentTypeDialog from '@/components/EquipmentTypeDialog.vue';

export default {
  setup() {
    const { types } = storeToRefs(useEquipmentTypesStore());
    const { getAllEquipmentTypes, addEquipmentType, editEquipmentType, removeEquipmentType } = useEquipmentTypesStore();

    getAllEquipmentTypes();

    let item = reactive({
      id: null,
      name: '',
      mask: '',
    });

    const dialog = ref(false);

    const create = () => {
      item.id = null;
      item.name = '';
      item.mask = '';
      dialog.value = true;
    };

    const edit = type => {
      item.id = type.id;
      item.name = type.attributes.name;
      item.mask = type.attributes.mask;
      dialog.value = true;
    };

    const closeDialog = () => (dialog.value = false);

    const sendData = async formData => {
      let response;

      if (!formData.id) {
        delete formData.id;
        response = await addEquipmentType(formData);
      } else {
        response = await editEquipmentType(formData);
      }

      if (response.status === 200) {
        dialog.value = false;
        getAllEquipmentTypes();
      }
    };

    const removeItem = async id => {
      const response = await removeEquipmentType(id);

      if (response.status === 200) {
        dialog.value = false;
        getAllEquipmentTypes();
      }
    };

    return {
      types,
      dialog,
      item,
      create,
      edit,
      closeDialog,
      sendData,
      removeItem,
    };
  },

  components: {
    EquipmentTypeDialog,
  },
};
</script>
