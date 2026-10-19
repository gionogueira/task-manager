from inertia import render


def home(request):
    return render(
        request,
        "Home",
        {
            "title": "Minhas tarefas",
            "initialTasks": [
                {"id": 1, "title": "Estudar Django"},
                {"id": 2, "title": "Aprender Inertia.js"},
                {"id": 3, "title": "Praticar Vue 3"},
            ],
        },
    )