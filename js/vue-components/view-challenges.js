var ViewChallenges = Vue.component('view-challenges', {
  data: function () {
    return {}
  },
  template: `


  <div class="row h-100">
    <div class="col-12 my-auto">
        <div class="row">
            <div class="col">
                Choose Your Challenge
            </div>
        </div>
        <div class="row my-lg-3">
            <ul class="nav nav-pills nav-pills-icons nav-pills-info mx-auto" role="tablist">
                <!--
                                color-classes: "nav-pills-primary", "nav-pills-info", "nav-pills-success", "nav-pills-warning","nav-pills-danger"
                            -->
                <li class="nav-item">
                  <a class="nav-link active" href="#dashboard-1" role="tab" data-toggle="tab">
                    <i class="material-icons">dashboard</i>
                    Challenge One
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#schedule-1" role="tab" data-toggle="tab">
                    <i class="material-icons">schedule</i>
                    Challenge Two
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#tasks-1" role="tab" data-toggle="tab">
                    <i class="material-icons">list</i>
                    Challenge Three
                  </a>
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
`
})
