-- DropIndex
DROP INDEX "CustomerOrder_useremail_key";

-- AlterTable
ALTER TABLE "CustomerOrder" ALTER COLUMN "useremail" DROP NOT NULL;
