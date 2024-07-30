import fastify from "fastify";
import cors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createProduct, getProducts } from "./routes";

const app = fastify();

app.register(cors, {
  origin: "http://localhost:5173",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createProduct);
app.register(getProducts);

app.listen({ port: 3333 }).then(() => {
  console.log("Server running!");
});
