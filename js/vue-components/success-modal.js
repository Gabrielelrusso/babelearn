var SuccessModal = Vue.component('success-modal',{
    data: function () {
      return {}
    },
    template: `
      <div class="modal fade mt-5" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-success text-light text-center d-flex flex-row flex-wrap align-content-center">
              <h2 class="text-center" id="successModalLabel">BRAVO!</h2>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="offset-3 col-6 d-flex flex-column justify-content-around">
                      <button @click="$emit('go-to-main-menu-event')" class="btn btn-info btn-round" data-dismiss="modal">
                        MAIN MENU
                      </button>
                      <button @click="$emit('go-to-challenges-menu-event')" class="btn btn-warning btn-round" data-dismiss="modal">
                        CHANGE CHALLENGE
                      </button>
                      <button @click="$emit('play-again-event')" class="btn btn-primary btn-round mt-5" data-dismiss="modal">
                        NEW EXERCISE
                      </button>
                </div>
                <div class="col-3">
                    <img class=""
                          src="img/doggos/happy-doggo.png"
                          style="position: absolute; max-width: 200px; margin-top: -50%"
                      >
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    `
  }
)
