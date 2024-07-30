-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name_product" TEXT NOT NULL,
    "details_product" TEXT NOT NULL,
    "tag_product" TEXT NOT NULL,
    "price_product" DECIMAL NOT NULL DEFAULT 0.00
);
