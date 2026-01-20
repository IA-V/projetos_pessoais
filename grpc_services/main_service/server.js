const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PORT = 50051;

const packageDefinition = protoLoader.loadSync('interface.proto');
const serviceProto = grpc.loadPackageDefinition(packageDefinition);

const getInfo = (call, callback) => {
    callback(null, { text: `Olá do Main Service, sua mensagem foi: "${call.request.text}" ` });
}

const main = () => {
    const server = new grpc.Server();
    server.addService(serviceProto.GenericService.service, { getInfo });

    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Main Service running at http://0.0.0.0:${PORT}`);
        // server.start();
    })
}

main();