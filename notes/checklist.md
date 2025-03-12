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

FRONTEND - GENERAL COMPONENTS
- SuccesMessage (api response)
- Error (api respone)
- Alert Modal (you need to be logged in etc.)

FRONTEND - REUSABLES
- "Browse by" for all items. In different contexts. Needs planning
- Different cards for different contexts  (ie Exercise search in workout, or general search, or add to other workout)
- SearchBar

FRONTEND - BUTTONS
- EditDelete Buttons (session conditional)
- BackButton (this can be tricky)

FRONTEND - CONTEXT
- useSession


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





