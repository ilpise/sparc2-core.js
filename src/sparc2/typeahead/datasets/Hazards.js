module.exports = function(element, featurelayers, baselayers, servers, codecs)
{
  var datasets = [];
  var template_suggestion = extract(element.data('template-suggestion') || 'default', geodash.typeahead.templates.suggestion);
  var url = geodash.api.getEndpoint("sparc2_hazards_json");
  var local = undefined;
  var prefetchOptions = {
    url: url,
    dataType: 'json',
    codec: "Hazards",
    cache: false,
    codecs: codecs
  };
  var prefetch = geodash.bloodhound.prefetch(prefetchOptions);
  var remote = undefined;
  var engine = geodash.bloodhound.engine({
    "local": local,
    "prefetch": prefetch,
    "remote": remote
  });
  var templates = {
    suggestion: template_suggestion
  };
  var dataset = {
    name: "hazards",
    engine: engine,
    minLength: 0,
    limit: 10,
    hint: false,
    highlight: true,
    display: geodash.typeahead.displayFn,
    source: function (query, syncResults, asyncResults)
    {
      // https://github.com/twitter/typeahead.js/pull/719#issuecomment-43083651
      // http://pastebin.com/adWHFupF
      //query == "" ? cb(data) : engine.ttAdapter()(query, cb);
      this.engine.ttAdapter()(query, syncResults, asyncResults);
    },
    templates: templates
  };
  datasets.push(dataset);

  return datasets;
};
