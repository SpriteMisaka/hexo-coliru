function replaceEscape(str) {
    return str.replace(/[\n\t\r\\"']/g, function(match) {
        switch(match) {
            case '"': return '\\"';
            case "'": return "\\'";
            case '\n': return '\\n';
            case '\t': return '\\t';
            case '\r': return '\\r';
            case '\\': return '\\\\';
        }
    });
}

hexo.extend.filter.register('before_post_render', function(data) {
    data.content = data.content.replaceAll(/\{%\s*coliru\s*%\}((?:.|\n|\r)+?)\{%\s*endcoliru\s*%\}/g, function(s) {
        let re = /(```(?:.+?)(?:\n|\r\n)((?:.|\n|\r)+?)```)/
        const match = s.match(re)
        const uuid = crypto.randomUUID()
        code = replaceEscape(match[2])
        str = `<div style="display:flex;align-items:center;">\n` +
            `<div><button id="coliru-${uuid}" style="vertical-align:middle;">Coliru</button></div>\n` +
            `<div><input id="results-${uuid}" style="vertical-align:middle;margin-left:5px;" type="text" value="" readonly></div>\n` +
        `</div>\n` +
        match[1] + `\n` +
        `<script type="module">\n` +
            `document.getElementById("coliru-${uuid}").addEventListener("click", function() {\n` +
                `var http = new XMLHttpRequest();\n` +
                `http.open("POST", "http://coliru.stacked-crooked.com/compile", true);\n` +
                `http.onload = function (e) {\n` +
                    `if (http.readyState === 4 && http.status === 200) {\n` +
                        `document.getElementById("results-${uuid}").value = String(http.response);\n` +
                    `}\n` +
                `};` +
                `http.send(JSON.stringify({ "cmd": "g++ main.cpp && ./a.out", "src": "` + code + `"}));\n` +
            `});\n` +
        `</script>\n`
        return str
    });
}, 0);
