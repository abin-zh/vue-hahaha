import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter',{
    state:() => ({
        count:0,
        name:'Eduaro'
    }),
    getters:{
        doubleCount:(state) => state.count * 2,
        doubleCount1(){ return this.count * 2},
    },
    actions:{
        increment(){
            this.count++;
        }
    }
});