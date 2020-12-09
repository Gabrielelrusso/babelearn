var ViewHome = Vue.component('view-home', {
  data: function () {
    return {}
  },
  template: `
    <div class="h-100">
      <div class="card-title">
      </div>
      <div class="card-body h-100">
        <div class="row h-100">
            <div class="col-12 h-100 my-auto">
              <div class="row h-25">
                <div class="col-12 my-auto">
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis eleifend sem. Pellentesque posuere quam nisi, et condimentum neque interdum sed.
                    </div>
                </div>
              </div>
              <div class="row h-50">
                  <div class="col-12 my-auto text-center">
                        <button @click="$emit('change-view-event','view-challenges')" class="btn btn-primary btn-round">
                            <h1 class="text-white blinking">START GAME</h1>
                         </button>
                  </div>
              </div>
              <div class="row h-25">
                  <div class="col-12 my-auto">

                  </div>
              </div>
            </div>
        </div>
      </div>
      <div class="card-footer">
      </div>
    </div>
  `
})

// <button @click="$emit('change-view-event','view-challenges')" type="submit">BACK TO PREVIOUS VIEW</button> `
