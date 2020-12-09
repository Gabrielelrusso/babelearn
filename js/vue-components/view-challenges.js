var ViewChallenges = Vue.component('view-challenges', {
  data: function () {
    return {}
  },
  template: `
    <div>
        <div class="card-title">
        </div>
        <div class="card-body">
            <div class="row h-100">
                <div class="col-12 my-auto">
                  <div class="row">
                      <div class="col">
                          Choose Your Challenge
                      </div>
                  </div>
                  <div class="row">
                    <ul class="nav nav-pills nav-pills-icons nav-pills-info" role="tablist">
                        <!--
                                        color-classes: "nav-pills-primary", "nav-pills-info", "nav-pills-success", "nav-pills-warning","nav-pills-danger"
                                    -->
                        <li class="nav-item" style="max-width: 30%">
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
                        <li class="nav-item">
                          <div class="card nav-link" href="#schedule-1" role="tab" data-toggle="tab" style="margin-top: 30px; padding-top: 30px">
                            <img class="card-img-top img-circle rounded-circle"
                                src="https://www.flaticon.com/svg/static/icons/svg/3869/3869355.svg"
                                alt="Card image cap"
                                style="max-width: 60px; position:absolute; top: -30px"
                            >
                            <div class="card-body card-block">
<!--                               <i class="material-icons">schedule</i>-->
                            </div>
                            Challenge Two
                          </div>
                        </li>
                        <li class="nav-item">
                          <div class="card nav-link" href="#tasks-1" role="tab" data-toggle="tab">
                            <div class="card-body">
                                <i class="material-icons">list</i>
                            </div>
                            Challenge Three
                          </div>
                        </li>
                      </ul>
                      <div class="tab-content tab-space">
                        <div class="tab-pane active" id="dashboard-1">
                          Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                          <br><br>
                          Dramatically visualize customer directed convergence without revolutionary ROI.
                        </div>
                        <div class="tab-pane" id="schedule-1">
                          Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
                          <br><br>Dramatically maintain clicks-and-mortar solutions without functional solutions.
                        </div>
                        <div class="tab-pane" id="tasks-1">
                          Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                          <br><br>Dynamically innovate resource-leveling customer service for state of the art customer service.
                        </div>
                      </div>
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
