class AbrigoAnimais {
  #animais = {
    Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
    Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
    Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
    Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
    Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
    Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
    Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'], ordemLivre: true },
  };

  #brinquedosValidos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'];

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1 = brinquedosPessoa1.split(',').map(b => b.trim());
    const brinquedos2 = brinquedosPessoa2.split(',').map(b => b.trim());
    const animais = ordemAnimais.split(',').map(a => a.trim());

    const todosBrinquedos = [...brinquedos1, ...brinquedos2];
    if (todosBrinquedos.some(b => !this.#brinquedosValidos.includes(b))) {
      return { erro: 'Brinquedo inválido' };
    }

    if (brinquedos1.length !== new Set(brinquedos1).size || 
        brinquedos2.length !== new Set(brinquedos2).size) {
      return { erro: 'Brinquedo inválido' };
    }

    if (animais.some(a => !this.#animais[a]) || 
        animais.length !== new Set(animais).size) {
      return { erro: 'Animal inválido' };
    }

    let animaisPessoa1 = 0;
    let animaisPessoa2 = 0;
    const resultado = [];

    for (const animal of animais) {
      const { tipo, brinquedos, ordemLivre } = this.#animais[animal];
      const apto1 = this.#podeAdotar(brinquedos1, brinquedos, ordemLivre);
      const apto2 = this.#podeAdotar(brinquedos2, brinquedos, ordemLivre);
      let destino = 'abrigo';

      if (tipo === 'gato') {
        if (apto1 && !apto2 && animaisPessoa1 < 3) {
          destino = 'pessoa 1';
          animaisPessoa1++;
        } else if (!apto1 && apto2 && animaisPessoa2 < 3) {
          destino = 'pessoa 2';
          animaisPessoa2++;
        }
      } else if (animal === 'Loco') {
        if (apto1 && animaisPessoa1 > 0 && animaisPessoa1 < 3) {
          destino = 'pessoa 1';
          animaisPessoa1++;
        } else if (apto2 && animaisPessoa2 > 0 && animaisPessoa2 < 3) {
          destino = 'pessoa 2';
          animaisPessoa2++;
        }
      } else {
        if (apto1 && !apto2 && animaisPessoa1 < 3) {
          destino = 'pessoa 1';
          animaisPessoa1++;
        } else if (!apto1 && apto2 && animaisPessoa2 < 3) {
          destino = 'pessoa 2';
          animaisPessoa2++;
        }
      }

      resultado.push(`${animal} - ${destino}`);
    }

    return { lista: resultado.sort() };
  }

  #podeAdotar(brinquedosPessoa, brinquedosAnimal, ordemLivre) {
    if (ordemLivre) {
      return brinquedosAnimal.every(b => brinquedosPessoa.includes(b));
    }
    let posicaoAtual = -1;
    for (const brinquedo of brinquedosAnimal) {
      const posicao = brinquedosPessoa.indexOf(brinquedo);
      if (posicao === -1 || posicao < posicaoAtual) return false;
      posicaoAtual = posicao;
    }
    return true;
  }
}

export { AbrigoAnimais as AbrigoAnimais };