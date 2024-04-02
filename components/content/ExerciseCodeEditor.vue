<script setup>
import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const code = ref(props.modelValue);

const getExtensions = () => [python(), oneDark];

watch(code, (newCode) => {
  emit("update:modelValue", newCode); 
});
</script>

<template>
    <codemirror
        :extensions="getExtensions()"
        v-model="code"
        :style="{ height: '100%', width: '100%', 'font-size': '18px' }"
    ></codemirror>
</template>