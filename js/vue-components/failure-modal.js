var FailureModal = Vue.component('failure-modal',{
    data: function () {
      return {}
    },
    template: `
      <div class="modal fade mt-5" id="failureModal" tabindex="-1" role="dialog" aria-labelledby="failureModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content text-center">
            <div class="modal-header bg-danger text-light text-center d-flex flex-row flex-wrap align-content-center">
              <h2 class="text-center" id="successModalLabel">UPS!</h2>
            </div>
            <div class="modal-body offset-3 col-6 d-flex flex-column justify-content-around">
              <button @click="$emit('go-to-main-menu-event')" class="btn btn-info btn-round" data-dismiss="modal">
                MAIN MENU
              </button>
              <button @click="$emit('go-to-challenges-menu-event')" class="btn btn-warning btn-round" data-dismiss="modal">
                CHANGE CHALLENGE
              </button>
              <button @click="$emit('play-again-event')" class="btn btn-primary btn-round mt-5" data-dismiss="modal">
                NEW EXERCISE
              </button>
              <button class="btn btn-success btn-round" data-dismiss="modal">
                RETRY!
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  }
)
