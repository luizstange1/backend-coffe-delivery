/*
  Warnings:

  - You are about to drop the column `details_product` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `name_product` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price_product` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `tag_product` on the `products` table. All the data in the column will be lost.
  - Added the required column `details` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "price" DECIMAL NOT NULL DEFAULT 0.00,
    "image_path" TEXT NOT NULL
);
INSERT INTO "new_products" ("id", "image_path") SELECT "id", "image_path" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
