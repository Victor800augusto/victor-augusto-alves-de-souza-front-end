export function keypressApenasNumeros(e: KeyboardEvent) {
  var code = e.which;
  if(code == 13){
    return;
  }
  if (!(code >= 48 && code <= 57)) {
    e.preventDefault();
  }
}

export function keypressIdsAutores(e: KeyboardEvent) {
  var code = e.which;
  if(code == 13){
    return;
  }
  if (!(code >= 48 && code <= 57) && code != 44) {
    e.preventDefault();
  }
}
