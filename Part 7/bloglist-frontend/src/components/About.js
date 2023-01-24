const About = () => (
    <div>
      <h2>About</h2>
      <p>This is the Final Project for The University of Helsinski's <a href="https://fullstackopen.com/en/" rel="noreferrer noopener" target="_blank">Full Stack Open MOOC</a>.</p>
      <p>
        The Course follows a <i>learn-by-doing</i> approach that requires the student to complete a series of exercises on each part. The exercises<br></br>      
        build upon each other, adding more layers of complexity at each step. This Full-Stack <b>Blog App</b> is the resulting product of completing <br></br>
        the "Blog App" exercises from the course.
      </p>
      <p>
        The App is a simple blog management app that allows registered users to create blog posts. <br></br> All users 
        may view and like each other's posts but only the user who has autorship of a post may delete it. <br></br>
        Blogs are sorted by number of likes and Users are sorted by total amount of posts.
      </p>
      <p> You may view the code for this app on the folder Part 7 of <a href="https://github.com/Lautaro-De-Lucia/FSO-2022/" rel="noreferrer noopener" target="_blank">this repository</a>.</p>
      <p> 
        On the Front-End, the app utilizes <b>React</b>, using <b>Redux</b> for state Management of components and <b>React Router</b> to route these components. <br></br> 
        General styling was done using <b>React Bootstrap</b> and some tests have been written using <b>JEST</b> and <b>Cypress</b>. <br></br>
      </p>
      <p>
        On the Backend, the App utilizes <b>Express</b> and <b>Mongoose</b> to fetch and update the Blogs and Users, both of which reside in a <b>MongoDB</b> cluster. <br></br>
        Backend testing was performed using Visual Studio Code's <b>REST Client</b>.
      </p>
      <p>
        I wholeheartedly thank all the instructors involved in this course for taking the time to make it, giving students from all over the world<br></br>
        access to free quality education.
      </p>
    </div>
  )

export default About