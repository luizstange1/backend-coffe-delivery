/*
  Warnings:

  - Added the required column `image_path` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name_product" TEXT NOT NULL,
    "details_product" TEXT NOT NULL,
    "tag_product" TEXT NOT NULL,
    "price_product" DECIMAL NOT NULL DEFAULT 0.00,
    "image_path" TEXT NOT NULL
);
INSERT INTO "new_products" ("details_product", "id", "name_product", "price_product", "tag_product") SELECT "details_product", "id", "name_product", "price_product", "tag_product" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
