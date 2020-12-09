var ViewChallenges = Vue.component('view-challenges', {
  data: function () {
    return {}
  },
  template: `
    <div>
        <div class="card-header card-header-icon card-header-info">
            <div class="card-text">
              <h4 class="card-title text-xl-center">Choose Your Challenge</h4>
            </div>
        </div>
        <div class="card-body">
            <div class="row h-100">
                <div class="col-12 my-auto">
                  <div class="row my-lg-3">
                    <ul class="nav nav-pills nav-pills-icons nav-pills-info mx-auto" role="tablist">
                        <!--
                                        color-classes: "nav-pills-primary", "nav-pills-info", "nav-pills-success", "nav-pills-warning","nav-pills-danger"
                                    -->
                        <li class="nav-item" style="max-width: 30%; min-height: 60%; max-height: 80%">
                          <div class="card nav-link active" href="#dashboard-1" role="tab" data-toggle="tab">
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
                        <li class="nav-item ml-auto" style="max-width: 30%; min-height: 60%; max-height: 80%">
                          <div class="card nav-link" href="#schedule-1" role="tab" data-toggle="tab">
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
                        <li class="nav-item ml-auto" style="max-width: 30%; min-height: 60%; max-height: 80%">
                          <div class="card nav-link" href="#tasks-1" role="tab" data-toggle="tab">
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
                    <div class="row">
                        <div class="col">
                              <button
                                @click="$emit(\'change-view-event\',\'view-home\')" type="submit">
                                BACK TO PREVIOUS VIEW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



`
})
