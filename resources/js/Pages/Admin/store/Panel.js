import { ref } from "vue";

export const Panel = ref({
    isPanelOpen: true,
    SetIsOpened(value) {
        Panel.value.isPanelOpen = value;
    },
});
