/*
  Warnings:

  - A unique constraint covering the columns `[topic]` on the table `subreddit` will be added. If there are existing duplicate values, this will fail.
  - Made the column `topic` on table `subreddit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "subreddit" ALTER COLUMN "topic" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subreddit_topic_key" ON "subreddit"("topic");
