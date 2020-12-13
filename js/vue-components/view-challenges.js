var ViewChallenges = Vue.component('view-challenges', {
  data: function () {
    return {}
  },
  template: `
    <div  class="card mt-5 mx-auto d-flex" style="min-height: 80vh; width: 60vw">
        <div class="card-header card-header-icon card-header-info">
            <div class="card-text h-100">
                <div class="row h-100">
                    <div class="col-12 h-100 my-auto">
                        <img class="img mx-auto my-auto no-shadow float-left"
                            src="https://www.pngrepo.com/download/181385/left-arrow-arrows.png"
                            alt="Card image cap"
                            @click="$emit(\'change-view-event\',\'view-home\')"
                            type="submit"
                            style="max-height: 30px; max-width: 40px; background-color: transparent !important; cursor: pointer"
                        >

                        <h4 class="card-title text-center my-auto">Choose Your Challenge</h4>
                    </div>

                </div>
            </div>
        </div>
        <div class="card-body h-100 align-items-center d-flex justify-content-center">
            <div class="row h-100">
                <div class="col-12 h-100">
                    <div class="row h-75">
                        <div class="col-2 h-100 my-auto"></div>
                        <div class="col-8 h-100 my-auto">
                            <div class="row h-100">
                                <div class="col-1 h-100 my-auto mx-auto">
                                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true" style="filter: invert(0.4)"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </div>
                                <div class="col-10 h-100 my-auto mx-auto">
                                    <div id="carouselExampleIndicators" class="carousel slide h-100 my-auto" data-ride="carousel">
                                        <div class="row h-75">
                                            <div class="col h-100 my-auto">
                                                <div class="carousel-inner h-100 my-auto">
                                                    <div class="carousel-item active h-100 mx-auto my-auto">
                                                        <div class="card h-100 mx-auto" role="tab" data-toggle="tab" style="box-shadow: none">
                                                            <div class="d-flex align-items-center h-50">
                                                                <img class="card-img-top mx-auto my-auto"
                                                                    src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"
                                                                    alt="Card image cap"
                                                                    style="max-height: 120px; max-width: 120px;"
                                                                >

                                                            </div>
                                                            <div class="d-flex align-items-center justify-content-center h-25">
                                                                <h5 class="card-title text-info d-block">Challenge One</h5>
                                                            </div>
                                                            <div class="d-flex align-items-center h-25">
                                                                <div class="card-body d-block">
                                                                    <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div class="carousel-item h-100 mx-auto my-auto">
                                                        <div class="card h-100 mx-auto" role="tab" data-toggle="tab" style="box-shadow: none">
                                                            <div class="d-flex align-items-center h-50">
                                                                <img class="card-img-top mx-auto my-auto"
                                                                    src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"
                                                                    alt="Card image cap"
                                                                    style="max-height: 120px; max-width: 120px;"
                                                                >

                                                            </div>
                                                            <div class="d-flex align-items-center justify-content-center h-25">
                                                                <h5 class="card-title text-info d-block">Challenge Two</h5>
                                                            </div>
                                                            <div class="d-flex align-items-center h-25">
                                                                <div class="card-body d-block">
                                                                    <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div class="carousel-item h-100 mx-auto my-auto">
                                                        <div class="card h-100 mx-auto" role="tab" data-toggle="tab" style="box-shadow: none">
                                                            <div class="d-flex align-items-center h-50">
                                                                <img class="card-img-top mx-auto my-auto"
                                                                    src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"
                                                                    alt="Card image cap"
                                                                    style="max-height: 120px; max-width: 120px;"
                                                                >

                                                            </div>
                                                            <div class="d-flex align-items-center justify-content-center h-25">
                                                                <h5 class="card-title text-info d-block">Challenge Three</h5>
                                                            </div>
                                                            <div class="d-flex align-items-center h-25">
                                                                <div class="card-body d-block">
                                                                    <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row h-25">
                                            <div class="col h-100 my-auto">
                                                <ol class="carousel-indicators my-auto">
                                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-1 h-100 mx-auto my-auto">
                                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
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
                            <button type="button" class="btn btn-info btn-sm btn-round btn-block">START</button>
                        </div>
                        <div class="col-1 h-100 my-auto"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
})
