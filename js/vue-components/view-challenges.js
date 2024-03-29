var ViewChallenges = Vue.component('view-challenges', {
  data: function () {
    return {
    }
  },
  model: {

  },
  methods: {
      getChosenChallengeIndex(){
        let chosenChallengeIndex = $('div.carousel-item.active').index();
        return chosenChallengeIndex;
      },
  },
  template: `
    <div  class="card mt-3 w-100 d-flex" style="min-height: 80vh; width: 60vw">
        <div class="card-header card-header-icon card-header-info">
            <div class="card-text">
                <h4 class="card-title text-center">Choose Your Challenge</h4>
            </div>
        </div>

        <div class="card-body w-100 align-items-center d-flex justify-content-center h-100 mt-3">
            <div class="row w-100 h-100">
                <div class="col-12 w-100 h-100">
                    <div class="row w-100 mx-auto h-75">
                        <div class="col-2 h-100"></div>
                        <div class="col-8 w-100 mx-auto h-100">
                            <div class="row w-100 mx-auto h-100">
                                <div class="col-1 h-100 my-auto mx-auto">
                                    <a class="carousel-control-prev" href="#challengesCarousel" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true" style="filter: invert(0.4)"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </div>
                                <div class="col-10 w-100 mx-auto">
                                    <div id="challengesCarousel" class="carousel slide mx-auto h-100" data-ride="carousel">
                                        <div class="carousel-inner w-100 h-100 mx-auto my-auto">
                                            <div class="carousel-item active my-auto w-100 h-100">
                                                <div class="card mx-auto text-center"
                                                    role="tab" data-toggle="tab"
                                                    style="box-shadow: none; min-height: 350px"
                                                    >

                                                        <img class="text-center mx-auto"
                                                            src="img/challenges/choice.png"
                                                            alt="Card image cap"
                                                            style="max-height: 200px; max-width: 200px"
                                                        >
                                                        <h5 class="card-title text-info text-center">What's the right meaning?</h5>
                                                        <div class="card-body">
                                                            <div class="card-text text-center">Given a word and a usage example, identify the meaning of the word in the provided usage context.</div>
                                                        </div>

                                                </div>
                                            </div>
                                            <div class="carousel-item w-100 h-100">
                                                <div class="card mx-auto text-center"
                                                    role="tab" data-toggle="tab"
                                                    style="box-shadow: none; min-height: 350px"
                                                    >

                                                        <img class="text-center mx-auto"
                                                            src="img/challenges/papyrus.png"
                                                            alt="Card image cap"
                                                            style="max-height: 200px; max-width: 200px"
                                                        >
                                                        <h5 class="card-title text-info text-center">Creative writing!</h5>
                                                        <div class="card-body">
                                                            <div class="card-text text-center">Given a word and its meaning, write a sentence that uses the word in the right context.</div>
                                                        </div>

                                                </div>
                                            </div>
                                            <div class="carousel-item w-100 h-100">
                                                <div class="card mx-auto text-center"
                                                    role="tab" data-toggle="tab"
                                                    style="box-shadow: none; min-height: 350px"
                                                    >

                                                        <img class="text-center mx-auto"
                                                            src="img/challenges/gallery.png"
                                                            alt="Card image cap"
                                                            style="max-height: 200px; max-width: 200px"
                                                        >
                                                        <h5 class="card-title text-info text-center">Four images, one word!</h5>
                                                        <div class="card-body">
                                                            <div class="card-text text-center">Look at the four images and identify the word they represent.</div>
                                                        </div>

                                                </div>
                                            </div>
                                        </div>



                                        <ol class="carousel-indicators my-auto mt-3">
                                            <li data-target="#challengesCarousel" data-slide-to="0" class="active"></li>
                                            <li data-target="#challengesCarousel" data-slide-to="1"></li>
                                            <li data-target="#challengesCarousel" data-slide-to="2"></li>
                                        </ol>

                                    </div>
                                </div>
                                <div class="col-1 h-100 mx-auto my-auto">
                                    <a class="carousel-control-next" href="#challengesCarousel" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true" style="filter: invert(0.4)"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 h-100 my-auto"></div>
                    </div>
                    <div class="row h-25">
                        <div class="col-1 h-100 my-auto"></div>
                        <div class="col-10 h-100 my-auto text-center">
                            <button type="button" class="btn btn-info btn-round btn-block"
                                @click.prevent="$emit('create-challenge-event', getChosenChallengeIndex())"
                                >START</button>
                        </div>
                        <div class="col-1 h-100 my-auto"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
})
