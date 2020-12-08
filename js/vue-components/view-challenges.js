var ViewChallenges = Vue.component('view-challenges', {
  data: function () {
    return {
    }
  },
  template: '<div>Pollo <button @click="$emit(\'change-view-event\',\'view-home\')" type="submit">BACK TO PREVIOUS VIEW</button></div>'
})
