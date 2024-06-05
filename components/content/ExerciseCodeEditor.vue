<script setup>
import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript, javascriptLanguage } from "@codemirror/lang-javascript";
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["update:modelValue"]);

const code = ref(props.modelValue);

const getExtensions = () => [javascript(), tokyoNight];

watch(code, (newCode) => {
    emit("update:modelValue", newCode);
});
</script>

<template>
    <Codemirror
        :extensions="getExtensions()"
        v-model="code"
        :style="{ height: '100%', width: '100%', 'font-size': '18px' }"
        data-cy="exercise-code-editor"
    />
</template>
