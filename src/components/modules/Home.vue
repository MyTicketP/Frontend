<template>
    <div class="center examplex">
      <vs-navbar color="#0f7ebd" text-white square fixed rightCollapsed v-model="active">
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
          <br><br>
          <vs-row justify="center">
                <vs-col w="3" style="position:relative; right:8%;">
                  <router-link to='/company' style="text-decoration: none" >
                    <vs-card type="1">
                        <template #title>
                          <h1 align="center" >Compañias</h1>
                        </template>
                        <template #img>
                            <img src="../../assets/images/company.jpg" alt="">
                        </template>
                        <template #text>
                            <p align="center">
                              
                            </p>
                        </template>
                        <template #interactions>
                        
                        </template>
                    </vs-card>
                  </router-link>
                </vs-col>
                <vs-col w="3" style="position:relative; left:6%;">
                    <router-link to='/project' style="text-decoration: none" >
                      <vs-card type="1">
                        <template #title>
                            <h1 align="center" >Proyectos</h1>
                        </template>
                        <template #img>
                            <img src="../../assets/images/project.jpg" alt="">
                        </template>
                        <template #text>
                            <p align="center">
                              
                            </p>
                        </template>
                        <template #interactions>
                        
                        </template>
                    </vs-card>
                  </router-link>
                </vs-col>
          </vs-row>
          <br><br>
          <vs-row align="flex-end" justify="center">
                <vs-col w="3" style="position:relative; right:8%;">
                  <router-link to='/story' style="text-decoration: none" >
                      <vs-card type="1">
                        <template #title>
                            <h1 align="center">Historias de usuario</h1>
                        </template>
                        <template #img>
                            <img src="../../assets/images/story.jpg" alt="">
                        </template>
                        <template #text>
                            <p align="center">
                              
                            </p>
                        </template>
                        <template #interactions>
                        
                        </template>
                    </vs-card>
                  </router-link>
                </vs-col>
                <vs-col w="3" style="position:relative; left:6%;">
                  <router-link to='/ticket' style="text-decoration: none" >
                    <vs-card type="1">
                        <template #title>
                            <h1 align="center" >Tickets </h1>
                        </template>
                        <template #img>
                            <img src="../../assets/images/ticket.jpg" alt="">
                        </template>
                        <template #text>
                            <p align="center">

                            </p>
                        </template>
                        <template #interactions>
                        
                        </template>
                    </vs-card>
                  </router-link>
                </vs-col>
            </vs-row>
        </div>
      </div>
    </div>
</template>
  
<script>

import axios from "axios";
const path = "api/person/";
const path2 = "api/companies/";

  export default {
    data:() => ({
      active: 'home',
      companies: null,
      selected_company: ""
    }),


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
        },
        getPerson(){
            axios.get(this.$store.state.backURL + path,{
            })
            .then(response => {
                this.establecimientos = response.data;
            })
            .catch(err => {
                alert(err);
            })
        },
        showCompany(){
            axios.get(this.$store.state.backURL + path2,{
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
        this.showCompany();
    } 
  }
</script>
<style scoped>

h1{
  color: #00507D; 
  overflow:auto;
  /*word-wrap: break-word;*/
}
</style>
        