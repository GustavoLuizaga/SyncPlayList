-- CreateTable
CREATE TABLE "sync_room" (
    "room_id" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,
    "user_host_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sync_room_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "sync_room_participant" (
    "sync_room_participant_id" SERIAL NOT NULL,
    "room_id" TEXT NOT NULL,
    "user_participant_id" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sync_room_participant_pkey" PRIMARY KEY ("sync_room_participant_id")
);

-- CreateTable
CREATE TABLE "playlist" (
    "playlist_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "playlist_pkey" PRIMARY KEY ("playlist_id")
);

-- CreateTable
CREATE TABLE "playlist_music" (
    "playlist_item_id" SERIAL NOT NULL,
    "playlist_id" TEXT NOT NULL,
    "music_id" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "playlist_music_pkey" PRIMARY KEY ("playlist_item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sync_room_participant_room_id_user_participant_id_key" ON "sync_room_participant"("room_id", "user_participant_id");

-- CreateIndex
CREATE UNIQUE INDEX "playlist_music_playlist_id_music_id_key" ON "playlist_music"("playlist_id", "music_id");

-- AddForeignKey
ALTER TABLE "sync_room" ADD CONSTRAINT "sync_room_user_host_id_fkey" FOREIGN KEY ("user_host_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sync_room_participant" ADD CONSTRAINT "sync_room_participant_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "sync_room"("room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sync_room_participant" ADD CONSTRAINT "sync_room_participant_user_participant_id_fkey" FOREIGN KEY ("user_participant_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist" ADD CONSTRAINT "playlist_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "sync_room"("room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist_music" ADD CONSTRAINT "playlist_music_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "playlist"("playlist_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist_music" ADD CONSTRAINT "playlist_music_music_id_fkey" FOREIGN KEY ("music_id") REFERENCES "music"("music_id") ON DELETE CASCADE ON UPDATE CASCADE;
