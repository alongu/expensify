// Create a new repository for your project
// *** git init ***

// Get status //
// *** git status ***

// Stage files //
// *** git add 'file name'

// stage ALL files in the current directory and in sub directories //
// *** git add . ***

// Commit from stage area to do commit //
// *** git commit -m "put message in qoutes" ***

// Show all commits made in our repository so far //
// *** git log ***

// Create an SSH with the GitHub - using SSH keys //
// USE GIT BASH ONLY!!!! //

// Create an SSH directory in the user directory //
// google -> generating a new SSH key and adding it to the ssh-agent. follow the instructions for windows!
// 1. in user folder (get there by running 'cd ~' create a folder named ssh using 'mkdir ssh')
// 2. run command ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
// 3. it will ask for some shit - just press 'Enter' 3 times
// 4. run command 'ls -a ~/.ssh' to see the public and private keys were indeed added to the folder
// 5. run command 'eval "$(ssh-agent -s)"' - this will check if ssh-agent is running, and if not will start it. should show the agent PID
// 6. add the ssh key using the command: 'ssh-add ~/.ssh/id_rsa'
// 7. copy to the clipboard (adding a new ssh key to your new github account in google) =>
// ... 'clip < ~/.ssh/id_rsa.pub'
// 8. paste it to github. go to github account - SSH and GPG keys / deploy keys -> new SSH key, and paste the key from the clipboard
// 9. Validate that key was established correctly using the command: 'ssh -T git@github.com', and press 'yes' -> ... 'you've successfully authenticated ... '
// 10. PUSH our code to github: 
// 10.1 grab the url of the SSH from github (not the http url) - copy it
// 10.2 from our terminal - type command: 'git remote add origin 'url just copied...'' -> now our local git repository knows our github remote repository
// 10.3 'git remote -v'
// 10.4 'git push -u origin master
