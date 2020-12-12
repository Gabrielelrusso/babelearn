var ViewChallenge1 = Vue.component('view-challenge1', {
  data: function () {
    return {}
  },
  props:{
    challenge:Object
  },
  template: `
    <div class="h-100">
        <div class="card-header card-header-icon card-header-info" style="height: 10%">
            <div class="card-text">
                <h4 class="card-title text-xl-center">Challenge 1</h4>
            </div>
        </div>
        <div class="card-body" style="height: 90%">
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
                                <div class="col-12 h-100 align-middle">
                                    <h4>{{ challenge.question.question }}</h4>
                                </div>
                            </div>
                            <div class="row h-75">
                               <div class="col-12 h-100 text-center">
                                  <ul class="nav nav-pills nav-pills-icons nav-pills-warning h-100 w-100 d-flex mx-auto text-center" style="justify-content: space-between" role="tablist">
                                      <!--
                                                      color-classes: "nav-pills-primary", "nav-pills-info", "nav-pills-success", "nav-pills-warning","nav-pills-danger"
                                                  -->
                                      <li v-for="(option, index) in challenge.question.options" class="nav-item">
                                        <div v-if="index == 0" @click="$emit('change-language-event','EN')" class="btn btn-block btn-link nav-link active" role="tab" data-toggle="tab" style="max-width: 20%">
                                            <div>{{option}}</div>
                                        </div>
                                        <div v-else @click="$emit('change-language-event','EN')" class="btn btn-block btn-link nav-link" role="tab" data-toggle="tab" style="max-width: 20%">
                                            <div>{{option}}</div>
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
