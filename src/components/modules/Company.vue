
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
                <vs-button class="button-style" size="large" @click="dialog=!dialog">
                  Agregar nueva Compañia
                </vs-button>
              </div>
            <vs-table striped style="background-color: #e2f5da">
              <template #thead>
                <vs-tr>
                  <vs-th>
                    Nombre
                  </vs-th>
                  <vs-th>
                    Nit
                  </vs-th>
                  <vs-th>
                    Dirección
                  </vs-th>
                  <vs-th>
                    Correo
                  </vs-th>
                  <vs-th>
                    Tel
                  </vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr
                  :key="i"
                  v-for="(tr, i) in companies.companies"
                  :data="tr">
                  <vs-td>
                    <b>{{ tr.name }}</b>
                  </vs-td>
                  <vs-td>
                    {{ tr.nit }}
                  </vs-td>
                  <vs-td>
                    {{ tr.dir }}
                  </vs-td>
                  <vs-td>
                    {{ tr.email }}
                  </vs-td>
                  <vs-td>
                    {{ tr.tel }}
                  </vs-td>
                </vs-tr>
              </template>
              <template #notFound>
                No hay ningúna empresa registrada.
              </template>
            </vs-table>
          </div>
        </div>

<!--Dialog Registrar Compañia-->

        <vs-dialog v-model="dialog" style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
            <template #header>
                <h2 class="not-margin" style="color: #00507D;">
                    <b> Registrar Compañia </b>
                </h2>
            </template>
            <div class="con-form">
                <span class="p-float-label">
                    <vs-input label-placeholder="Nombre de la Compañia" primary block v-model="name" ></vs-input>
                </span>
                <br>
                <span class="p-float-label">
                    <vs-input label-placeholder="NIT" primary block v-model="nit" ></vs-input>
                </span>
                <br>
                <span class="p-float-label">
                    <vs-input label-placeholder="Teléfono" primary block v-model="tel" ></vs-input>
                </span>
                <br>
                <span class="p-float-label">
                    <vs-input label-placeholder="Dirección" primary block v-model="dir" ></vs-input>
                </span>
                <br>
                <span class="p-float-label">
                    <vs-input label-placeholder="Email" primary block v-model="email" > 
                        <template v-if="validEmail" #message-success>
                            Email Valido
                        </template>
                        <template v-if="!validEmail && email !== ''" #message-danger>
                            Email Invalido
                        </template>
                    </vs-input>
                </span>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button block @click="registerCompany">
                    Crear Compañia
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
      </div>
    </div>
</template>


<script>

import axios from "axios";
const path = "api/companies/";

  export default {
    data:() => ({
      companies: null,
      nit: "",
      name: "",
      tel: "",
      dir: "",
      email: "",
      dialog: false,
      active: 'guide'
    }),

    computed: {
        validEmail() {
          return /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
        },
    },


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


//  Ver Compañias
        showCompany(){
            axios.get(this.$store.state.backURL + path,{
            })
            .then(response => {
                this.companies = response.data;
            })
            .catch(err => {
                alert(err);
            })
        },


// Registrar una compañia 
        registerCompany(){
          axios
            .post(this.$store.state.backURL + path, {
                nit: this.nit,
                name: this.name,
                tel: this.tel,
                dir: this.dir,
                email: this.email
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
                text: 'Compañia registrada',   

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
        this.showCompany();
    } 
  }
  </script>

  <style scoped>

  .center {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; 
  }

  .buttons-container {
    display: flex;
    align-items: right;
    justify-content: right;
    margin: 5px;
  }

  </style>

        