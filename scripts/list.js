var tarefas = [];

function addTarefa(){
    const input = document.getElementById("tarefa-text");
    const tarefaTexto = input.value.trim();

    if(tarefaTexto === ''){
        alert("VOCÊ TENTOU ADICIONAR UMA TAREFA SEM TEXTO");
        return;
    }

    const novaTarefa = {
        id: Math.floor(Math.random() * 1000000),
        text: tarefaTexto,
        completo: false
    }

    tarefas.push(novaTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas))

    render()
    input.value = "";
    input.focus();
}

function render(){
    const listaTarefa = document.getElementById("lista-tarefa");
    listaTarefa.innerHTML = "";

    for(var i = 0; i < tarefas.length;i++){
        const li = document.createElement("li");

        if(tarefas[i].completo === true){
            li.classList.add("completo")
        }

        const span = document.createElement("span");
        span.textContent = tarefas[i].text;

        const concluir = document.createElement("button")
        concluir.textContent = tarefas[i].completo ? "desmarcar" : "concluir";
        concluir.classList.add("check")
        concluir.setAttribute("onclick", `trocaConcluir(${tarefas[i].id})`)

        const edit = document.createElement("button")
        edit.textContent = "edit"
        edit.classList.add("edit");
        edit.setAttribute("onclick", `editarTarefa(${tarefas[i].id})`)

        const deletar = document.createElement("button");
        deletar.textContent = "deletar";
        deletar.classList.add("delete");
        deletar.setAttribute("onclick", `deletarTarefa(${tarefas[i].id})`)

        const div = document.createElement("div");

        div.appendChild(concluir);
        div.appendChild(edit);
        div.appendChild(deletar);

        li.appendChild(span);
        li.appendChild(div);

        listaTarefa.appendChild(li);

    }
}

function trocaConcluir(id){
    const index = tarefas.findIndex(tarefa => tarefa.id === id);

    const valorAtual = tarefas[index].completo;

    tarefas[index].completo = !valorAtual
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    render();
}

function editarTarefa(id){
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    const novoTextoTarefa = prompt("Edit a Tarefa", tarefas[index].text);

    if(novoTextoTarefa !== null && novoTextoTarefa.trim() !== ""){
        tarefas[index].text = novoTextoTarefa;
        localStorage.setItem("tarefas", JSON.stringify(tarefas))
        render();
    }

    function deletarTarefa(id){
        tarefas = tarefas.filter(tarefa => tarefa.id !== id);
        // const index = tarefas.findIndex(tarefa => tarefa.id === id);
        // tarefas.slice(index, i);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        render();
        
    }

    function addPeloEnter(evento){
        if(evento.key === "Enter"){
            addTarefa();
        }
    }

    function carregarTarefas(){
        const tarefasLocalStorage = localStorage.getItem("tarefas")

        if(tarefasLocalStorage){
            tarefas = tarefasLocalStorage;
            tarefas = JSON.parse(tarefasLocalStorage);
            render();
        }
    }

}