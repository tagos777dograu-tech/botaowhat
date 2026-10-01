/* global TrelloPowerUp */

var ICON = new URL('./icon.svg', window.location.href).href;

TrelloPowerUp.initialize({
  'card-buttons': function (t) {
    // Lê o contato salvo neste cartão
    return t.get('card', 'shared', 'telefone').then(function (telefone) {
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
          callback: function (t) {
            return t.popup({
              title: 'Abrir WhatsApp',
              url: './abrir.html',
              height: 120,
            });
          },
        },
        botaoEditar,
      ];
    });
  },
});
