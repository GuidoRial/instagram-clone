# An Instagram Clone made with React, React Router, MaterialUI and Firebase

## Live Preview

https://instagram-clone-six-tau.vercel.app/

### A few things if you want to test this
I didn't include email verification so if you want to create an user with an email you don't own, you can absolutely do that, as this was planned to be a functional clone with no intentions of being a real web application. It's just a clone that displays a lot of Instagram's functionality and I wanted to facilitate testing for any recruiters or developers that wanted to see what I can do.

That said, if the email or the username is taken you will not be able to create an account. The same applies if the email is not valid (you can't put "asdasdasda" as an email, but you could create one like "potatopotato@potato.com")

If you don't want to create an account to test this, you can always go back to the login page and use the **demouser account** that I pre-made for this and test all the functionality I added. 

I'm aware Google flagged my page as phishing (because it's an Instagram Clone and it thinks that because you can create an account and log into it I want to take your personal information, but as I said, you don't have to put any real email or password and don't have to verify it). As far as I'm aware this only happens on Google Chrome and I already appealed to Google but it could take a few weeks until that issue is resolved. You can still open this project on Google Chrome, but have to pass through that red screen that is inconsistently shown to people.

Alternatively you can always run this project locally by cloning it and writting this on the console 

```
npm install
npm update
npm start
```

## Project Description

I've been studying web development for 6 months now and I've been learning a lot about a variety of languages, libraries and frameworks thanks to The Odin Project. This is a project that combines everything I've been learning so far using **React** and **Firebase** (among other libraries).

It took me exactly 14 days of 8-12hs of work a day to do this. It was a particularly difficult project because it was my first time using Firebase (or doing anything more than a localStorage for the backend). Looking back I might have been better off doing anything that made me progressively learn Firebase and then jumping to this clone.

### What I used

1. React
2. React Router
3. MaterialUI
4. Firebase

## Features

1.  Log In Page

    -   Login button that disables itself if any field is empty
    -   Demo user button that lets you log in with a user I made so that you don't have to actually create an account to demo this project

2.  Sign Up Page

    -   Signup with email and password using _Firebase_
    -   Check for usernames in use (with feedback on the UI)
    -   Sign up button that disables itself if username is in use or any field is empty
    -   Links to Terms, Data Policy, Cookies Policy, AppStore and GooglePlayStore that will open those pages in a new tab if clicked

3.  Homepage
    -   Header
        -   Go home by clicking the _icon_ or the _Instagram Logo_
        -   Look for users in the database using the _search bar_
        -   Upload a picture with a description using the _plus icon_
        -   Opening a menu by clicking your avatar, there you can
            1. Go to your _profile_
            2. _Log Out_
    -   Feed
        -   If you don't follow anyone, you'll be encouraged to do so here
        -   You only see the posts from people you follow
        -   You can access any person's profile by clicking their name or profile picture
        -   You can _like_ or _save_ things
        -   You can _access any person's profile_ by clicking their name on the comment section
        -   A counter for the days that passed since the user uploaded a photo
        -   You can _comment_ any post (and can only post it if you actually wrote something, else the button won't work)
    -   Suggestions
        -   You can access your profile or log out from here
        -   You get up to 5 users you don't follow as recommendations
            -   You can access their profile or follow them from here
4.  Profile
    -   If this is your profile
        -   You can see your information, by default you'll have no profile picture, you can change that (as well as your description and username which will be checked again so that you don't end up sharing a name with other user)
            -   You will only change the things you want to change, that means you can just leave a field empty and will keep the previous value
        -   You can access every post you saved if you click the _SAVED button_
    -   If this is someone else's profile
        -   You can see a button that will let you _follow_ or _unfollow_ this user depending on if you already follow them or not.
        -   If you follow or unfollow, the followers or following will update immediately
    -   In both cases
        -   You can see this person's posts
        -   You can access any post by clicking on it, then you can actually see if you liked or saved it, or can add a comment from there!

## Challenges

1. The most difficult one was connecting Firebase's Firestore Database with the Storage and Authentication so that I can link a new user to a document or add a post. Besides that, Firebase's documentation is hard to read so that made this point even harder. Thanks YouTube.
2. I never made a social media app, so the logic behind users, what they can see or not and how they interact with each other was new to me. But once I got the hang of it I managed just fine.
3. Handling this massive amount of data between different components was something that I found hard. I usually work with projects that take me 2 or 3 days of work and are less than 300 lines of code long, this one took me 2 weeks and 3000 lines of code. The fact that it was longer doesn't make it harder, but it definitely got hard to read by the end of it so I did my best to not repeat myself and clean this code to the best of my ability

## What I learned

1. React
    - Gained further understanding of what one can do with hooks and how they relate to the lifecycle methods
    - How to move information from one component to another to manipulate it
2. React Router
    - How to mix react router with conditional rendering
    - How to use useParams to create a user's profile
3. MaterialUI
    - I used MaterialUI's buttons, modals and avatar's
4. Firebase
    - How to create and initialize a webapp project
    - How to use email and password to create an user
    - How to manipulate this user's displayName
    - How to use _Firebase's Storage_ to save posts and profile pictures there and retrieve those link's so that I can use them from _Firestore_
    - What's the relationship between a collection and a document
    - How to create a collection
    - Multiple ways of accessing a document (by using a username, a docId or a userId)
    - How to manipulate a document to add, remove or update things

## For the future
1. Add more user validation with feedback in the UI