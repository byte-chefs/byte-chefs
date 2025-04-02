/*
  Warnings:

  - Made the column `calories` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carbs` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fat` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `protein` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `calories` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carbs` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fat` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `protein` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "calories" SET NOT NULL,
ALTER COLUMN "carbs" SET NOT NULL,
ALTER COLUMN "fat" SET NOT NULL,
ALTER COLUMN "protein" SET NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "calories" SET NOT NULL,
ALTER COLUMN "calories" SET DEFAULT 0,
ALTER COLUMN "carbs" SET NOT NULL,
ALTER COLUMN "carbs" SET DEFAULT 0,
ALTER COLUMN "fat" SET NOT NULL,
ALTER COLUMN "fat" SET DEFAULT 0,
ALTER COLUMN "protein" SET NOT NULL,
ALTER COLUMN "protein" SET DEFAULT 0;
