import { https } from "firebase-functions";
import { defineSecret } from "firebase-functions/params";
import cors from "cors"; 


const corsHandler = cors({ origin: true });

const groqApiKey = defineSecret("GROQ_API_KEY");
const emailjsServiceId = defineSecret("EMAILJS_SERVICE_ID");
const emailjsTemplateId = defineSecret("EMAILJS_TEMPLATE_ID");
const emailjsPublicKey = defineSecret("EMAILJS_PUBLIC_KEY");
const recaptchaSiteKey = defineSecret("RECAPTCHA_SITE_KEY");

export const getApiKeys = https.onRequest(
  { secrets: [groqApiKey] }, 
  async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const apiKeyValue = groqApiKey.value();

        res.status(200).json({ GROQ_API_KEY: apiKeyValue });
      } catch (error) {
        console.error("Error fetching API keys:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  }
);

export const getContactKeys = https.onRequest(
    { secrets: [emailjsServiceId, emailjsTemplateId, emailjsPublicKey, recaptchaSiteKey] }, 
    async (req, res) => { // Make function async
      corsHandler(req, res, async () => {
        try {
          const emailjsServiceIdValue = await emailjsServiceId.value();
          const emailjsTemplateIdValue = await emailjsTemplateId.value();
          const emailjsPublicKeyValue = await emailjsPublicKey.value();
          const recaptchaSiteKeyValue = await recaptchaSiteKey.value();
  
          // ✅ Return all values in a single response
          res.status(200).json({
            EMAILJS_SERVICE_ID: emailjsServiceIdValue,
            EMAILJS_TEMPLATE_ID: emailjsTemplateIdValue,
            EMAILJS_PUBLIC_KEY: emailjsPublicKeyValue,
            RECAPTCHA_SITE_KEY: recaptchaSiteKeyValue
          });
        } catch (error) {
          console.error("Unable to fetch keys", error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
    }
  );
