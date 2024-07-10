import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useStore = defineStore('main', () => {
  const layers = ref({
    messageToEdit: '',
    elements: {}, // 储存元素
    messages: [],
  });

  const getMessageById = computed(() => {
    return (messageId) =>
      layers.value.messages.find((element) => element.id === messageId);
  });

  function setMessageItems(messageId, items) {
    const result = layers.value.messages.find(
      (element) => element.id === messageId
    );
    if (result) {
      result.items = items;
    }
  }

  return {
    layers,
    getMessageById,
    setMessageItems,
  };
});
