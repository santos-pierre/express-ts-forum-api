-- CreateTable
CREATE TABLE "_CategoryToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToSubject_AB_unique" ON "_CategoryToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToSubject_B_index" ON "_CategoryToSubject"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToSubject" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSubject" ADD FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
