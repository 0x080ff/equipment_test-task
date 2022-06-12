import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', {
  state: () => {
    return {
      snackbar: {
        state: false,
        color: '',
        text: '',
        timeout: 2000,
      },
    };
  },

  actions: {
    setSnackbar(data) {
      this.snackbar.state = data.state || false;
      this.snackbar.color = data.color || '';
      this.snackbar.text = data.text || '';
      this.snackbar.timeout = data.timeout || 2000;
    },
  },
});
