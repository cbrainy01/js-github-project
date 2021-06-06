document.addEventListener("DOMContentLoaded", init);

function init() {
    //create submit event for search field
    const form = document.querySelector("#github-form");
    form.addEventListener("submit", getNames);
    //getNames will take in value of what was submitted and interpolate it into the fetch link for get request
    function getNames(event) {
        //prevent default
        event.preventDefault();
        //get part of form which stores value
        const userInput = document.querySelector("#search").value;
        //console.log(userInput);
        //create get request
        fetch(`https://api.github.com/search/users?q=${userInput}`)
        .then(  (response) => {return response.json();}  )
        .then(  (responseData) => {
            console.log(responseData)
            displayStuff(responseData);
            /*using response data: 
            display user input and add click event to it which would return the data about the users repos
            display the html_url for the users repos
            create anchor tags for the links(followers, following, avatar)
            links should be within a p tag that introduces the link like zis - followers: *link*;
            */ 
            
        }  )
        .catch( (error) => {console.log("Error: ", error);} );

        function displayStuff(responseData) {
            responseData.items.forEach(element => {
                
            
                //select div which info will be appended to
                const usersDiv = document.querySelector("#user-list");
                const repoDiv = document.querySelector("#repos-list");
                const bulletPoint = document.createElement("li");
                usersDiv.appendChild(bulletPoint);
                //create a heading which will display the users name
                const userName = document.createElement("h3");
                userName.textContent = element.login;
                //create p tags which will contain the links
                const avatar = document.createElement("p");
                const followers = document.createElement("p");
                const following = document.createElement("p");
                //add introduction in paragraph tags
                avatar.textContent = "Avatar: ";
                followers.textContent = "Followers: ";
                following.textContent = "Following: ";
                //add links
                const avatarLink = document.createElement("a");
                const followersLink = document.createElement("a");
                const followingLink = document.createElement("a");
                //set href of links
                avatarLink.setAttribute("href", element.avatar_url);
                followersLink.setAttribute("href", element.followers_url);
                followingLink.setAttribute("href", element.following_url);
                //
                avatarLink.textContent = element.avatar_url;
                followersLink.textContent = element.followers_url;
                followingLink.textContent = element.following_url;
                //append links to introductions and introduction paragraphs to the bullet point
                avatar.appendChild(avatarLink);
                followers.appendChild(followersLink);
                following.appendChild(followingLink);
                //
                bulletPoint.appendChild(userName);
                bulletPoint.appendChild(avatar);
                bulletPoint.appendChild(followers);
                bulletPoint.appendChild(following);


                //add event listener to userName. when it gets clicked, use get call with interpolation to get the repos.
                userName.addEventListener("click", showRepos);
                function showRepos(e) {
                    fetch(`https://api.github.com/users/${element.login}/repos`)
                    .then(  (response) => {return response.json();}  )
                    .then(  (responseData) => {
                     
                        responseData.forEach(element => {
                            //put repo link in repoDiv
                            const repoLink = element.html_url
                            //create list element which will contain p and a tags
                            const list = document.createElement("li");
                            const repoHeader = document.createElement("h4"); /**says "user repos: " */
                            const a = document.createElement("a");
                            a.setAttribute("href", repoLink);
                            a.textContent = repoLink;
                            repoHeader.textContent = `${element.owner.login} repos: `;
                            repoHeader.appendChild(a);
                            list.appendChild(repoHeader);
                            repoDiv.appendChild(list);
                            

                        });
                    } )
                    .catch(  (error) => {console.log("Error: ", error);}  );
                }
                //when repos are gotten, get html_url and append to repoDiv 
                console.log("made it");
                console.log("\n", userInput);
                console.log(responseData.items[0].id);
            });
        }


    }   




}

