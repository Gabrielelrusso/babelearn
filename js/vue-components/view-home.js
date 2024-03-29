var ViewHome = Vue.component('view-home', {
  data: function () {
    return {}
  },
  template: `
    <div  class="card mt-3 w-100 d-flex " style="min-height: 80vh; width: 60vw">
      <div class="card-header card-header-icon card-header-info">
        <div class="card-text">
          <h4 class="card-title text-xl-center">Main menu</h4>
        </div>
      </div>
      <div class="card-body w-100 d-flex flex-column justify-content-around">
          <div class="row">
            <div class="col-12 text-center align-self-center">
                <h3>
                    Welcome to Babelearn: an interactive, didactic web application to learn several new languages!
                    Choose a language, hit <i>start game</i> and have fun! 
                </h3>
            </div>
          </div>
          <div class="row">
              <div class="col-12 my-auto mx-auto text-center">
                  <ul class="nav nav-pills nav-pills-icons nav-pills-info w-100 mx-auto text-center" role="tablist">
                      <!--
                                      color-classes: "nav-pills-primary", "nav-pills-info", "nav-pills-success", "nav-pills-warning","nav-pills-danger"
                                  -->
                      <li class="nav-item ml-auto" >
                        <div @click="$emit('change-language-event','EN')" class="btn btn-link nav-link active" role="tab" data-toggle="tab" style="height: 60px; width: 60px;">
                              <img class="card-img-top img-circle mx-auto"
                                  src="img/country_flags/united-kingdom.svg"
                                  alt="Card image cap"
                                  style="max-height: 100%; max-width: 100%;"
                              >
                        </div>
                      </li>
                      <li class="nav-item" >
                        <div @click="$emit('change-language-event','IT')" class="btn btn-link nav-link" role="tab" data-toggle="tab" style="height: 60px; width: 60px;">
                              <img class="card-img-top img-circle mx-auto"
                                  src="img/country_flags/italy.svg"
                                  alt="Card image cap"
                                  style="max-height: 100%; max-width: 100%;"
                              >
                        </div>
                      </li>
                      <li class="nav-item" >
                        <div @click="$emit('change-language-event','FR')" class="btn btn-link nav-link" role="tab" data-toggle="tab" style="height: 60px; width: 60px;">
                              <img class="card-img-top img-circle mx-auto"
                                  src="img/country_flags/france.svg"
                                  alt="Card image cap"
                                  style="max-height: 100%; max-width: 100%;"
                              >
                        </div>
                      </li>
                      <li class="nav-item" >
                        <div @click="$emit('change-language-event','ES')" class="btn btn-link nav-link" role="tab" data-toggle="tab" style="height: 60px; width: 60px;">
                              <img class="card-img-top img-circle mx-auto"
                                  src="img/country_flags/spain.svg"
                                  alt="Card image cap"
                                  style="max-height: 100%; max-width: 100%;"
                              >
                        </div>
                      </li>
                      <li class="nav-item mr-auto" >
                        <div @click="$emit('change-language-event','DE')" class="btn btn-link nav-link" role="tab" data-toggle="tab" style="height: 60px; width: 60px;">
                              <img class="card-img-top img-circle mx-auto"
                                  src="img/country_flags/germany.svg"
                                  alt="Card image cap"
                                  style="max-height: 100%; max-width: 100%;"
                              >
                        </div>
                      </li>
                  </ul>
              </div>
          </div>
          <div class="row">
              <div class="col-12 my-auto text-center">
                    <button @click="$emit('change-view-event','view-challenges')" class="btn btn-info btn-round">
                        <h1 class="text-white blinking">START GAME</h1>
                     </button>
              </div>
          </div>
      </div>
      <div class="card-footer">
      </div>
    </div>
  `
})

// <button @click="$emit('change-view-event','view-challenges')" type="submit">BACK TO PREVIOUS VIEW</button> `
