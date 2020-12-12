var ViewChallenge1 = Vue.component('view-challenge1', {
  data: function () {
    return {}
  },
  props:{
    challenge:Object
  },
  template: `
    <div class="h-100">
        <div class="card-header card-header-icon card-header-info">
            <div class="card-text">
                <h4 class="card-title text-xl-center">Challenge 1</h4>
            </div>
        </div>
        <div class="card-body h-75">
            <div class="row h-100">
                <div class="col-12 h-100">
                    <div class="row h-25 text-center">
                        <div class="col-12 h-100">
                          <div class="h-25">
                            <span>{{ challenge.description }}</span>
                          </div>
                          <div class="h-75">
                            <div>YOU ARE PLAYING WITH THE WORD</div>
                            <h3>{{ challenge.word }}</h3>
                          </div>
                        </div>
                    </div>
                    <div class="row h-75">
                        <div class="col-12 h-100 text-center">
                            <div class="row h-25">
                                <div class="col-12 h-100">
                                    <div class="align-middle">
                                        <h4>{{ challenge.question.question }}</h4>
                                    </div>
                                </div>

                            </div>
                            <div class="row h-75">
                               <div class="col-12 h-100">
                                  <ul class="ml-0 nav nav-pills justify-content-center nav-pills-warning w-100 h-100"  role="tablist">
                                      <li v-for="(option, index) in challenge.question.options" class="nav-item w-25 h-50">
                                        <div @click="$emit('change-language-event','EN')" class="btn-link h-100 w-100 nav-link"  data-toggle="tab">
                                            <div class="">{{option}}</div>
                                        </div>
                                      </li>

                                  </ul>
                               </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>



`
})
