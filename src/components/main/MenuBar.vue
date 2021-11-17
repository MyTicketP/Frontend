<template>
    <div class="bar">
        <vs-navbar color="#0f7ebd" text-white square center-collapsed v-model="active">
        <template #left>
          <vs-navbar-item :active="active == 'home'" id="home" v-on:click.native="state='home'"><router-link to="/home"></router-link>
            <i class='bx bx-home bx-sm'></i>
          </vs-navbar-item>
        </template>
        <vs-navbar-item :active="active == 'company'" id="company" v-on:click.native="state='company'"><router-link to="/company"></router-link>
          Compañias
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'project'" id="project" v-on:click.native="state='project'"><router-link to="/project"></router-link>
          Proyectos
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'story'" id="story" v-on:click.native="state='story'" ><router-link to="/story"></router-link>
          Historias de Usuario
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'ticket'" id="ticket" v-on:click.native="state='ticket'"><router-link to="/ticket"></router-link>
          Tickets
        </vs-navbar-item>
        <template #right>
          <vs-button color="#fff" border @click="goWelcome">Salir</vs-button>
        </template>
      </vs-navbar>
      <div class="square">
        <div class="child">
          <router-view/>
        </div>
      </div>
    <div v-if="state=='home'"><Home></Home></div>
    <div v-else-if="state=='company'"><Company></Company></div>
    <div v-else-if="state=='project'"><Project></Project></div>
    <div v-else-if="state=='story'"><Story></Story></div>
    <div v-else-if="state=='ticket'"><Ticket></Ticket></div>
    </div>
</template>

<script>
  import Home from '../modules/Home.vue'
  import Company from '../modules/Company.vue'
  import Project from '../modules/Project.vue'
  import Story from '../modules/Story.vue'
  import Ticket from '../modules/Ticket.vue'
  
  export default{

    components:{
      Home,
      Company,
      Project,
      Story,
      Ticket
    },

    data(){
      return{
        state: "home",
        active:null,
        dialog:false
      }
    },

    methods:{
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
        }
    },
  }

</script>



<style scoped>


</style>