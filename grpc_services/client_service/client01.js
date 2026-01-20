const fs = require('fs');
const path = require('path');

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PORT = 50051;

const packageDefinition = protoLoader.loadSync('interface.proto');
const serviceProto = grpc.loadPackageDefinition(packageDefinition);

const main = () => {
    const certPath = path.resolve(__dirname, 'server-cert.pem');
    const rootCert = fs.readFileSync(certPath);

    const client = new serviceProto.GenericService(`localhost:${PORT}`, grpc.credentials.createSsl(rootCert));
    const metadata = new grpc.Metadata();

    metadata.add("x-api-key", "chave_secretakkkk");

    client.getInfo({ text: "Aqui é o cliente01" }, metadata, (error, response) => {
        if (error) console.log(error);
        else console.log("Resposta do Main Service:", response);
    })
}

main();