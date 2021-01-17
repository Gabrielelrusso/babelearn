var ViewChallenge2 = Vue.component('view-challenge-2', {
  data: function () {
    return {
    }
  },
  props:{
    challenge:Object,
    game_metadata: Object
  },
  watch: {
      challenge: function(newChallenge, oldChallenge) {
          this.challenge = newChallenge;
      }

  },
  methods: {
      getSubmittedAnswer(){
          let answer = $("#answer-input").val();
          return answer;
      },
      cleanInput(){
          $("#answer-input").val("");
      },
      showWrongAnswerInfo: function(){
        return this.game_metadata.answered && !this.game_metadata.rightAnswered;
      }
  },
  template: `
    <div  class="card mt-3 w-100 mx-auto d-flex" style="min-height: 80vh; width: 60vw">
        <div class="card-header card-header-icon card-header-info">
            <div class="card-text">
                <h4 class="card-title text-xl-center">Creative writing!</h4>
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
                    <div class="row">
                      <div class="col-12">
                          <h6>YOU ARE PLAYING WITH THE WORD</h6>
                          <h3><strong class="text-info">{{ challenge.getWordInGameLang() }}</strong></h3>
                          <h6>OR A SYNONIM</h6>
                      </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <h6>WITH MEANING</h6>
                            <h3>{{ challenge.getExerciseMain()}}</h3>
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
                        </div>
                    </div>
                    <div class="row" v-if="showWrongAnswerInfo()">
                        <div class="col-12 text-center">
                            <div class="alert alert-danger d-inline-block text-center">
                                <div class="container-fluid">
                                    <div class="alert-icon">
                                        <i class="material-icons">error_outline</i>
                                    </div>
                                    You used {{challenge.getWord()}} in the following wrong sense
                                </div>
                            </div>
                            <div class="card-text">
                                <h4>{{ challenge.getExerciseWrongAnswerInfo()}}</h4>
                            </div>
                        </div>

                    </div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <div class="btn btn-info d-block btn-round" @click.prevent="$emit('submit-answer-event', getSubmittedAnswer()); cleanInput();">Submit</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>



`
})
