<script setup>
import { ref, computed } from "vue";
import { Head } from "@inertiajs/vue3";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  initialTasks: {
    type: Array,
    default: () => [],
  },
});

const tasks = ref(
  props.initialTasks.map((task) => ({
    ...task,
    done: false,
  }))
);

const newTask = ref("");

const pendingCount = computed(
  () => tasks.value.filter((task) => !task.done).length
);

function addTask() {
  const title = newTask.value.trim();

  if (!title) return;

  tasks.value.push({
    id: Date.now(),
    title,
    done: false,
  });

  newTask.value = "";
}
</script>

<template>
  <Head title="Minhas tarefas" />

  <main class="min-h-screen bg-slate-100 px-4 py-12">
    <section class="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
      <p class="text-sm font-semibold text-indigo-600">
        MEU PRIMEIRO PROJETO
      </p>

      <h1 class="mt-2 text-3xl font-bold text-slate-900">
        {{ title }}
      </h1>

      <p class="mt-2 text-slate-500">
        Você tem {{ pendingCount }} tarefa(s) pendente(s).
      </p>

      <form
        class="mt-8 flex gap-2"
        @submit.prevent="addTask"
      >
        <input
          v-model="newTask"
          type="text"
          placeholder="Digite uma nova tarefa..."
          class="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <button
          type="submit"
          class="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Adicionar
        </button>
      </form>

      <ul class="mt-6 space-y-3">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="flex items-center gap-3 rounded-lg border border-slate-200 p-4"
        >
          <input
            v-model="task.done"
            type="checkbox"
            class="size-5 accent-indigo-600"
          />

          <span
            class="flex-1 text-slate-700"
            :class="{ 'text-slate-400 line-through': task.done }"
          >
            {{ task.title }}
          </span>
        </li>
      </ul>

      <p
        v-if="tasks.length === 0"
        class="mt-6 text-center text-slate-400"
      >
        Nenhuma tarefa ainda. Adicione a primeira!
      </p>
    </section>
  </main>
</template>