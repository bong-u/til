<script async src="https://www.googletagmanager.com/gtag/js?id={{ .Site.Params.googleAnalytics }}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  const gtag = () => {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', '{{ .Site.Params.googleAnalytics }}');
</script>
