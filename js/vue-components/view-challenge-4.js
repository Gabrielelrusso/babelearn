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
                <h4 class="card-title text-xl-center">Challenge 4</h4>
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
                    <div class="row" style="height: 50vh">
                        <div class="col-6 h-100">
                            <div class="row h-50">
                                <div class="col-12 h-100">
                                    <div class="d-flex justify-content-center align-items-center h-100">
                                        <div class="card h-100 w-100" style="box-shadow: none;">
                                            <img class="img rounded mx-auto my-auto no-shadow"
                                                src="https://images.photowall.com/products/55279/desert-sand-dunes.jpg?h=699&q=85"
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
                                                src="https://images.theconversation.com/files/307544/original/file-20191217-58292-121izfm.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
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
                                                src="https://media.istockphoto.com/photos/starfish-on-the-summer-beach-summer-background-tropical-sand-beach-picture-id1151025999"
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
                                                src="https://www.elsevier.com/__data/assets/image/0008/199205/Chemistry-summer-image.jpg"
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
