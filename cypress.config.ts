import { defineConfig } from "cypress";
import admin from "firebase-admin";
// import * as firebaseAdminConfig from "./cypressFirebaseAdmin.json" with { type: "json" };
import { plugin as cypressFirebasePlugin } from "cypress-firebase";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
             // implement node event listeners here
            return cypressFirebasePlugin(on, config, admin, {
                credential: admin.credential.cert({
                  projectId: process.env.PROJECT_ID,
                  clientEmail: process.env.CLIENT_EMAIL,
                  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
                }),

                projectId: "pojokoding-startup",
            });
        },

        baseUrl: "http://localhost:3000",
    },
    defaultCommandTimeout: 30000,
});
