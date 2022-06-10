<template>
  <v-dialog
    :model-value="true"
    persistent
  >
    <v-card width="1000">
      <v-card-title class="text-h5">
        <template v-if="item.id">Edit the equipment type</template>
        <template v-else>Create an equipment type</template>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-row>
              <v-col  cols="6">
                <v-text-field
                  v-model="formData.name"
                  :rules="nameRules"
                  label="Name"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="formData.mask"
                  :rules="maskRules"
                  label="Mask"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <MaskHint />
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="red"
          @click="remove"
          v-if="item.id"
        >
          Delete
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          variant="contained-text"
          @click="send"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, reactive, onUpdated } from 'vue'

import MaskHint from '@/components/MaskHint.vue'

export default {
  props: {
    item: Object
  },

  setup(props, context) {
    const form = ref(null)
    const formData = reactive({
      id: null,
      name: '',
      mask: ''
    })

    onUpdated(() => {
      if (props.item.id) {
        formData.id = props.item.id
        formData.name = props.item.name
        formData.mask = props.item.mask
      } else {
        formData.id = null
        
        if (form.value) {
          form.value.resetValidation()
          form.value.reset()
        }
      }
    })
    
    const valid = ref(false)
    const nameRules = [
      v => !!v || 'Name is required',
      v => v.length <= 255 || 'Name must be less than 255 characters'
    ]
    const maskRules = [
      v => !!v || 'Mask is required',
      v => /^[NAaXZ_@-]+$/.test(v) || 'Mask must be valid',
      v => v.length <= 255 || 'Mask must be less than 255 characters'
    ]
    
    const close = () => {
      context.emit('close')
    }

    const send = async () => {
      const { valid } = await form.value.validate()
      if (!valid) return
      
      context.emit('send', formData)

      formData.id = null
      form.value.resetValidation()
      form.value.reset()
    }

    const remove = async () => {
      context.emit('remove', formData.id)

      formData.id = null
    }

    return {
      form,
      formData,
      valid,
      close,
      send,
      remove,
      nameRules,
      maskRules
    }
  },

  components: {
    MaskHint
  }
}
</script>
