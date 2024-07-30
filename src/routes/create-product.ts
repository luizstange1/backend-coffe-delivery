import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";

export async function createProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/products",
    {
      schema: {
        body: z.object({
          name_product: z.string().min(4),
          details_product: z.string().min(4),
          tag_product: z.array(z.string().min(4)),
          price_product: z.coerce.number(),
          image_path: z.string().url(),
        }),
      },
    },
    async (request) => {
      const {
        name_product,
        details_product,
        price_product,
        tag_product,
        image_path,
      } = request.body;

      const tag_product_json = JSON.stringify(tag_product);

      const product = await prisma.product.create({
        data: {
          name_product,
          details_product,
          tag_product: tag_product_json,
          price_product,
          image_path,
        },
      });

      return product;
    }
  );
}
