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
          name: z.string().min(4),
          details: z.string().min(4),
          tag: z.array(z.string().min(4)),
          price: z.coerce.number(),
          image_path: z.string().url(),
        }),
      },
    },
    async (request) => {
      const { name, details, price, tag, image_path } = request.body;

      const tag_product_json = JSON.stringify(tag);

      const product = await prisma.product.create({
        data: {
          name,
          details,
          tag: tag_product_json,
          price,
          image_path,
        },
      });

      return product;
    }
  );
}
