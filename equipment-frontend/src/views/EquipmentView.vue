<template>
  <v-card flat>
    <v-card-actions>
      <span class="text-h5">Equipment</span>
      <v-spacer></v-spacer>
      <v-btn variant="contained-text" color="primary" @click="create()"> Add Equipment </v-btn>
    </v-card-actions>
  </v-card>

  <SearchInput />

  <v-table v-if="equipment.length">
    <thead>
      <tr>
        <th class="text-left">Id</th>
        <th class="text-left">Type</th>
        <th class="text-left">SN</th>
        <th class="text-left">Note</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in equipment" :key="item.attributes.id">
        <td>{{ item.id }}</td>
        <td>{{ item.attributes.equipment_type.data.attributes.name }}</td>
        <td>{{ item.attributes.sn }}</td>
        <td>{{ item.attributes.note }}</td>
        <td>
          <v-btn icon size="x-small" variant="contained-text" color="primary" @click="edit(item)"
            ><v-icon>mdi-pencil</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

  <EquipmentDialog
    v-model="dialog"
    :item="item"
    :types="equipmentTypes"
    @close="closeDialog"
    @send="sendData"
    @remove="removeItem"
  />
</template>

<script>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useEquipmentStore } from '@/stores/equipmentStore';
import { useEquipmentTypesStore } from '@/stores/equipmentTypesStore';

import EquipmentDialog from '@/components/EquipmentDialog.vue';
import SearchInput from '@/components/SearchInput.vue';

export default {
  setup() {
    const { equipment } = storeToRefs(useEquipmentStore());
    const { getAllEquipment, addEquipment, editEquipment, removeEquipment } = useEquipmentStore();
    getAllEquipment();

    const { types: equipmentTypes } = storeToRefs(useEquipmentTypesStore());
    const { getAllEquipmentTypes } = useEquipmentTypesStore();

    getAllEquipmentTypes();

    let item = reactive({
      id: null,
      type: null,
      sn: '',
      note: '',
    });

    const dialog = ref(false);

    const create = () => {
      item.id = null;
      item.type = null;
      item.sn = '';
      item.note = '';
      dialog.value = true;
    };

    const edit = type => {
      item.id = type.id;
      item.type = type.attributes.equipment_type.data;
      item.sn = type.attributes.sn;
      item.note = type.attributes.note;
      dialog.value = true;
    };

    const closeDialog = () => (dialog.value = false);

    const sendData = async formData => {
      let response;

      if (!formData.id) {
        delete formData.id;
        response = await addEquipment(formData);
      } else {
        response = await editEquipment(formData);
      }

      if (response.status === 200) {
        dialog.value = false;
        getAllEquipment();
      }
    };

    const removeItem = async id => {
      const response = await removeEquipment(id);

      if (response.status === 200) {
        dialog.value = false;
        getAllEquipment();
      }
    };

    return {
      equipment,
      item,
      equipmentTypes,
      dialog,
      closeDialog,
      sendData,
      removeItem,
      create,
      edit,
    };
  },

  components: {
    EquipmentDialog,
    SearchInput,
  },
};
</script>
