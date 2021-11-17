<template>
    <div class="center examplex">
      <vs-navbar color="#0f7ebd" text-white square center-collapsed v-model="active">
        <template #left>
          <vs-navbar-item :active="active == 'home'" id="home" @click="goHome">
            <i class='bx bx-home bx-sm'></i>
          </vs-navbar-item>
        </template>
        <vs-navbar-item :active="active == 'guide'" id="guide" @click="goCompany">
          Compañias
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'docs'" id="docs" @click="goProject">
          Proyectos
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'components'" id="components" @click="goStory">
          Historias de Usuario
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'license'" id="license" @click="goTicket">
          Tickets
        </vs-navbar-item>
        <template #right>
          <vs-button color="#fff" border @click="goWelcome">Salir</vs-button>
        </template>
      </vs-navbar>
      <div class="square">
        <div class="child">
          <br><br><br><br><br><br><br>
          <vs-row justify="space-around">
            <vs-col w="3">
              <div class="create" @click="dialog=!dialog">
              <vs-card type="1" style="position:relative; right: 20%; border-radius: 10px; box-shadow: 0px 2px 10px rgb(92, 91, 91);">
                  <template #title>
                    <h1 align="center" style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                      Crear una nueva historia de Usuario
                    </h1>
                  </template>
                  <template #img>
                    <div class="plus"> 
                      <i class='bx bx-notepad bx-lg'></i>
                    </div>
                  </template>
                  <template #text>
                      <p align="center">
                        
                      </p>
                  </template>
                  <template #interactions>
                  
                  </template>
              </vs-card>
              </div>
            </vs-col>
            <vs-col w="6">

<!--Tabla Lista de Historias de Usuario -->
              <div class="tables">
                <div class="title">
                  <h2>Lista de Historias de Usuario</h2>
                </div>
                <vs-table striped style="box-shadow: 0px 2px 10px rgb(153, 151, 151); background-color: #daebf5">
                  <template #thead>
                    <vs-tr>
                      <vs-th>
                        Usuario
                      </vs-th>
                      <vs-th>
                        Nombre
                      </vs-th>
                      <vs-th>
                        Proyecto
                      </vs-th>
                    </vs-tr>
                  </template>
                  <template #tbody>
                    <vs-tr
                      :key="i"
                      v-for="(tr, i) in stories.stories"
                      :data="tr">
                      <vs-td>
                        {{ tr.person_id }}
                      </vs-td>
                      <vs-td>
                        {{ tr.name }}
                      </vs-td>
                      <vs-td>
                        {{ tr.project_id }}
                      </vs-td>
                    </vs-tr>
                  </template>
                  <template #notFound>
                    No hay ningúna historia de usuario registrada.
                  </template>
                </vs-table>
              </div>
            </vs-col>
          </vs-row>
        </div>

<!--Dialog Crear Proyecto-->

        <vs-dialog v-model="dialog" style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
            <template #header>
                <h2 class="not-margin" style="color: #00507D;">
                    <b> Crear Historia de Usuario </b>
                </h2>
            </template>
            <div class="con-form">
              <span class="p-float-label">
                  <vs-input label-placeholder="DNI" primary block v-model="person_id" ></vs-input>
              </span>
              <br>
              <span class="p-float-label">
                  <vs-input label-placeholder="Nombre Historia de Usuario" primary block v-model="name" ></vs-input>
              </span>
              <br>
              <span class="p-float-label">
                  <select class="dropdown" placeholder="Compañia" primary v-model="project" style="position: relative; width:100%">
                      <option disabled value="">Seleccione un proyecto</option>
                      <option v-for="option in projects.projects" v-bind:key="option.id">
                          {{option.id}} ({{option.name}})
                      </option>
                  </select>
              </span>
            </div>

            <template #footer>
                <div class="con-footer">
                    <vs-button @click="registerStory" >
                    Crear Historia
                    </vs-button>
                    <vs-button @click="modal=false" dark transparent>
                      Cancelar
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
      </div>
    </div>
</template>


<script>

import axios from "axios";
const path = "api/";

  export default {
    data:() => ({
      name: "",
      project: "",
      person_id: "",
      companies: "",
      projects: "",
      stories: null,
      dialog: false,
      active: 'components'
    }),


    methods:{

// Rutas
        goWelcome(){
            this.$router.push({name:"welcome"})
        },
        goHome(){
            this.$router.push({name:"home"})
        },
        goCompany(){
            this.$router.push({name:"company"})
        },
        goProject(){
            this.$router.push({name:"project"})
        },
        goStory(){
            this.$router.push({name:"story"})
        },
        goTicket(){
            this.$router.push({name:"ticket"})
        },

// Ver Proyectos
        showProjects(){
            axios.get(this.$store.state.backURL + path + "projects/",{
            })
            .then(response => {
                this.projects = response.data;
            })
            .catch(err => {
                alert(err);
            })
        },

// Ver Historias de Usuario
        showStories(){
            axios.get(this.$store.state.backURL + path + "stories/",{
            })
            .then(response => {
                this.stories = response.data;
            })
            .catch(err => {
                alert(err);
            })
        },

// Registrar Historia de Usuario
        registerStory(){
          axios
          .post(this.$store.state.backURL + path + "stories/", {
              name: this.name,
              project_id: parseInt(this.project),
              person_id: this.person_id
          })
          .then(response => {
          console.log(response.data);
              let color="success"
              let position="top-right"
              this.$vs.notification({
                progress: 'auto',
                duration: 1500,
                color,
                position,
                title: 'Registro Exitoso',
                text: 'Historia de Usuario registrada',
                
                onDestroy: () => {
                  location.reload()
                }
              })
          })
          .catch(error => {
              if( error.response.status === 400 ){
                  alert( "Por favor llene los campos correctamente" );
              }else{
                  alert( "Error de comunicación con el servidor!" );
              }
          });
        }
    },

    mounted(){
        this.showStories()
        this.showProjects()
    } 
  }
</script>

<style scoped>
.con-form{
  position: relative;
  width: 100%
}

.con-footer{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.tables {
  position: relative;
  width: 100%;
  top: -68px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.title {
  color: #2f3030;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

h1{
  overflow:auto;
  /*word-wrap: break-word;*/
}
</style>

        