#Midways

##What it is and why?
####This app is designed to make the process of deciding where to go out with friends a little less stressfull. Midways simply gets the address that is in the middle between you and the friend you are meeting. Both you and your friend can now make the decsion on where to hangout in a place that could be convenient to the both of you.

##WireFrame
![img_5686](https://cloud.githubusercontent.com/assets/22873862/22302696/f2785d64-e2fd-11e6-92a8-1fd31223ac9e.JPG)

##Problems Faced
* Getting a map to actually render on the page was difficult at first.
    * With the help of a tutorial (https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/), pre-built react google maps components (https://github.com/tomchentw/react-google-maps), and the npm module react-google-maps maps were getting rendered on the page.
* Getting the maps to work with the npm module.
    * Combing through stackoverflow, reading issues, and just playing around with how I imported the files from react-google-maps(the file path).
* Combining the logic and components to get the directions to display halfway.
    * Getting a better understanding of react lifecyle was what got the directions to update and find the halfway point without reloading the entire page.

##Used
* React
* React-Router
* React-Google-Maps
* Bootstrap
