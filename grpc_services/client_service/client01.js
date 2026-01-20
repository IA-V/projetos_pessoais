const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PORT = 50051;

const packageDefinition = protoLoader.loadSync('interface.proto');
const serviceProto = grpc.loadPackageDefinition(packageDefinition);

const main = () => {
    const client = new serviceProto.GenericService(`0.0.0.0:${PORT}`, grpc.credentials.createInsecure());

    client.getInfo({ text: "Aqui é o cliente01" }, (error, response) => {
        if (error) console.log(error);
        else console.log("Resposta do Main Service:", response);
    })
}

main();