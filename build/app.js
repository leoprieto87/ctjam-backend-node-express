"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dbConnect_1 = __importDefault(require("./config/dbConnect"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
dbConnect_1.default.on('error', console.log.bind(console, 'Erro de conexao com banco'));
dbConnect_1.default.once('open', function () {
    console.log('Conexão com banco de dados feita com sucesso');
});
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json((0, cors_1.default)()));
(0, routes_1.default)(app);
var port = process.env.PORT;
app.listen(port, function () {
    console.log("Servidor escutando em http://localhost:".concat(port));
    // console.log(`Servidor escutando em http://localhost:${port}`)
});
exports.default = app;
