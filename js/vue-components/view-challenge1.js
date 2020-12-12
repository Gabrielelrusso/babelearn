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
        <div class="card-body h-100">
            <div class="row h-100">
                <div class="col-12 my-auto h-100">
                    <div class="row h-25">
                        <div class="col-12 h-100 my-auto">
                          <div class="text-center">
                            {{ challenge.description }}
                          </div>
                        </div>
                    </div>
                    <div class="row h-25">
                        <div class="col-12 h-100 text-center">
                            <div>YOU ARE PLAYING WITH THE WORD</div>
                            <h3>{{ challenge.word }}</h3>
                        </div>
                    </div>
                    <div class="row h-50">
                        <div class="col-12 h-100 text-center">
                            <div><p>{{ challenge.question.question }}</p></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>



`
})
