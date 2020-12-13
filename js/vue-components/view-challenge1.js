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
        <div class="card-body d-flex flex-column align-items-center">
            <div class="row  mt-3">
                <div class="col-12">
                    <h4>{{ challenge.description }}</h4>
                    <hr>
                </div>
            </div>
            <div class="row mt-auto mb-auto text-center">
                <div class="col-12">
                    <div class="row">
                      <div class="col-12">
                          <h6>YOU ARE PLAYING WITH THE WORD</h6>
                          <h3><strong class="text-info">{{ challenge.word }}</strong></h3>
                      </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-12">
                            <h3>{{ challenge.question.question }}</h3>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-12 text-center">
                            <ul class="nav nav-pills justify-content-center nav-pills-warning w-100"  role="tablist">
                                <li v-for="(option, index) in challenge.question.options" class="nav-item w-25">
                                  <div @click="$emit('change-language-event','EN')" class="btn-link w-100 nav-link"  data-toggle="tab">
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



`
})
