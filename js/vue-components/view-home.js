var ViewHome = Vue.component('view-home', {
  data: function () {
    return {}
  },
  template: `
    <div>
      <div class="card-title">
      </div>
      <div class="card-body">
        <div class="row h-100">
            <div class="col-12">
              <div class="row">
                <div class="col-12 my-auto">
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vulputate nibh a urna convallis finibus.
                         Etiam in lacus nibh. Nam euismod dignissim sapien, ut semper dolor. Integer imperdiet auctor libero, nec consequat sapien imperdiet ut.
                          Mauris tincidunt augue magna, nec convallis diam pulvinar ut.
                    </div>
                </div>
              </div>
              <div class="row h-30">
                  <div class="col-12 text-center my-auto">
                        <button @click="$emit('change-view-event','view-challenges')" class="btn btn-primary btn-round">
                            <h1 class="text-white blinking">START GAME</h1>
                         </button>
                  </div>
              </div>
              <div class="row">
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
