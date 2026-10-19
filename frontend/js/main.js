import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import "../css/main.css";

createInertiaApp({
  http: {
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
  },

  resolve: (name) => {
    const pages = import.meta.glob("../pages/**/*.vue", {
      eager: true,
    });

    const page = pages[`../pages/${name}.vue`];

    if (!page) {
      throw new Error(`Página Inertia não encontrada: ${name}`);
    }

    return page;
  },

  setup({ el, App, props, plugin }) {
    createApp({
      render: () => h(App, props),
    })
      .use(plugin)
      .mount(el);
  },
});