<template>
  <Listbox v-model="selectedItem">
    <div class="selector">
      <ListboxButton>
        <span>
          {{ selectedItem?.name }}
        </span>
      </ListboxButton>
      <ListboxOptions>
        <ListboxOption
          v-for="item in data"
          :key="item.id"
          :value="item"
          as="template"
          v-slot="{ selected }"
          class="px-3"
        >
          <span
            class="py-1 cursor-pointer"
            :class="selected ? 'selected fw-bold ' : 'd-block'"
          >
            {{ item.name }}
          </span>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const props = defineProps<{
  data: {
    id: number;
    name: string;
  }[];
}>();
const selectedItem = ref(props.data[0]);
</script>

<style scoped></style>
