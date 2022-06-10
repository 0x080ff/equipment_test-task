<template>
  <v-dialog
    :model-value="true"
    persistent
  >
    <v-card width="1000">
      <v-card-title class="text-h5">
        <template v-if="item.id">Edit the equipment</template>
        <template v-else>Create an equipment</template>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-row>
              <v-col  cols="6">
                <v-select
                  v-model="formData.type"
                  :hint="formData.type.id ? `${formData.type.name} (id: ${formData.type.id})` : null"
                  :rules="typeRules"
                  :items="equpmentTypes"
                  @update:modelValue="changeType"
                  item-title="name"
                  item-value="id"
                  label="Select type"
                  variant="outlined"
                  persistent-hint
                  return-object
                  single-line
                  required
                ></v-select>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="formData.sn"
                  :hint="`Mask ${formData.type.mask}`"
                  :rules="snRules"
                  :label="`SN (${formData.type.mask})`"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>

              <v-col  cols="12">
                <v-textarea
                  v-model="formData.note"
                  label="Note"
                  variant="outlined"
                ></v-textarea>
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
import { ref, reactive, computed, onUpdated } from 'vue'

import MaskHint from '@/components/MaskHint.vue'

export default {
  props: {
    item: Object,
    types: Array
  },

  setup(props, context) {
    const form = ref(null)
    const formData = reactive({
      id: null,
      type: { id: null, name: '', mask: '' },
      sn: '',
      note: ''
    })

    const equpmentTypes = ref([])

    onUpdated(() => {
      equpmentTypes.value = props.types.map((t) => {
        return {
          id: t.id,
          name: t.attributes.name,
          mask: t.attributes.mask
        }
      })

      if (props.item.id) {
        formData.id = props.item.id
        formData.type = { id: props.item.type.id, ...props.item.type.attributes }
        formData.sn = props.item.sn
        formData.note = props.item.note
      } else {
        formData.id = null
        formData.type = { id: null, name: '', mask: '' }

        if (form.value) {
          form.value.resetValidation()
          form.value.reset()
        }
      }
    })

    
    const valid = ref(false)

    const mask = computed(() => {
      const str = formData.type.mask
        .replace(/Z/g, '[@_-]')
        .replace(/N/g, '[0-9]')
        .replace(/A/g, '[A-Z]')
        .replace(/a/g, '[a-z]')
        .replace(/X/g, '[A-Z0-9]')
      return new RegExp(`^${str}+$`)
    })

    const changeType = () => {
      form.value.validate()
    }

    const typeRules = [
      v => !!v || 'Type is required'
    ]
    const snRules = [
      v => !!v || 'SN is required',
      v => mask.value.test(v) || 'SN must be match the mask',
      v => v.length <= formData.type.mask.length || `Mask must be less than ${formData.type.mask.length} characters`
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
      equpmentTypes,
      valid,
      mask,
      changeType,
      close,
      send,
      remove,
      typeRules,
      snRules
    }
  },

  components: {
    MaskHint
  }
}
</script>
