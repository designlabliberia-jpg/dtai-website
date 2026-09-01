-- CreateTable
CREATE TABLE "PageProfileSettings" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "careersEyebrow" TEXT NOT NULL DEFAULT '',
    "careersHeading" TEXT NOT NULL DEFAULT '',
    "careersHeadingAccent" TEXT NOT NULL DEFAULT '',
    "careersParagraphs" TEXT[],
    "careersPrimaryImageUrl" TEXT NOT NULL DEFAULT '',
    "careersPrimaryImageAlt" TEXT NOT NULL DEFAULT '',
    "productsEyebrow" TEXT NOT NULL DEFAULT '',
    "productsHeading" TEXT NOT NULL DEFAULT '',
    "productsHeadingAccent" TEXT NOT NULL DEFAULT '',
    "productsParagraphs" TEXT[],
    "productsPrimaryImageUrl" TEXT NOT NULL DEFAULT '',
    "productsPrimaryImageAlt" TEXT NOT NULL DEFAULT '',
    "servicesEyebrow" TEXT NOT NULL DEFAULT '',
    "servicesHeading" TEXT NOT NULL DEFAULT '',
    "servicesHeadingAccent" TEXT NOT NULL DEFAULT '',
    "servicesParagraphs" TEXT[],
    "servicesPrimaryImageUrl" TEXT NOT NULL DEFAULT '',
    "servicesPrimaryImageAlt" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "PageProfileSettings_pkey" PRIMARY KEY ("id")
);
