# **4-Hour Intelligence Hub Sprint: The Vibe Coding Roadmap**

**Goal:** To build a functional, deployed "Proof of Concept" in 4 hours. By the end, we will have a live web app that ingests real data from Syften and allows for basic client filtering.

**Stack:** Next.js 15, TypeScript, TailwindCSS, Drizzle ORM, Neon (Postgres), Vercel.

## **Hour 1: Foundation & Setup (Time: 0 \- 60 mins)**

*Focus: Get all accounts, tools, and connections established.*

### **Step 1.1: Initialize the Project** [ ✅ Completed ]

Open your terminal and create the Next.js project.

npx create-next-app@latest intelligence-hub

*Choose the following options when prompted:*

* **Would you like to use TypeScript?** Yes  
* **Would you like to use ESLint?** Yes  
* **Would you like to use Tailwind CSS?** Yes  
* **Would you like to use src/ directory?** Yes  
* **Would you like to use App Router?** Yes  
* **Would you like to customize the default import alias?** No

Navigate into your new project:

cd intelligence-hub

### **Step 1.2: Install Dependencies** [ ✅ Completed ]
Install all the necessary database and environment variable packages.

npm install drizzle-orm postgres  
npm install \-D drizzle-kit pg dotenv

### **Step 1.3: Set Up Cloud Services** [ ✅ Completed ]

1. **Vercel:** Go to [vercel.com](https://vercel.com) and create a new, free project named intelligence-hub.  
2. **Neon:** Go to [neon.tech](https://neon.tech) and create a new, free project. Once created, find the **Connection String** that looks like postgres://.... Copy it.

### **Step 1.4: Configure Environment Variables** [ ✅ Completed ]

1. In the root of your project, create a new file named .env.local.  
2. Add your database connection string and your Syften API token to this file.

DATABASE\_URL="postgres://user:password@.../neondb"  
SYFTEN\_API\_TOKEN="your\_syften\_api\_token\_here"

### **Step 1.5: Configure Drizzle ORM** [ ✅ Completed ]

1. Create a configuration file for Drizzle. In the root of your project, create drizzle.config.ts.  
   // drizzle.config.ts  
   import type { Config } from 'drizzle-kit';  
   import \* as dotenv from 'dotenv';  
   dotenv.config({ path: '.env.local' });

   export default {  
     schema: './src/db/schema.ts',  
     out: './drizzle',  
     driver: 'pg',  
     dbCredentials: {  
       connectionString: process.env.DATABASE\_URL\!,  
     },  
   } satisfies Config;

2. Define your database schema. Create a new folder src/db and a file inside called schema.ts.  
   // src/db/schema.ts  
   import { pgTable, text, timestamp, serial } from 'drizzle-orm/pg-core';

   export const alerts \= pgTable('alerts', {  
     id: serial('id').primaryKey(),  
     syftenId: text('syften\_id').unique(),  
     clientTag: text('client\_tag'),  
     source: text('source'),  
     author: text('author'),  
     text: text('text'),  
     itemUrl: text('item\_url'),  
     matchedOn: timestamp('matched\_on').defaultNow(),  
   });

### **Step 1.6: Run First Database Migration** [ ✅ Completed ]

This command reads your schema and creates the alerts table in your Neon database.

npx drizzle-kit push

*You should see a success message. Your foundation is now complete\!*

## **Hour 2: Data Ingestion (Time: 60 \- 105 mins)**

*Focus: Write the backend script to pull data from Syften and load it into our database.*

### **Step 2.1: Create the Drizzle Client**

Create a file at src/db/index.ts to instantiate and export your database client.

// src/db/index.ts  
import { drizzle } from 'drizzle-orm/postgres-js';  
import postgres from 'postgres';  
import \* as schema from './schema';

const client \= postgres(process.env.DATABASE\_URL\!);  
export const db \= drizzle(client, { schema });

### **Step 2.2: Write the Data Ingestion Script**

Create a new folder scripts in the root of your project, and a file inside named ingest.ts.

// scripts/ingest.ts  
import \* as dotenv from 'dotenv';  
dotenv.config({ path: '.env.local' });

import { db } from '../src/db';  
import { alerts } from '../src/db/schema';

// Helper function to extract the client tag  
function getClientTag(filter: string): string | null {  
  const match \= filter.match(/tag:(int-\[\\w-\]+)/);  
  return match ? match\[1\] : null;  
}

async function main() {  
  console.log('Fetching data from Syften...');  
  const response \= await fetch('https://syften.com/api/0.0/items/get', {  
    method: 'POST',  
    headers: {  
      Authorization: \`Bearer ${process.env.SYFTEN\_API\_TOKEN}\`,  
      'Content-Type': 'application/json',  
    },  
    body: JSON.stringify({ limit: 100 }), // Fetch 100 items  
  });

  if (\!response.ok) {  
    console.error('Failed to fetch data from Syften');  
    return;  
  }

  const data \= await response.json();  
  console.log(\`Fetched ${data.length} items.\`);

  if (data.length \=== 0\) {  
    console.log('No new items to process.');  
    return;  
  }

  const newAlerts \= data.map((item: any) \=\> ({  
    syftenId: item.id,  
    clientTag: getClientTag(item.filter),  
    source: item.item.backend,  
    author: item.item.author,  
    text: item.item.text,  
    itemUrl: item.item.item\_url,  
    matchedOn: new Date(item.matched\_on),  
  })).filter((alert: any) \=\> alert.clientTag \!== null); // Only insert items with a valid tag

  console.log(\`Inserting ${newAlerts.length} new alerts into the database...\`);

  await db.insert(alerts).values(newAlerts).onConflictDoNothing({  
    target: alerts.syftenId,  
  });

  console.log('Ingestion complete\!');  
}

main();

### **Step 2.3: Run the Script**

Install tsx to run the TypeScript script directly, then execute it.

npm install \-D tsx  
npx tsx scripts/ingest.ts

*Your Neon database should now contain real data\!*

## **Hour 3: Frontend \- Viewing the Data (Time: 105 \- 180 mins)**

*Focus: Build the API route and the UI to display our data on the page.*

### **Step 3.1: Create the Backend API Route**

Create the file src/app/api/alerts/route.ts.

// src/app/api/alerts/route.ts  
import { db } from '@/db';  
import { alerts } from '@/db/schema';  
import { desc } from 'drizzle-orm';  
import { NextResponse } from 'next/server';

export async function GET() {  
  const allAlerts \= await db.select().from(alerts).orderBy(desc(alerts.matchedOn));  
  return NextResponse.json(allAlerts);  
}

### **Step 3.2: Build the Basic Frontend Page**

Replace the contents of src/app/page.tsx with the following.

// src/app/page.tsx  
interface Alert {  
  id: number;  
  syftenId: string | null;  
  clientTag: string | null;  
  source: string | null;  
  author: string | null;  
  text: string | null;  
  itemUrl: string | null;  
  matchedOn: string | null;  
}

async function getAlerts(): Promise\<Alert\[\]\> {  
  // In a real app, use the deployed URL. For local dev, this is fine.  
  const res \= await fetch('http://localhost:3000/api/alerts', { cache: 'no-store' });  
  if (\!res.ok) {  
    throw new Error('Failed to fetch data');  
  }  
  return res.json();  
}

export default async function HomePage() {  
  const alerts \= await getAlerts();

  return (  
    \<main className="container mx-auto p-4 md:p-8"\>  
      \<h1 className="text-2xl font-bold mb-6"\>Intelligence Hub\</h1\>  
      \<div className="space-y-4"\>  
        {alerts.map((alert) \=\> (  
          \<div key={alert.id} className="p-4 border rounded-md shadow-sm"\>  
            \<div className="flex justify-between items-center mb-2"\>  
              \<span className="font-semibold text-gray-700"\>{alert.author || 'Unknown Author'}\</span\>  
              \<span className="text-sm text-white bg-blue-500 px-2 py-1 rounded-full"\>{alert.clientTag}\</span\>  
            \</div\>  
            \<p className="text-gray-800"\>{alert.text}\</p\>  
          \</div\>  
        ))}  
      \</div\>  
    \</main\>  
  );  
}

*Run npm run dev and navigate to http://localhost:3000. You should see your data\!*

## **Hour 4: Core Feature & Deployment (Time: 180 \- 240 mins)**

*Focus: Add the client-side filtering and deploy the project to the world.*

### **Step 4.1: Implement Client Filtering**

Modify src/app/page.tsx to add client-side interactivity.

// src/app/page.tsx  
'use client';

import { useState, useEffect, useMemo } from 'react';

// Keep the Alert interface from before  
interface Alert {  
  id: number;  
  syftenId: string | null;  
  clientTag: string | null;  
  source: string | null;  
  author: string | null;  
  text: string | null;  
  itemUrl: string | null;  
  matchedOn: string | null;  
}

export default function HomePage() {  
  const \[alerts, setAlerts\] \= useState\<Alert\[\]\>(\[\]);  
  const \[selectedClient, setSelectedClient\] \= useState\<string | null\>(null);

  useEffect(() \=\> {  
    async function fetchData() {  
      // Use relative URL for deployment  
      const res \= await fetch('/api/alerts');   
      const data \= await res.json();  
      setAlerts(data);  
    }  
    fetchData();  
  }, \[\]);

  const clientTags \= useMemo(() \=\> {  
    const tags \= new Set(alerts.map(a \=\> a.clientTag).filter(Boolean));  
    return Array.from(tags) as string\[\];  
  }, \[alerts\]);

  const filteredAlerts \= useMemo(() \=\> {  
    if (\!selectedClient) {  
      return alerts;  
    }  
    return alerts.filter(a \=\> a.clientTag \=== selectedClient);  
  }, \[alerts, selectedClient\]);

  return (  
    \<main className="container mx-auto p-4 md:p-8"\>  
      \<h1 className="text-2xl font-bold mb-6"\>Intelligence Hub\</h1\>  
      \<div className="flex gap-4"\>  
        {/\* Sidebar \*/}  
        \<aside className="w-1/4 space-y-2"\>  
            \<h2 className="font-semibold"\>Clients\</h2\>  
            \<button onClick={() \=\> setSelectedClient(null)} className="w-full text-left p-2 rounded hover:bg-gray-100"\>All Clients\</button\>  
            {clientTags.map(tag \=\> (  
                \<button key={tag} onClick={() \=\> setSelectedClient(tag)} className="w-full text-left p-2 rounded hover:bg-gray-100"\>{tag}\</button\>  
            ))}  
        \</aside\>

        {/\* Main Content \*/}  
        \<div className="w-3/4 space-y-4"\>  
          {filteredAlerts.map((alert) \=\> (  
            \<div key={alert.id} className="p-4 border rounded-md shadow-sm"\>  
              \<div className="flex justify-between items-center mb-2"\>  
                \<span className="font-semibold text-gray-700"\>{alert.author || 'Unknown Author'}\</span\>  
                \<span className="text-sm text-white bg-blue-500 px-2 py-1 rounded-full"\>{alert.clientTag}\</span\>  
              \</div\>  
              \<p className="text-gray-800"\>{alert.text}\</p\>  
            \</div\>  
          ))}  
        \</div\>  
      \</div\>  
    \</main\>  
  );  
}

### **Step 4.2: Deploy to Production**

1. **Create GitHub Repo:** Go to [github.com](https://github.com), create a new repository, and push your code.  
   git init  
   git add .  
   git commit \-m "Initial proof of concept"  
   git branch \-M main  
   git remote add origin \<your\_github\_repo\_url\>  
   git push \-u origin main

2. **Connect Vercel:** In your Vercel project settings, connect it to your new GitHub repository.  
3. **Add Environment Variables:** In the Vercel project settings, navigate to "Environment Variables" and add DATABASE\_URL and SYFTEN\_API\_TOKEN with the same values from your .env.local file.  
4. **Trigger Deployment:** Push a small change to GitHub or manually trigger a new deployment from the Vercel dashboard.

**Congratulations\! You now have a live, working proof of concept of the Intelligence Hub\!**