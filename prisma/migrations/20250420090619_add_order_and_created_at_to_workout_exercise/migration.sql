PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

-- Create a new table with the `order` and `createdAt` columns
CREATE TABLE "new_WorkoutExercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workoutId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "customDescription" TEXT,
    "customSets" INTEGER,
    "customRepetitions" TEXT,
    "customBreak" TEXT,
    "customExecution" TEXT,
    "customRest" TEXT,
    "order" INTEGER NOT NULL, -- Add the `order` column
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Add the `createdAt` column
    CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Populate the new table and assign sequential `order` values for existing rows
INSERT INTO "new_WorkoutExercise" (
    "id", "workoutId", "exerciseId", "customDescription", "customSets", "customRepetitions", 
    "customBreak", "customExecution", "customRest", "order", "createdAt"
)
SELECT 
    "id", 
    "workoutId", 
    "exerciseId", 
    "customDescription", 
    "customSets", 
    "customRepetitions", 
    "customBreak", 
    "customExecution", 
    "customRest",
    ROW_NUMBER() OVER (PARTITION BY "workoutId" ORDER BY "id"), -- Assign sequential order values
    CURRENT_TIMESTAMP -- Set the current timestamp for all rows
FROM "WorkoutExercise";

-- Drop the old table
DROP TABLE "WorkoutExercise";

-- Rename the new table to the original name
ALTER TABLE "new_WorkoutExercise" RENAME TO "WorkoutExercise";

-- Recreate the unique index
CREATE UNIQUE INDEX "WorkoutExercise_workoutId_exerciseId_key" ON "WorkoutExercise"("workoutId", "exerciseId");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;