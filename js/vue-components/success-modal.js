var SuccessModal = Vue.component('success-modal',{
    data: function () {
      return {}
    },
    template: `
      <div class="modal fade mt-5" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content text-center">
            <div class="modal-header bg-success text-light text-center d-flex flex-row flex-wrap align-content-center">
              <h2 class="text-center" id="successModalLabel">BRAVO!</h2>
<!--              <img class="img-fluid"-->
<!--                  src="img/doggos/happy-doggo.png"-->
<!--                  alt="Bravo doggo!"-->
<!--                  style="max-width: 150px;"-->
<!--              >-->
            </div>
            <div class="modal-body offset-3 col-6 d-flex flex-column justify-content-around">
              <button @click="$emit('change-view-event','view-home')" class="btn btn-info btn-round">
                MAIN MENU
              </button>
              <button @click="$emit('change-view-event','view-home')" class="btn btn-warning btn-round">
                CHANGE CHALLENGE
              </button>
              <button @click="$emit('change-view-event','view-home')" class="btn btn-success btn-round mt-5">
                AGAIN!
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  }
)
