# FootballDashboard

### How to run

Go to FootballDashboard directory 
run the following commands: 
1. `npm install`
2. `npm start` (this will start the app in dev mode, on http://localhost:3000)

### Questions

1. Why did you choose the frameworks or libraries that you did?

    React - I know react well and its very quick to set up a create-react-app, also as its used by Statsbomb its more likely the person reviewing the exercise will be familiar with it.
    Nivo graphs - very flexible and easy to edit, lots of examples on their website

2. What would you have done differently given infinite time?

    Compared a full complement of players for a single match against the oppostion, extending the theme of why some teams are more successful/win more often. I.e. In the example follow eventual winners France through the tournament, considering stats for each match seperately. Why the won each game and how the team changed over the tournament. Similarly it would interesting to look at teams that struggled in the tournment and see if some of the stats, can highlight where teams need to improve. 

    In terms of the current functionality, I would like to have extended the scatterplot to be customisable axis to compare different stats and also the option to compare two teams, in a head to head mode to represent the games that took place. I'd have liked to add a filter on the radar to compare teams by win percentage to see how teams varied across different stats and how that related to their success in the tournament. As opposed to only considering teams with a win percentage of over 50%. 

3. What issues would you foresee with putting this application live as it is?

    There is no hosting set up, so currently it won't run in production mode. I also haven't got at far as testing, which would be helpful to ensure the code works as expected and changes behave in a predictable manner. The data is within the application which is fine for a small subset such as in this application but to future proof it for larger amounts of data, it would be better to store the data somewhere else such as a database and extract the logic in the service folder to a more appropriate location such as REST API and in a language made for data processing such as python. 

4. If this application was being built for one of our data-scientists, what are some of the questions you would you like to ask them to help you work out how to extend/improve the functionality of this app beyond its current functionality?

    What filtering would you want?
    What areas are you most interested in? 
    Do you have complete stats for each team in each game for a fairer comparison? 
    Going forward how do you see this dashboard progressing?