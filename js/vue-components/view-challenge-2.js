var ViewChallenge2 = Vue.component('view-challenge-2', {
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
                <h4 class="card-title text-xl-center">Challenge 2</h4>
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
                    <div class="row mt-4">
                        <div class="col-12">
                            <h3>{{ challenge.exercise.main }}</h3>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <div class="form-group label-floating has-info">
                                <label class="control-label">Success input</label>
                                      <input type="text" value="" class="form-control" />
                                <span class="form-control-feedback">
                                <i class="material-icons">done</i>
                                </span>
                            </div>
                            <div class="btn btn-info d-block btn-round">Submit</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>



`
})
