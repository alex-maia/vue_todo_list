<template>
  <div id="areaTotal">
    <div id="formulario">
      <h1>Tarefas a fazer:</h1>
      <div class="labelsForm">
        <label for="tarefa">Tarefa</label> <br />
        <input
          v-model="nome"
          type="text"
          name="tarefa"
          id="tarefa"
          class="inputs"
        />
      </div>
      <div class="labelsForm">
        <label for="descricao">Descrição</label> <br />
        <input
          v-model="descricao"
          type="text"
          name="descricao"
          id="descricao"
          class="inputs"
        />
      </div>
      <div class="labelsForm">
        <button name="submit" id="botao" @click="submitTarefa(index)">
          Enviar
        </button>
      </div>
    </div>
    <h1>Tarefas:</h1>

    <div id="areaTarefas">
      <div id="areaNova" v-for="(tarefa, index) in tarefa" :key="index">
        <div id="areaConteudo">
          <div id="areaTitulo" class="areaTarefa">
            <h4>{{ tarefa.nome }}</h4>
          </div>
          <div id="areaDescricao" class="areaTarefa">
            <p>{{ tarefa.descricao }}</p>
          </div>
        </div>

        <div id="areabotoes">
          <div class="conteudo">
            <span class="pointer" @click="editEstado(index)"> <p> {{tarefa.estado}} </p></span>
          </div>
          <div @click="editTarefa(index)" class="conteudo">
            <span class="fa fa-pencil"></span>
          </div>
          <div @click="deleteTarefa(index)" class="conteudo">
            <span class="fa fa-trash"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todoList",

  data() {
    return {
      nome: "",
      descricao: "",
      editadoNome: null,
      editadoDescricao: null,
      editadoEstado: ["Por Fazer", "A Fazer", "Feito"],
      tarefa: [],
    };
  },
  methods: {
    submitTarefa() {
      if (this.editadoNome === null && this.editadoDescricao === null) {
        if (this.nome != "" && this.descricao != "") {
          this.tarefa.push({
            nome: this.nome,
            descricao: this.descricao,
            estado: "Por Fazer",
          });
        }
      } else {
        this.tarefa[this.editadoNome].nome = this.nome;
        this.editadoNome = null;
        this.tarefa[this.editadoDescricao].descricao = this.descricao;
        this.editadoDescricao = null;
      }
    },

    deleteTarefa(index) {
      this.tarefa.splice(index, 1);
    },

    editTarefa(index) {
      this.nome = this.nome[index].nome;
      this.editadoNome = index;
      this.descricao = this.descricao[index].descricao;
      this.editadoDescricao = index;
    },
    editEstado(index) {
      let newIndex = this.editadoEstado.indexOf(this.tarefa[index].estado);
      if (++newIndex > 2) newIndex = 0;
      this.tarefa[index].estado = this.editadoEstado[newIndex];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#formulario {
  margin: 40px auto;
  padding: 20px 0px;
  border: 3px solid rgb(0, 175, 0);
  border-radius: 15px;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

label,
h1 {
  color: rgb(0, 175, 0);
  margin: 20px 0px 20px 8px;
}
h1 {
  text-align: center;
}
.inputs {
  padding: 10px 100px;
  margin: 10px;
  border: none;
  border-bottom: 1px solid rgb(0, 175, 0);
  border-radius: 5px;
}
.inputs:hover {
  border: 1px solid rgb(0, 175, 0);
}

#botao {
  margin: 20px 0;
  padding: 10px 40px;
  background-color: rgb(0, 175, 0) !important;
  border-radius: 10px;
  color: black;
}
#botao:hover {
  background-color: rgb(2, 131, 2) !important;
}

#areaTarefas {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  max-width: 50%;
  overflow-y: auto;
}
table,
th,
td {
  border-collapse: collapse;
  border: 2px solid rgb(0, 175, 0);
  text-align: center;
  overflow-y: auto;
}
span {
  cursor: pointer;
}

#areaNova {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  padding: 5px 20px;
  border: 2px solid rgb(0, 175, 0);
  border-radius: 25px;
  justify-content: center !important;
  margin-top: 40px;
}
#areaConteudo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#areabotoes {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 100px;
}
#areaTitulo{
  align-items:center;
}
#areaDescricao{
  align-items:center;
  text-align: left;
}

.areaTarefa {
  display: flex;
  justify-content: start;
}
.conteudo {
  margin-left: 30px;
  transform: scale(1.4);
  transition: 500ms;
}
.conteudo:hover {
    transform: scale(1.6);
}

.pointer p {
font-size: 10pt ;
}

p{
  margin: 0!important;
}
h4{
  margin:0!important;
}
</style>