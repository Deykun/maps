"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var constants_1 = require("../src/constants");
constants_1.PATHS_DATA.forEach(function (_a) {
    var path = _a.path, title = _a.title, social = _a.social, _b = _a.lang, lang = _b === void 0 ? 'en' : _b;
    var html = fs_1.default.readFileSync('./dist/index.html', 'utf-8');
    html = html.replace('lang="en"', "lang=\"".concat(lang, "\""));
    html = html.replace('<title>🗺️ maps</title>', "<title>".concat(title, "</title>"));
    html = html.replace('<!-- SOCIAL -->', social);
    fs_1.default.writeFileSync("./dist/".concat(path, ".html"), html);
});
