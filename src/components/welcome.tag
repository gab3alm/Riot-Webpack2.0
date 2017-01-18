<welcome>
  <!-- HTML -->
  <div class="container">
    <h1 class="element">hi!</h1>
  </div>
    



  <!-- SCRIPTS -->
  <script>
    import 'welcome.scss';
    this.on('mount', function(){
      var $node = $(this.root);
      $node.find('.element').hide().fadeIn(2000);
    });
  </script>
</welcome>