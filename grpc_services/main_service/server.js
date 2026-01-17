const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PORT = 50051;

const packageDefinition = protoLoader.loadSync('interface.proto');
const serviceProto = grpc.loadPackageDefinition(packageDefinition);

const getInfo = (call, callback) => {
    console.log(`${call}`);
    callback(null, { message: `Olá do Main Service, ${call.request.message}! ` });
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