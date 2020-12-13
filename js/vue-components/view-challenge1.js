var ViewChallenge1 = Vue.component('view-challenge1', {
  data: function () {
    return {}
  },
  props:{
    challenge:Object
  },
  template: `
    <div  class="card mt-5 mx-auto d-flex" style="min-height: 80vh; width: 60vw">
        <div class="card-header card-header-icon card-header-info">
            <div class="card-text">
                <h4 class="card-title text-xl-center">Challenge 1</h4>
            </div>
        </div>
        <div class="card-body" style="height: 90%">
            <div class="row h-100">
                <div class="col-12 h-100">
                    <div class="row h-25 text-center">
                        <div class="col-12 h-100">
                            <h4>{{ challenge.description }}</h4>
                            <hr>
                            <h6>YOU ARE PLAYING WITH THE WORD</h6>
                            <h3><strong class="text-info">{{ challenge.word }}</strong></h3>
                        </div>
                    </div>
                    <div class="row h-75">
                        <div class="col-12 h-100 text-center">
                            <div class="row h-25">
                                <div class="col-12 h-100">
                                    <div class="align-middle">
                                        <h3>{{ challenge.question.question }}</h3>
                                    </div>
                                </div>

                            </div>
                            <div class="row h-75">
                               <div class="col-12 h-100">
                                  <ul class="ml-0 nav nav-pills justify-content-center nav-pills-warning w-100 h-100"  role="tablist">
                                      <li v-for="(option, index) in challenge.question.options" class="nav-item w-25 h-100">
                                        <div @click="$emit('change-language-event','EN')" class="btn-link h-100 w-100 nav-link"  data-toggle="tab">
                                            <table class="h-100">
                                              <tbody>
                                                <tr>
                                                  <td class="align-middle">{{option}}</td>
                                                </tr>
                                              </tbody>
                                            </table>
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
