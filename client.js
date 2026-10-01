/* global TrelloPowerUp */

var ICON = new URL('./icon.svg', window.location.href).href;

// Monta o link do WhatsApp: https://wa.me/5527999998888?text=Ola
function montarLink(telefone, mensagem) {
  var link = 'https://wa.me/' + telefone;
  if (mensagem) {
    link += '?text=' + encodeURIComponent(mensagem);
  }
  return link;
}

TrelloPowerUp.initialize({
  'card-buttons': function (t) {
    // Lê o contato salvo neste cartão
    return Promise.all([
      t.get('card', 'shared', 'telefone'),
      t.get('card', 'shared', 'mensagem'),
    ]).then(function (dados) {
      var telefone = dados[0];
      var mensagem = dados[1];

      var botaoEditar = {
        icon: ICON,
        text: telefone ? 'Editar contato' : 'Definir contato',
        callback: function (t) {
          return t.popup({
            title: 'Contato do WhatsApp',
            url: './editar.html',
            height: 230,
          });
        },
      };

      // Sem contato salvo: só mostra o botão para definir
      if (!telefone) {
        return [botaoEditar];
      }

      // Com contato salvo: botão que abre a conversa + botão de editar
      return [
        {
          icon: ICON,
          text: 'Abrir WhatsApp',
          url: montarLink(telefone, mensagem),
          target: 'Abrir WhatsApp',
        },
        botaoEditar,
      ];
    });
  },
});
