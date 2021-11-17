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
        <div class="child2">
          child 1
        </div>
        <div class="child">
          child 2
        </div>
        <div class="child">
          <div class="center">
              <div class="buttons-container">
                <vs-button class="button-style" size="large" @click="dialog=!dialog"><i class='bx bx-plus' style="letter-spacing: 3px"> </i>
                  Agregar Ticket
                </vs-button>
                <vs-button class="button-style" size="large" @click="showEditmodal"><i class='bx bx-pencil' style="letter-spacing: 5px"> </i> 
                  Editar Ticket
                </vs-button>
                <vs-button class="button-style" size="large" @click="dialogEliminar=!dialogEliminar"><i class='bx bxs-trash' style="letter-spacing: 4px"> </i>
                  Borrar Ticket
                </vs-button>
              </div>
              <DataTable :value="tickets.tickets" :paginator="true" :rows="10" 
                selectionMode="single" dataKey="id"
              >
                <template #header>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        
                    </span>
                </template>
                <Column field="id" header="Code"></Column>
                <Column field="story_id" header="Historia de Usuario"></Column>
                <Column field="state" header="Estado">
                  <template #body="slotProps">
                    <span style="color:white; font-size:14px; min-height:auto; word-wrap: break-word;" :class="[{'p-tag-success':slotProps.data.state === 'Activo', 'p-tag-warning':slotProps.data.state === 'En Proceso', 'p-tag-danger':slotProps.data.state === 'Finalizado'},'p-tag p-tag-xl']">
                      {{slotProps.data.state}}
                    </span>
                  </template>
                </Column>
                <Column field="text" header="Comentarios"></Column>
                <template #empty>
                  No hay ningún ticket registrado.
                </template>
            </DataTable>

          </div>
        </div>
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
      stories: "",
      tickets: "",
      dialog: false,
      active: 'license',
      state: [
                'A', 'P', 'F'
      ]
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

// Ver Historias de Usuario
        showTickets(){
            axios.get(this.$store.state.backURL + path + "ticket/",{
            })
            .then(response => {
                this.tickets = response.data;
            })
            .catch(err => {
                alert(err);
            })
        },

// Registrar Historia de Usuario
        registerTicket(){
          axios
          .post(this.$store.state.backURL + path + "ticket/", {
              state: this.state,
              text: this.text,
              story_id: this.story_id
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
        this.showTickets();
    } 
  }
</script>

<style scoped>

.buttons-container{
  position: relative; 
  width:100%; 
  display: flex;
  margin: 5px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

</style>

        