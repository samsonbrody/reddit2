-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "post_id" INTEGER,
    "text" TEXT,
    "username" VARCHAR,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "body" TEXT,
    "image" TEXT,
    "username" VARCHAR,
    "subreddit_id" INTEGER,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subreddit" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "topic" TEXT,

    CONSTRAINT "subreddit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "post_id" INTEGER,
    "upvote" BOOLEAN,
    "username" VARCHAR,

    CONSTRAINT "vote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_subreddit_id_fkey" FOREIGN KEY ("subreddit_id") REFERENCES "subreddit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
