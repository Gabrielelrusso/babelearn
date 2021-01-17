var ViewChallenge1 = Vue.component('view-challenge-1', {
  data: function () {
    return {}
  },
  props:{
    challenge:Object
  },
  template: `
    <div  class="card mt-3 w-100 mx-auto d-flex" style="min-height: 80vh; width: 60vw">
        <div class="card-header card-header-icon card-header-info">
            <div class="card-text">
                <h4 class="card-title text-xl-center">What's the right meaning?</h4>
            </div>
        </div>
        <div class="card-body d-flex flex-column align-items-center">
            <div class="row mt-3">
                <div class="col-12">
                    <h4>{{ challenge.getDescription() }}</h4>
                    <hr>
                </div>
            </div>
            <div class="row mt-auto mb-auto text-center">
                <div class="col-12">
                    <div class="row">
                      <div class="col-12">
                          <h6>YOU ARE PLAYING WITH THE WORD</h6>
                          <h3><strong class="text-info">{{ challenge.getWordInGameLang()}}</strong></h3>
                      </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-12">
                            <h3>{{ challenge.getExerciseMain()}}</h3>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-12 text-center">
                            <ul class="nav nav-pills justify-content-center nav-pills-warning w-100"  role="tablist">
                                <li v-for="(option, index) in challenge.getExerciseOptions()" class="nav-item w-25">
                                  <div class="btn-link w-100 nav-link"  data-toggle="tab">
                                      <table class="h-100">
                                        <tbody>
                                          <tr>
                                            <td @click="$emit('submit-answer-event',option)" class="align-middle">{{option}}</td>
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
