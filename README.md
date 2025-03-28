# AI Resume Builder

An app powered by AI that can help you build your resume. It can provide suggestions, prossionally formats your resume and allows the user the customize and adjust what is needed.

## How it Works

The user is presented with preset questions. At this point, the app is not using AI yet. These questions are meant just to gather all the data from the user and then puts them into one single
prompt for the LLM which is used to generate the resume

One all the questions have been run through, the responses are used in a prompt and then the LLM will generate a professionally formatted resume using the data it was given for the user.

You can give the bot silly responses are just say 'I don't know what to put here, can you fill it in for me', and the bot will fix those and generate a response it decides is a good fit

User is presented with the initial preset question to get started:

![0](https://github.com/user-attachments/assets/5b13134b-7685-40b7-b455-ea8ab7a73b2d)

User enters their response, they can tell the bot they don't know what to enter for a certain section:

![1](https://github.com/user-attachments/assets/fbdc345a-c617-4933-ba92-7b94d4cd3e47)

The bot will generate the resume, making it available to copy to the user's clipboard or to download a PDF copy

Copy to Clipboard, pasted into Microsoft Word:

![2](https://github.com/user-attachments/assets/958b2b79-c394-4dd2-8e3c-43891d2446ea)

Downloaded PDF version:

![3](https://github.com/user-attachments/assets/902fe1e4-5cf3-414b-8e6e-59eea2f89c51)

## Tech Stack

Font End:

React (Vite)
Tailwind CSS

Back End:

Groq API with Llama3 as the model
Firebase for hosting
Firebase Functions for securely storing the API keys and fetching them when needed

## Issues I Ran Into

### LLM

At first I was testing with Llama v3 locally on my computer using Ollama. This worked okay but it was terribly slow because...I'm using my own computer and I don't necessarily have the best GPU designed for running AI.

The original idea was to see if I can host a Llama on a server and run it from there, then I discovered Groq and found out I can use their service with a variety of LLM models using their API.

This was amazing and not only was Llama v3 available there as well, they had GPT4 and other models, but I stayed with Llama after testing with some responses and I felt its responses was a better fit, and seemed to understand what I wanted it to do better than others.

I'm sure the others would have worked with some tweaking, but Llama was just my preferences and it seemed to respond better.

### API Security

I was having my API keys stored in a file in my project for developement, but when it came to deployment I knew this would not be a good idea as it would expose my Groq API key. I also had keys for ReCAPTCHA and EmailJS that I wanted to secure.

I read about Firebase Functions, and since I was already hosting my app on Firebase Hosting, I figured this was a good step as it would seamlessly integrate with my project already using Firebase.

Maybe it was a lack of experience, but this process drove me crazy as I could not get it to work. My app could not fetch the keys and it took a lot of adjustments to the index.js file where I had to specify the Secret, which is used by Google cloud to know what fetch using the Firebase Function I created.

Do succesfully achieve this, I created the functions using Firebase CLI, then specified the secret in the index.js file and when I deployed the app to Firebase, I was asked what the keys were, I entered them, then it was able to successfully fetch the keys.

### LLM Responses

Little did I know that the LLM was not remembering the user's responses, and this is set by design. So, if you respond for question 1 and 2, you would then move onto question 3, but the LLM would have already forgotten what you said for questions 1 and 2, returning a resume that didn't make sense.

This was solved by just using preset questions, then taking all the reponses that are cached locally on the browser to the LLM in a single prompt, then it would gernerate a resume using all the data the user provided.

### Formatting

This was also a huge headache. The app was doing a great job generating the resume after configuring the preset questions. However, the formatting was awful and looked terrible. It took a lot of playing around with the function that used the jsPDF package to generate a resume that formatted correclty. Most notable, the name. It would put the user's name twice at the top for some reason, then not break up the contact info in seperate lines like I wanted to. Made some adjustment using RegEx to get the text to appear the way I wanted to in the function to create the PDF.

## Current Goal

The app successfully builds impressive looking resumes, but it isn't perfect. Work will need to be done to perfect the resume building process before moving on to the next goal.

## Future Goals

Of course, along with resumes, cover letters need to be submitted and is required for some employers. So naturally this is the next step for a complete app for resumes.

The journey to improve this app will be constant. Once cover letters are able to be generated, the next goal would be to have the app scrape the web for job postings that fit the user, providing them with job postings where they can submit their resumes.

## Current State

The app has been deployed and is available online. Imrpvoements are currently in the works for the resume function but it is ready for use at no cost for users.

[Try it out here](https://ai-resume.dvasquez.net)
