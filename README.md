# AI Resume Builder

An app powered by AI that can help you build your resume. It can provide suggestions, prossionally formats your resume and allows the user the customize and adjust what is needed.

## How it Works

The user is presented with preset questions. At this point, the app is not using AI yet. These questions are meant just to gather all the data from the user and then puts them into one single
prompt for the LLM which is used to generate the resume

One all the questions have been run through, the responses are used in a prompt and then the LLM will generate a professionally formatted resume using the data it was given for the user.

You can give the bot silly responses are just say 'I don't know what to put here, can you fill it in for me', and the bot will fix those and generate a response it decides is a good fit

## Tech Stack

Font End:

React (Vite)
Tailwind CSS

Back End:

Groq API with Llama3 as the model
Firebase for hosting
Firebase Functions for securely storing the API keys and fetching them when needed

## Current Goal

The app successfully builds impressive looking resumes, but it isn't perfect. Work will need to be done to perfect the resume building process before moving on to the next goal.

## Future Goals

Of course, along with resumes, cover letters need to be submitted and is required for some employers. So naturally this is the next step for a complete app for resumes.

The journey to improve this app will be constant. Once cover letters are able to be generated, the next goal would be to have the app scrape the web for job postings that fit the user, providing them with job postings where they can submit their resumes.

## Current State

The app has been deployed and is available online. Imrpvoements are currently in the works for the resume function but it is ready for use at no cost for users.

[Try it out here](https://ai-resume.dvasquez.net)
