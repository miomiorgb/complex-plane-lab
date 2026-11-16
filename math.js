/* Local TeX rendering. Both typesetting code and fonts ship with the site. */
(() => {
  'use strict';
  const errors = window.ComplexLabMathErrors = [];
  const options = { throwOnError: true, trust: false, strict: 'warn', output: 'htmlAndMathml' };
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  window.ComplexLabMathHTML = (tex, display = true) => {
    try {
      return '<span class="math-formula">' + window.katex.renderToString(String(tex), {...options, displayMode: display}) + '</span>';
    } catch (error) {
      errors.push({tex: String(tex), message: error.message});
      return '<span class="math-error">' + escape(tex) + '</span>';
    }
  };
  window.ComplexLabTypeset = (root = document.body) => {
    if (!root || !window.renderMathInElement) return;
    window.renderMathInElement(root, {
      ...options,
      delimiters: [
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      ignoredTags: ['script','noscript','style','textarea','pre','code','option','svg'],
      ignoredClasses: ['katex','katex-display','math-formula','math-error'],
      errorCallback: (message, error) => errors.push({message, error: String(error)})
    });
  };
  let scheduled = false;
  const observer = new MutationObserver(records => {
    if (scheduled || !records.some(record => {
      const parent = record.target.nodeType === 1 ? record.target : record.target.parentElement;
      return parent && !parent.closest('.katex,.math-formula,svg') &&
        [...record.addedNodes].some(node => /\\[([]/.test(node.textContent || ''));
    })) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      window.ComplexLabTypeset();
    });
  });
  observer.observe(document.body, {childList: true, subtree: true});
})();
