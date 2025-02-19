<template>
  <div class="my-3">
    <q-editor
      v-model="value"
      @update:model-value="updateContent"
      @paste="onPaste"
      :dense="$q.screen.lt.md"
      toolbar-bg="grey-2"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify'],
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify'],
          },
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn', 'undo', 'redo'],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent', 'removeFormat'],

        [
          {
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
          },
          {
            icon: $q.iconSet.editor.fontSize,
            list: 'no-icons',
            options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7'],
          },
          {
            icon: $q.iconSet.editor.font,
            list: 'no-icons',
            options: ['default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana'],
          },
        ],
        // ['viewsource',  'fullscreen', 'print'],
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana',
      }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DOMPurify from "dompurify";
// import { useQuasar } from "quasar";
// const $q = useQuasar();

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(['update:modelValue', 'valueChanged']); // Emit custom event

let value = ref(props.modelValue);
const updateContent = (newContent) => {
  value = DOMPurify.sanitize(newContent);
  emit('update:modelValue', newContent); // For v-model
  
};

const onPaste = (evt) => {
  // Let inputs do their thing, so we don't break pasting of links.
  if (evt.target.nodeName === "INPUT") return;
  let text, onPasteStripFormattingIEPaste;
  evt.preventDefault();
  evt.stopPropagation();
  if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
    text = evt.originalEvent.clipboardData.getData("text/plain");
    editorRef.value.runCmd("insertText", text);
  } else if (evt.clipboardData && evt.clipboardData.getData) {
    text = evt.clipboardData.getData("text/plain");
    editorRef.value.runCmd("insertText", text);
  } else if (window.clipboardData && window.clipboardData.getData) {
    if (!onPasteStripFormattingIEPaste) {
      onPasteStripFormattingIEPaste = true;
      editorRef.value.runCmd("ms-pasteTextOnly", text);
    }
    onPasteStripFormattingIEPaste = false;
  }
};
</script>
