function abreModal(id) {
  var criaModal = new bootstrap.Modal(document.getElementById(id));
  criaModal.show();
}

function adicionaEventoSairNaModalComDestino(modalId, router, destino) {
  modal = document.getElementById(modalId);
  modal.addEventListener("hidden.bs.modal", function (event) {
    router.navigate([destino]);
  });
}
