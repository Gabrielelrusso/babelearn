var ViewChallenge4 = Vue.component('view-challenge-4', {
  data: function () {
    return {
    }
  },
  props:{
    challenge:Object
  },
  methods: {
      getSubmittedAnswer(){
          let answer = $("#answer-input").val();
          return answer;
      },
      cleanInput(){
          $("#answer-input").val("");
      }
  },
  template: `
    <div  class="card mt-5 mx-auto d-flex" style="min-height: 80vh; width: 60vw">
        <div class="card-header card-header-icon card-header-info">
            <div class="card-text">
                <h4 class="card-title text-xl-center">Four images, one word!</h4>
            </div>
        </div>
        <div class="card-body d-flex flex-column align-items-center">
            <div class="row  mt-3">
                <div class="col-12">
                    <h4>{{ challenge.getDescription() }}</h4>
                    <hr>
                </div>
            </div>
            <div class="row mt-auto mb-auto text-center">
                <div class="col-12">
                    <div class="row" style="height: 50vh">
                        <div class="col-6 h-100">
                            <div class="row h-50">
                                <div class="col-12 h-100">
                                    <div class="d-flex justify-content-center align-items-center h-100">
                                        <div class="card h-100 w-100" style="box-shadow: none;">
                                            <img class="img rounded mx-auto my-auto no-shadow"
                                                :src="challenge.getExerciseOptions()[0]"
                                                alt="Card image cap"
                                                type="submit"
                                                style="max-height: 95%; max-width:95%; background-color: transparent !important; cursor: pointer"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row h-50">
                                <div class="col-12 h-100">
                                    <div class="d-flex justify-content-center align-items-center h-100">
                                        <div class="card h-100" style="box-shadow: none;">
                                            <img class="img rounded mx-auto my-auto no-shadow"
                                                :src="challenge.getExerciseOptions()[1]"
                                                alt="Card image cap"
                                                type="submit"
                                                style="max-height: 95%; max-width:95%; background-color: transparent !important; cursor: pointer"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 h-100">
                            <div class="row h-50">
                                <div class="col-12 h-100">
                                    <div class="d-flex justify-content-center align-items-center h-100">
                                        <div class="card h-100 w-100" style="box-shadow: none;">
                                            <img class="img rounded mx-auto my-auto no-shadow"
                                                :src="challenge.getExerciseOptions()[2]"
                                                alt="Card image cap"
                                                type="submit"
                                                style="max-height: 95%; max-width:95%; background-color: transparent !important; cursor: pointer"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row h-50">
                                <div class="col-12 h-100">
                                    <div class="d-flex justify-content-center align-items-center h-100">
                                        <div class="card h-100" style="box-shadow: none;">
                                            <img class="img rounded mx-auto my-auto no-shadow"
                                                :src="challenge.getExerciseOptions()[3]"
                                                alt="Card image cap"
                                                type="submit"
                                                style="max-height: 95%; max-width:95%; background-color: transparent !important; cursor: pointer"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <div class="form-group label-floating has-info">
                                <label class="control-label">Your Answer</label>
                                      <input id="answer-input" type="text" class="form-control" />
                                <span class="form-control-feedback">
                                <i class="material-icons">done</i>
                                </span>
                            </div>
                            <div class="btn btn-info d-block btn-round" @click.prevent="$emit('submit-answer-event', getSubmittedAnswer()); cleanInput();">Submit</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
`
})
