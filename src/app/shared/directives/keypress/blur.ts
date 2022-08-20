export function blurLimpaNomes(evento: any) {
  var palavra = evento.target.value.trim();
  while (palavra.includes('  ')) {
    palavra = palavra.replace('  ', ' ');
  }
  while (palavra.startsWith('-')) {
    palavra = palavra.replace(palavra[0], '');
  }
  while (palavra.includes('--')) {
    palavra = palavra.replace('--', '-');
  }
  while (palavra.endsWith('-')) {
    palavra = palavra.slice(0, -1);
  }
  while (palavra.includes(' -') || palavra.includes('- ')) {
    if (palavra.includes(' -')) {
      palavra = palavra.replace(' -', '-');
    }
    if (palavra.includes('- ')) {
      palavra = palavra.replace('- ', '-');
    }
  }
  palavra = palavra.trim();
  return palavra;
}

export function blurLimparIdsAutores(evento: any) {
  var palavra = evento.target.value.trim();
  while (palavra.startsWith(',')) {
    palavra = palavra.replace(palavra[0], '');
  }
  while (palavra.includes(',,')) {
    palavra = palavra.replace(',,', ',');
  }
  while (palavra.endsWith(',')) {
    palavra = palavra.slice(0, -1);
  }
  palavra = palavra.trim();
  return palavra;
}

export function blurLimparZeroAEsquerda(evento: any) {
  let palavra = evento.target.value.toString();
  palavra = palavra.replace(/^0+/, '');

  if (palavra) {
    return palavra;
  } else {
    return '';
  }
}
