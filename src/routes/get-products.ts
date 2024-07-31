import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";

export async function getProducts(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/products",

    async () => {
      const products = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          details: true,
          tag: true,
          price: true,
          image_path: true,
        },
      });

      const completeListOfProductsWithArrayOfTags = products.map((product) => ({
        ...product,
        tag: JSON.parse(product.tag),
      }));

      return completeListOfProductsWithArrayOfTags;
    }
  );
}
