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
        console.log("user has chosen challenge with index: ", chosenChallengeIndex);
        return chosenChallengeIndex;
      },
  },
  template: `
    <div  class="card mt-5 mx-auto d-flex" style="min-height: 80vh; width: 60vw">
        <div class="card-header card-header-icon card-header-info">
            <div class="card-text">
                <h4 class="card-title text-center">Choose Your Challenge</h4>
            </div>
        </div>

        <div class="card-body h-100 align-items-center d-flex justify-content-center mt-3">
            <div class="row h-100">
                <div class="col-12 h-100">
                    <div class="row h-75">
                        <div class="col-2 h-100 my-auto"></div>
                        <div class="col-8 h-100 my-auto">
                            <div class="row h-100">
                                <div class="col-1 h-100 my-auto mx-auto">
                                    <a class="carousel-control-prev" href="#challengesCarousel" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true" style="filter: invert(0.4)"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </div>
                                <div class="col-10 h-100 my-auto mx-auto">
                                    <div id="challengesCarousel" class="carousel slide h-100 my-auto" data-ride="carousel">
                                        <div class="carousel-inner h-100 my-auto">
                                            <div class="carousel-item active h-100 mx-auto my-auto">
                                                <div class="card h-100 mx-auto"
                                                    role="tab" data-toggle="tab"
                                                    style="box-shadow: none;"
                                                    >
                                                    <div class="d-flex flex-row">
                                                    <div class="d-flex flex-column align-center flex-wrap">
                                                        <img class="card-img-top mx-auto my-auto"
                                                            src="img/test/testImage.jpeg"
                                                            alt="Card image cap"
                                                            style="max-height: 200px; max-width: 200px"
                                                        >
                                                            <h5 class="card-title text-info text-center d-inline-block">Challenge Three</h5>
                                                            <div class="card-body">
                                                                <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="carousel-item h-100 mx-auto my-auto">
                                                <div class="card h-100 mx-auto"
                                                    role="tab" data-toggle="tab"
                                                    style="box-shadow: none;"
                                                    >
                                                    <div class="d-flex flex-row">
                                                    <div class="d-flex flex-column align-center flex-wrap">
                                                        <img class="card-img-top mx-auto my-auto"
                                                            src="img/test/testImage.jpeg"
                                                            alt="Card image cap"
                                                            style="max-height: 200px; max-width: 200px"
                                                        >
                                                            <h5 class="card-title text-info text-center d-inline-block">Challenge Two</h5>
                                                            <div class="card-body">
                                                                <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="carousel-item h-100 mx-auto my-auto">
                                                <div class="card h-100 mx-auto"
                                                    role="tab" data-toggle="tab"
                                                    style="box-shadow: none;"
                                                    >
                                                    <div class="d-flex flex-row">
                                                    <div class="d-flex flex-column align-center flex-wrap">
                                                        <img class="card-img-top mx-auto my-auto"
                                                            src="img/test/testImage.jpeg"
                                                            alt="Card image cap"
                                                            style="max-height: 200px; max-width: 200px"
                                                        >
                                                            <h5 class="card-title text-info text-center d-inline-block">Challenge Three</h5>
                                                            <div class="card-body">
                                                                <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                                            </div>
                                                        </div>
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
