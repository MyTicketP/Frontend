<template>
    <div class="welcome">
        <div class="htext" align="center">
            <vs-alert class="title" style="font-size: 45px; position:relative; color: #00507D; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">My Ticket</vs-alert>
            <p class="text">Aplicación web para poder llevar el control del avance de 
            diferentes proyectos de desarrollo</p>
        </div>
        <div class="logo-container" align="center">
            <img src="../../assets/images/logo.jpg" alt="logo" style="width:250px">
        </div>
        <div class="buttons-container">
            <vs-button gradient size="large" style="width:200px" class="button-style" @click="active1=!active1">Iniciar Sesión</vs-button>
            <vs-button flat border size="large" style="width:200px" class="button-style" @click="active=!active">Registrarse</vs-button>
        </div>


 <!--Dialog Iniciar Sesion-->

        <vs-dialog blur v-model="active1" style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
            <template #header>
                <h2 class="not-margin" style="color: #00507D;">
                    <b>Iniciar Sesión</b>
                </h2>
            </template>


            <div class="con-form">
                <span class="p-float-label">
                    <vs-input v-model="dni" placeholder="Identificación" primary block>
                        <template #icon>
                            <i class='bx bxs-id-card'></i>
                        </template>
                    </vs-input>
                </span>
                <br>
                <span class="p-float-label">
                    <vs-input type="password" v-model="password" placeholder="Password" primary block>
                        <template #icon>
                            <i class='bx bxs-lock'></i>
                        </template>
                    </vs-input>
                </span>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button block @click="login">
                        Ingresar
                    </vs-button>

                    <div class="new">
                        ¿Nuevo aquí?  <a  href="#" @click="active=!active, active1=false" style="font-size: 12px; color: #00507D;"> Crear nueva cuenta</a>
                    </div>
                </div>
            </template>
        </vs-dialog>

 <!--Dialog Registrarse-->

        <vs-dialog blur v-model="active" style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
            <template #header>
                <h2 class="not-margin" style="color: #00507D;">
                    <b> Registrarse </b>
                </h2>
            </template>
            <div class="con-form">
                <span class="p-float-label">
                    <vs-input label-placeholder="Nombre Completo" primary block v-model="name" ></vs-input>
                </span>
                <br>
                <span class="p-float-label">
                    <vs-input label-placeholder="Identificación (DNI)" primary block v-model="dni" ></vs-input>
                </span>
                <br>
                <span class="p-float-label">
                    <vs-input label-placeholder="Ciudad" primary block v-model="city" ></vs-input>
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
                <br>
                <span class="p-float-label">
                    <vs-input type="password" label-placeholder="Contraseña" primary block v-model="password"
                        :progress="getProgress"
                        :visiblePassword="hasVisiblePassword"
                        icon-after
                        @click-icon="hasVisiblePassword = !hasVisiblePassword">
                        <template #icon>
                            <i v-if="!hasVisiblePassword" class='bx bx-show-alt'></i>
                            <i v-else class='bx bx-hide'></i>
                        </template>
                        <template v-if="getProgress >= 100" #message-success>
                            Contraseña Segura
                        </template>
                    </vs-input>
                </span>
                <br>
                <span class="p-float-label">
                    <select class="dropdown" placeholder="Compañia" primary  v-model="company">
                        <option disabled value="">Seleccione una compañia</option>
                        <option v-for="option in companies.companies" v-bind:key="option.nit">
                            {{option.nit}} ({{option.name}})
                        </option>
                    </select>
                </span>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button block @click="registerPerson">
                    Crear Cuenta
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>

<script>
import axios from "axios";

const path = "api/";


export default{
    data(){
        return{
            name: "",
            dni: "",
            city: "",
            email: "",
            password: "",
            company: "",
            selected_company: "",
            companies: "",
            active: false,
            active1: false,
            hasVisiblePassword: false,
            visible:false,
            success:false,
            loading:false
        }
    },
    computed: {
        validEmail() {
          return /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
        },

        getProgress() {
          let progress = 0

          // Al menos un número

          if (/\d/.test(this.password)) {
            progress += 20
          }

          // Al menos una mayúscula

          if (/(.*[A-Z].*)/.test(this.password)) {
            progress += 20
          }

          // Una minúscula

          if (/(.*[a-z].*)/.test(this.password)) {
            progress += 20
          }

          // Mas de 5 digitos

          if (this.password.length >= 6) {
            progress += 20
          }

          // Al menos un carácter especial

          if (/[^A-Za-z0-9]/.test(this.password)) {
            progress += 20
          }

          return progress
        }
    },
    methods:{

// Login
        login(event){
             axios
            .post(this.$store.state.backURL + path + "login", {
                dni: parseInt(this.dni),
                password: this.password,
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
                        title: 'Bienvenido',
                        text: 'Inicio de Sesión exitoso',

                        onDestroy: () => {
                            this.$router.push({name:"main"})
                        }
                })
                
            })
            .catch(error => {
                if( error.response.status === 400 ){
                    alert( "Credenciales incorrectas" );
                }else{
                    alert( "Error de comunicación con el servidor!" );
                }
            });
            event.preventDefault();
        },


// Registrar una persona
        registerPerson() {
            axios
            .post(this.$store.state.backURL + path + "person/", {
                name: this.name,
                dni: parseInt(this.dni),
                city: this.city,
                email: this.email,
                password: this.password,
                company: parseInt(this.company)
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
                        text: 'Ya puedes iniciar sesión',
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
        },


// Ver Compañias
        showCompanies(){
            axios.get(this.$store.state.backURL + path + "companies/",{
            })
            .then(response => {
                this.companies = response.data;
            })
            .catch(err => {
                alert(err);
            })
        }
    },
    mounted(){
        this.showCompanies()
    },
}
</script>

<style scoped>
.welcome{
    position: relative;
    background: url("../../assets/images/background.jpg");
    width: 100%;
    height: 100vh;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.logo-container{
   padding-top: 20px;
   width: 100%;
}
.buttons-container{
    margin-top: 50px;
    display: flex;
    justify-content: center;
    width: 100%;
}
.button-style{
    font-size: 20px;
    box-shadow: 1px 4px 5px gray;
}
.text{
    position: relative;
    margin-top: 50px;
    width: 40%;
    font-size: 23px;
    color: #00507D;
}
.subtext{
    cursor:pointer;
    color: #00507D;
}
.not-margin{
    margin: 0px;
    font-weight: normal;
    padding: 10px
}
.con-form{
    position: relative;
    width: 100%
}

.flex{
    display: flex;
    align-items: center;
    justify-content: space-between
}

.vs-input-content{
    margin: 10px 0px;
    width: calc(100%);
}

.vs-input{
    width: 100%;
}
.footer-dialog{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: calc(100%);

}
.new{
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    font-size: .7rem
}

.vs-button{
    margin: 0px
}

.dropdown{
    position: relative; 
    width:100%; 
    border: 2px solid transparent;
    background: rgba(var(--vs-gray-2), 1);
    color: rgba(var(--vs-text), 1);
    border-radius: inherit;
    box-sizing: border-box;
}
</style>