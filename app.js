var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('<img src="http://localhost:8080/image">');
});



var mjAPI = require("mathjax-node");
mjAPI.config({
    MathJax: {
        SVG: {
            font: "STIX-Web"
        },
        tex2jax: {
            preview: ["[math]"],
            processEscapes: true,
            processClass: ['math'],
//                inlineMath: [ ['$','$'], ["\\(","\\)"] ],
//                displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
            skipTags: ["script", "noscript", "style", "textarea", "pre", "code"]
        },
        TeX: {
            noUndefined: {disabled: true},
            Macros: {
                mbox: ['{\\text{#1}}', 1],
                mb: ['{\\mathbf{#1}}', 1],
                mc: ['{\\mathcal{#1}}', 1],
                mi: ['{\\mathit{#1}}', 1],
                mr: ['{\\mathrm{#1}}', 1],
                ms: ['{\\mathsf{#1}}', 1],
                mt: ['{\\mathtt{#1}}', 1]
            }
        }
    }
});
mjAPI.start();


app.get('/image', function(req, res) {
    mjAPI.typeset({
        "format": "TeX",
        "math": "E_{ф}=1.05 ^1/_{\\sqrt{3}}",
        "svg": true,
        "mml": false,
        "png": true,
        "speakText": true,
        "speakRuleset": "mathspeak",
        "speakStyle": "default",
        "ex": 6,
        "width": 1000000,
        "linebreaks": false
    }, function (data) {
        if (!data.errors) {
            res.header('Content-Type','image/svg+xml');
            res.send(data.svg); //write a response to the client
        }
    });
});

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});
