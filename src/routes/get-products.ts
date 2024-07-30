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
          name_product: true,
          details_product: true,
          tag_product: true,
          price_product: true,
          image_path: true,
        },
      });

      const completeListOfProductsWithArrayOfTags = products.map((product) => ({
        ...product,
        tag_product: JSON.parse(product.tag_product),
      }));

      return completeListOfProductsWithArrayOfTags;
    }
  );
}
