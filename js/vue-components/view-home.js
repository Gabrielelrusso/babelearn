var ViewHome = Vue.component('view-home', {
  data: function () {
    return {
    }
  },
  template: '<div>Ciao <button @click="$emit(\'change-view-event\',\'view-challenges\')" type="submit">BACK TO PREVIOUS VIEW</button></div>'
})
