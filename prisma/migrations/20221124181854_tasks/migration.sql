-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "taskListId" INTEGER;

-- AlterTable
ALTER TABLE "TaskList" ADD COLUMN     "create" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskListId_fkey" FOREIGN KEY ("taskListId") REFERENCES "TaskList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
