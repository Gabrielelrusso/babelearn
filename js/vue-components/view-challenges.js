var ViewChallenges = Vue.component('view-challenges', {
  data: function () {
    return {}
  },
  template: `
    <div class="h-100">
        <div class="card-header card-header-icon card-header-info">
            <div class="card-text">
                <div class="row h-25">
                    <div class="col-1 h-100">
                        <img class="img mx-auto no-shadow"
                            src="https://www.pngrepo.com/download/181385/left-arrow-arrows.png"
                            alt="Card image cap"
                            @click="$emit(\'change-view-event\',\'view-home\')"
                            type="submit"
                            style="max-height: 30px; max-width: 40px; background-color: transparent !important; cursor: pointer"
                        >
                    </div>
                    <div class="col-11 h-100 my-auto">
                        <h4 class="card-title text-xl-center">Choose Your Challenge</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body h-100">
            <div class="row h-100">
                <div class="col-12 my-auto h-100">
                    <div class="row h-75">
                        <div class="col-12 h-100 my-auto">
                            <ul class="nav nav-pills nav-pills-icons nav-pills-info mx-auto h-100 d-flex" role="tablist" style="justify-content: space-between">
                        <!--
                                        color-classes: "nav-pills-primary", "nav-pills-info", "nav-pills-success", "nav-pills-warning","nav-pills-danger"
                                    -->
                                <li class="nav-item" style="max-width: 30%;">
                                    <div class="card nav-link active" role="tab" data-toggle="tab">
                                        <img class="card-img-top img-circle mx-auto"
                                            src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"
                                            alt="Card image cap"
                                            style="max-height: 60px; max-width: 60px; margin-top: -40px"
                                        >
                                        Challenge One
                                        <div class="card-body">
                                            <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                        </div>
                                    </div>
                                </li>
                                <li class="nav-item" style="max-width: 30%;">
                                    <div class="card nav-link" role="tab" data-toggle="tab">
                                        <img class="card-img-top img-circle mx-auto"
                                            src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"
                                            alt="Card image cap"
                                            style="max-height: 60px; max-width: 60px; margin-top: -40px"
                                        >
                                        Challenge Two
                                        <div class="card-body">
                                            <div class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                                        </div>
                                    </div>
                                </li>
                                <li class="nav-item" style="max-width: 30%;">
                                    <div class="card nav-link" role="tab" data-toggle="tab">
                                        <img class="card-img-top img-circle mx-auto"
                                            src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"
                                            alt="Card image cap"
                                            style="max-height: 60px; max-width: 60px; margin-top: -40px"
                                        >
                                        Challenge Three
                                        <div class="card-body">
                                            <div class="card-text">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row h-25">
                        <div class="col-1"></div>
                        <div class="col-10 h-100 my-auto text-center">
                            <button type="button" class="btn btn-info btn-sm btn-round btn-block">START</button>
                        </div>
                        <div class="col-1"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
})
