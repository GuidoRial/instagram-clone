## Functionality

1. In the signup page
   a. Add phone picture to make it cute
   b. Add a sign up and a log in form, consider not using google Auth
   c. Add these links to the images: https://apps.apple.com/app/instagram/id389801252?vt=lo and https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DA76072FB-24DB-4D3D-9F86-7270D5872CED%26utm_content%3Dlo%26utm_medium%3Dbadge
   d. Add a demo user who follows some people

2. In the homepage
   a. People should be able to see only post of people they follow
   b. People should be able to see only suggestions of people they don't follow
   c. The search bar should retrieve any username or Name who has e.target.value in it
   d. The notifications should work as a modal that display who did what and when.
   e. You should be able to post images and add a caption up to 2.200 characters, if you click outside the modal it closes
   f. Each post should be likeable and saveable, that means creating a collection for each one so that the user can see what they clicked on
   g. People should be able to comment on a post
   h. People should be able to see how many people liked a post

3. In the profile
   a. You should be able to see your photo, name, full name, followers, following and posts
   b. On hover you should be able to see the amount of likes and comments a post has
   c. You should be able to edit your profile
   d. You should be able to see the saved and liked photos

## Todo's

1. Add POST and SAVED profile buttons functionality [I KNOW HOW TO DO IT]
2. Add a postAmount property to each user [I KNOW HOW TO DO IT]
   Not going to do that. Instead I'm going to fetch every post that has that user's userId and count the amount.
3. Fix ability to post [I KNOW HOW TO DO IT]
4. Finish edit profile [I KNOW HOW TO DO IT]
5. Add search bar functionality [I KNOW HOW TO DO IT]
6. Clean and refactor code, make use of aux.js, delete functionality I'm not going to use [I KNOW HOW TO DO IT]
7. Let user follow eachother on the other's profile [I KNOW HOW TO DO IT]

8. Add function to not allow user to signup with a username that already exists [not a clue on how to do it]

9. Add ability to like [DONE]
10. Add ability to save posts [DONE]
11. Display and Add ability to comment [DONE]
12. Implement the logic of what an user can and can't see [DONE]
13. Implement react-router-dom so that you can click on each profile and it renders /profile/username [DONE]
