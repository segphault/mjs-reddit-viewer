
var Component = require("montage/ui/component").Component;

exports.Reddit = Component.specialize({
    templateDidLoad: {
        value: function() {
            var script = document.createElement("script");
            script.src = "http://www.reddit.com/reddits.json?jsonp=subfn";

            var component = this;
            window["subfn"] = function(jsonData) {
                component.subs = jsonData.data.children;
            };
            
            document.head.appendChild(script);
        }
    },
    
    selectedSub: {
        set: function(path) {
            if (path) {
                var script = document.createElement("script");
                script.src = "http://www.reddit.com/" + path + ".json?sort=top&t=month&jsonp=storyfn";

                var component = this;
                window["storyfn"] = function(jsonData) {
                    component.stories = jsonData.data.children;
                };
            
                document.head.appendChild(script);
            }
        }
    },
    
    subs: { value: [] },
    stories: { value: [] }
});
