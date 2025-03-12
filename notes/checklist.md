**MyPower**
*create and share workouts from a database of exercises.*
*Follow, create and share fitness programs, workouts and exercises with your friends*

else
- create programs
- follow  / like content

- similar to spotify. Liking content add's it to your own library
- map progress / add results to workouts

- browsing the library by tags, users and other categories
- "Play" functionality for a workout. Includes timers for breaks between sets and exercises. 
- Add results to workouts

- User dashboard
- User profile

FRONTEND - pages
[] Home (landing)
[] Search
[] Discover (browse)
[] Library (liked and created items)
[] SignIn


[] Exercises
    [] Exercise 
[] Workouts
    [] Workout
[] Tags
    [] Tag 

[] Users
    [] User
[] User Dashboard (not sure if needed / to change user details / preferences. quick access to created content)

BONUS
[] Programs
    [] Program 
[] Something social: activity from followed users ?
[] Something to view / share results


FRONTEND - LAYOUT
[] Header
    [] Sign In /  Sign Out
    [] Menu acces to user Dashboard / Settings
    [] Notifications (?) Social (?)
[] Main: pages

Mobile: 
[] Bottom menu ala spotify: Discover, Search, Library

Desktop:
[] Sidebar with Discover, Search, Library and (Programs) & Workouts

FRONTEND - STRUCTURE
- page tree ?
- component tree ?


API - ROUTES
[] Users
    [] /[id]
        [] /edit
        [] /check-username
[] Auth/ [...nextauth]
[] Session

[] Exercises
    [] /[id]
        [] /edit ?

[] Workouts
    [] /[id]
        [] /edit ?

[] Tags
    [] /[id]
        [] /edit ?

[] LikedItems
    [] /[id]
        [] /edit ?

[] ExerciseResult
    [] /[id]

BACKEND - TABLES (PRISMA)
 schema.prisma
[] User
[] Session
[] VerificationToken
[] Exercise
[] Workout
[] Program

Intermediate tables (relations)
[] WorkoutExercise 
[] ProgamWorkout
[] LikedItem
[] ExerciseResult
[] WorkoutCompletion
[] ProgramCompletion





