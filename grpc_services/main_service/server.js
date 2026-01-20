const fs = require('fs');
const path = require('path');

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PORT = 50051;

const packageDefinition = protoLoader.loadSync('interface.proto');
const serviceProto = grpc.loadPackageDefinition(packageDefinition);

const getInfo = (call, callback) => {
    const api_key = call.metadata.get("x-api-key")[0];
    console.log(call.metadata.get("x-api-key"));
    if (api_key != "chave_secretakkkk") {
        return callback(new Error("Invalid API Key"), { text: `Olá do Main Service, a chave de API está incorreta!` });
    } else {
        callback(null, { text: `Olá do Main Service, sua mensagem foi: "${call.request.text}" ` });
    }
}

const main = () => {
    const server = new grpc.Server();
    server.addService(serviceProto.GenericService.service, { getInfo });

    const certPath = path.resolve(__dirname, 'server-cert.pem');
    const keyPath = path.resolve(__dirname, 'server-key.pem');

    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createSsl(
        null,
        [{
            private_key: fs.readFileSync(keyPath),
            cert_chain: fs.readFileSync(certPath)
        }]
    ), () => {
        console.log(`Main Service running at http://0.0.0.0:${PORT}`);
        // server.start();
    })
}

main();