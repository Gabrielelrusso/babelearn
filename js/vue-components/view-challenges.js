var ViewChallenges = Vue.component('view-challenges', {
  data: function () {
    return {}
  },
  template: `
    <div class="h-100">
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
        <div class="card-body h-100 my-3">
            <div class="row h-100">
                <div class="col-12 my-auto h-100">
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
                                        <div class="row h-100">
                                            <div class="col h-100 my-auto">
                                                <div class="carousel-inner h-100 my-auto">
                                                    <div class="carousel-item active h-100 mx-auto my-auto">
                                                        <div class="card nav-link active h-100 mx-auto my-auto" role="tab" data-toggle="tab" style="box-shadow: none">
                                                            <img class="card-img-top mx-auto"
                                                                src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"
                                                                alt="Card image cap"
                                                                style="max-height: 120px; max-width: 120px;"
                                                            >
                                                            <h5 class="card-title text-center text-info">Challenge One</h5>
                                                            <div class="card-body">
                                                                <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="carousel-item h-100 mx-auto my-auto">
                                                        <div class="card nav-link h-100 mx-auto my-auto" role="tab" data-toggle="tab" style="box-shadow: none">
                                                            <img class="card-img-top mx-auto"
                                                                src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"
                                                                alt="Card image cap"
                                                                style="max-height: 120px; max-width: 120px;"
                                                            >
                                                            <h5 class="card-title text-center text-info">Challenge Two</h5>
                                                            <div class="card-body">
                                                                <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="carousel-item h-100 mx-auto my-auto">
                                                        <div class="card nav-link h-100 mx-auto my-auto" role="tab" data-toggle="tab" style="box-shadow: none">
                                                            <img class="card-img-top mx-auto"
                                                                src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"
                                                                alt="Card image cap"
                                                                style="max-height: 120px; max-width: 120px;"
                                                            >
                                                            <h5 class="card-title text-center text-info">Challenge Three</h5>
                                                            <div class="card-body">
                                                                <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
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

<!--                            <ul class="nav nav-pills nav-pills-icons nav-pills-info mx-auto h-100 d-flex" role="tablist" style="justify-content: space-between">-->
<!--                        &lt;!&ndash;-->
<!--                                        color-classes: "nav-pills-primary", "nav-pills-info", "nav-pills-success", "nav-pills-warning","nav-pills-danger"-->
<!--                                    &ndash;&gt;-->
<!--                                <li class="nav-item h-100" style="max-width: 30%;">-->
<!--                                    <div class="card nav-link active h-100" role="tab" data-toggle="tab">-->
<!--                                        <img class="card-img-top img-circle mx-auto"-->
<!--                                            src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"-->
<!--                                            alt="Card image cap"-->
<!--                                            style="max-height: 60px; max-width: 60px; margin-top: -40px"-->
<!--                                        >-->
<!--                                        Challenge One-->
<!--                                        <div class="card-body">-->
<!--                                            <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </li>-->
<!--                                <li class="nav-item h-100" style="max-width: 30%;">-->
<!--                                    <div class="card nav-link h-100" role="tab" data-toggle="tab">-->
<!--                                        <img class="card-img-top img-circle mx-auto"-->
<!--                                            src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"-->
<!--                                            alt="Card image cap"-->
<!--                                            style="max-height: 60px; max-width: 60px; margin-top: -40px"-->
<!--                                        >-->
<!--                                        Challenge Two-->
<!--                                        <div class="card-body">-->
<!--                                            <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </li>-->
<!--                                <li class="nav-item h-100" style="max-width: 30%;">-->
<!--                                    <div class="card nav-link h-100" role="tab" data-toggle="tab">-->
<!--                                        <img class="card-img-top img-circle mx-auto"-->
<!--                                            src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"-->
<!--                                            alt="Card image cap"-->
<!--                                            style="max-height: 60px; max-width: 60px; margin-top: -40px"-->
<!--                                        >-->
<!--                                        Challenge Three-->
<!--                                        <div class="card-body">-->
<!--                                            <div class="card-text">-->
<!--                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </li>-->
<!--                            </ul>-->
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
