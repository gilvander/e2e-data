(function () {
  try {
    var root = document.documentElement;
    var parentRoot = window.parent && window.parent.document ? window.parent.document.documentElement : null;

    function apply() {
      var isDark = parentRoot && parentRoot.getAttribute('data-theme') === 'dark';
      root.setAttribute('data-md-color-scheme', isDark ? 'slate' : 'default');
    }

    apply();

    if (parentRoot) {
      var obs = new MutationObserver(apply);
      obs.observe(parentRoot, { attributes: true, attributeFilter: ['data-theme'] });
    }
  } catch (e) {
    // noop
  }
})();
